// src/app/lib/googleSheet.js
import { google } from "googleapis";
import { cleanPhone10 } from "./phone";

function maskSheetId(value) {
  const str = String(value || "");
  if (str.length <= 12) return str ? "***" : "";
  return `${str.slice(0, 6)}...${str.slice(-6)}`;
}

function getGoogleSheetConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID is required");
  if (!clientEmail) throw new Error("GOOGLE_CLIENT_EMAIL is required");
  if (!privateKey) throw new Error("GOOGLE_PRIVATE_KEY is required");

  return { spreadsheetId, clientEmail, privateKey };
}

function normalizeGoogleSheetError(error) {
  if (error?.code !== 403 && error?.status !== 403) {
    return error;
  }

  const { spreadsheetId, clientEmail } = getGoogleSheetConfig();
  const detail = [
    "Google Sheet permission denied.",
    `Share the spreadsheet with ${clientEmail} as Editor.`,
    `Active GOOGLE_SHEET_ID: ${maskSheetId(spreadsheetId)}.`,
    "After changing env values, restart the Next.js server.",
  ].join(" ");

  const normalized = new Error(detail);
  normalized.cause = error;
  normalized.code = error.code || error.status;
  return normalized;
}

async function runSheetRequest(request) {
  try {
    return await request();
  } catch (error) {
    throw normalizeGoogleSheetError(error);
  }
}

function getAuthClient() {
  const { clientEmail, privateKey } = getGoogleSheetConfig();
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return auth.getClient();
}

async function getSheets() {
  const client = await getAuthClient();
  return google.sheets({ version: "v4", auth: client });
}

// ✅ Append full row A:M and return inserted row number
export async function saveToSheet({
  name,
  email,
  phone,
  source,
  webinarDay,
  webinarDate,
  webinarTime,
  webinarISO,
  leadId,
}) {
  const sheets = await getSheets();
  const { spreadsheetId } = getGoogleSheetConfig();

  const values = [[
    new Date().toLocaleString("en-IN"), // A Timestamp
    name,                               // B
    email,                              // C
    phone,                              // D (10 digit only)
    source,                             // E
    webinarDay || "",                   // F
    webinarDate || "",                  // G
    webinarTime || "",                  // H
    webinarISO || "",                   // I
    "no",                               // J sentConfirmation
    "no",                               // K sent1Day
    "no",                               // L sent10Min
    "no",                               // M sentLive
    leadId || "",                       // N leadId
    "no",                               // O sentMorning
  ]];

  const res = await runSheetRequest(() =>
    sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:O",
      valueInputOption: "RAW",
      requestBody: { values },
    })
  );

  // Example updatedRange: "Sheet1!A12:M12"
  const updatedRange = res.data?.updates?.updatedRange || "";
  const match = updatedRange.match(/!A(\d+):/);
  const rowNumber = match ? Number(match[1]) : null;

  return { success: true, rowNumber };
}

// Find row number by leadId stored in column N
export async function findRowByLeadId(leadId) {
  if (!leadId) return null;
  const sheets = await getSheets();
  const { spreadsheetId } = getGoogleSheetConfig();
  const res = await runSheetRequest(() =>
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!N:N",
    })
  );

  const rows = res.data.values || [];
  // rows[0] is header
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i]?.[0] || "") === String(leadId)) {
      return i + 1; // sheet row number
    }
  }
  return null;
}

// ✅ Mark a single cell (e.g. J12 = "yes")
export async function markCell(rowNumber, columnLetter, value) {
  const sheets = await getSheets();
  const { spreadsheetId } = getGoogleSheetConfig();

  await runSheetRequest(() =>
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!${columnLetter}${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: { values: [[value]] },
    })
  );

  return { success: true };
}

// ✅ Read all leads (rows after header)
export async function readAllLeads() {
  const sheets = await getSheets();
  const { spreadsheetId } = getGoogleSheetConfig();

  const res = await runSheetRequest(() =>
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:O",
    })
  );

  const rows = res.data.values || [];
  return rows.slice(1); // remove header row
}

export async function findActiveLeadByContact({ email, phone10, now = new Date() }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPhone = String(phone10 || "").trim();
  if (!normalizedEmail && !normalizedPhone) return null;

  const rows = await readAllLeads();
  const nowTime = now.getTime();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] || [];
    const sheetRowNumber = i + 2;
    const rowEmail = String(row[2] || "").trim().toLowerCase();
    const rowPhoneRaw = String(row[3] || "").trim();
    const rowWebinarISO = String(row[8] || "").trim();
    const rowSentLive = String(row[12] || "no").trim().toLowerCase();

    let rowPhone = "";
    try {
      rowPhone = rowPhoneRaw ? cleanPhone10(rowPhoneRaw) : "";
    } catch {
      rowPhone = "";
    }

    const matchedByEmail = normalizedEmail && rowEmail === normalizedEmail;
    const matchedByPhone = normalizedPhone && rowPhone === normalizedPhone;
    if (!matchedByEmail && !matchedByPhone) continue;

    const webinarTime = rowWebinarISO ? new Date(rowWebinarISO).getTime() : NaN;
    const isCompleted = rowSentLive === "yes" || (Number.isFinite(webinarTime) && webinarTime <= nowTime);
    if (isCompleted) continue;

    return {
      rowNumber: sheetRowNumber,
      matchedBy: matchedByEmail ? "email" : "phone",
      webinarDate: row[6] || "",
      webinarTime: row[7] || "",
      webinarISO: rowWebinarISO,
    };
  }

  return null;
}

export async function saveCoursePurchaseToSheet2({
  name,
  email,
  phone,
  courseName,
  price,
  paymentStatus,
}) {
  const sheets = await getSheets();
  const { spreadsheetId } = getGoogleSheetConfig();

  const values = [[
    new Date().toLocaleString("en-IN"),
    name || "",
    email || "",
    phone || "",
    courseName || "Price Behaviour Mastery",
    String(price || ""),
    paymentStatus || "",
  ]];

  await runSheetRequest(() =>
    sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet2!A:G",
      valueInputOption: "RAW",
      requestBody: { values },
    })
  );

  return { success: true };
}
