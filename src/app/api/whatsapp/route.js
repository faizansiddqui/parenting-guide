// src/app/api/whatsapp/route.js
import { NextResponse } from "next/server";
import { cleanPhone10 } from "../../lib/phone";
import { validateForm } from "../../lib/validate";
import { findActiveLeadByContact, saveToSheet, markCell } from "../../lib/googleSheet";
import { isWhatsAppSendingEnabled, sendConfirmation } from "../../lib/waspakamify";
import { getQstashTargetUrl, publishScheduled, toEpochSeconds } from "../../lib/qstash";

// Column J = sentConfirmation
const COL_LETTER_SENT_CONFIRM = "J";
const IST_OFFSET_MIN = 5 * 60 + 30;

const MONTHS = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function parseWebinarDate(dateStr) {
  const clean = String(dateStr || "").trim().replace(/,/g, "");
  const match = clean.match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})$/);
  if (!match) return null;
  const day = Number(match[1]);
  const monthKey = match[2].slice(0, 3).toLowerCase();
  const year = Number(match[3]);
  const monthIdx = MONTHS[monthKey];
  if (!Number.isFinite(day) || !Number.isFinite(year) || monthIdx === undefined) return null;
  return { year, monthIdx, day };
}

function parseWebinarTime(timeStr) {
  const clean = String(timeStr || "").trim().toUpperCase();
  const match = clean.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] || "0");
  const meridiem = match[3] || "";

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  if (meridiem) {
    if (hour === 12) hour = 0;
    if (meridiem === "PM") hour += 12;
  }

  return { hour, minute };
}

function buildWebinarISO({ webinarDate, webinarTime }) {
  const dateParts = parseWebinarDate(webinarDate);
  const timeParts = parseWebinarTime(webinarTime);

  if (dateParts && timeParts) {
    const utcMs =
      Date.UTC(dateParts.year, dateParts.monthIdx, dateParts.day, timeParts.hour, timeParts.minute) -
      IST_OFFSET_MIN * 60 * 1000;
    return new Date(utcMs).toISOString();
  }

  // Fallback to native parsing if format is unexpected
  const dt = new Date(`${webinarDate} ${webinarTime} GMT+0530`);
  if (isNaN(dt.getTime())) return null;
  return dt.toISOString();
}

export async function POST(req) {
  try {
    const body = await req.json();

    // basic validations + normalization
    const normalized = validateForm(body);

    const phone10 = cleanPhone10(normalized.phone);

    const webinarDay = normalized.webinarDay || "";
    const webinarDate = normalized.webinarDate || "";
    const webinarTime = normalized.webinarTime || "";

    if (!webinarDate || !webinarTime) {
      return NextResponse.json(
        { success: false, message: "webinarDate and webinarTime are required" },
        { status: 400 }
      );
    }

    const webinarISO = buildWebinarISO({ webinarDate, webinarTime });

    if (!webinarISO) {
      return NextResponse.json(
        { success: false, message: "webinarISO missing / invalid webinar date-time" },
        { status: 400 }
      );
    }

    const activeLead = await findActiveLeadByContact({
      email: normalized.email,
      phone10,
    });

    if (activeLead) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are already registered for a webinar. Please wait until it is completed before submitting again.",
        },
        { status: 409 }
      );
    }

    const leadId = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`)
      .replace(/[^\w-]/g, "");

    // save row first (A:M)
    const { rowNumber } = await saveToSheet({
      name: normalized.name,
      email: normalized.email,
      phone: phone10,
      source: process.env.NODE_ENV === "production" ? "website-prod" : "website-local",
      webinarDay,
      webinarDate,
      webinarTime,
      webinarISO,
      leadId,
    });

    const whatsappEnabled = isWhatsAppSendingEnabled();
    let confirmationStatus = whatsappEnabled ? "failed" : "disabled";

    if (whatsappEnabled) {
      try {
        await sendConfirmation({
          name: normalized.name,
          email: normalized.email,
          phone10,
          webinarMeta: { webinarDay, webinarDate, webinarTime, webinarISO },
        });
        confirmationStatus = "yes";
      } catch (sendError) {
        console.error("WHATSAPP_CONFIRMATION_FAILED", {
          rowNumber,
          leadId,
          message: sendError?.message || String(sendError),
        });
      }
    } else {
      console.log("WHATSAPP_CONFIRMATION_SKIPPED", {
        rowNumber,
        leadId,
        reason: "WHATSAPP_SENDING_ENABLED=false",
      });
    }

    // schedule reminders via QStash
    if (rowNumber && whatsappEnabled) {
      const baseUrl = getQstashTargetUrl(req.url, req.headers);
      const receiverUrl = `${baseUrl}/api/qstash`;
      try {
        const parsed = new URL(receiverUrl);
        if (!/^https?:$/.test(parsed.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        throw new Error(
          `Invalid QStash destination URL: ${receiverUrl}. Set QSTASH_TARGET_URL with http:// or https://`
        );
      }

      const webinarTs = new Date(webinarISO).getTime();
      if (Number.isNaN(webinarTs)) throw new Error("Invalid webinarISO");

      const oneDayEpoch = toEpochSeconds(new Date(webinarTs - 24 * 60 * 60 * 1000).toISOString());
      const tenMinEpoch = toEpochSeconds(new Date(webinarTs - 10 * 60 * 1000).toISOString());
      const liveEpoch = toEpochSeconds(new Date(webinarTs).toISOString());

      const payload = {
        rowNumber,
        leadId,
        name: normalized.name,
        email: normalized.email,
        phone10,
        webinarDay,
        webinarDate,
        webinarTime,
        webinarISO,
      };

      await publishScheduled({
        url: receiverUrl,
        body: { type: "1day", ...payload },
        notBeforeEpochSeconds: oneDayEpoch,
      });
      await publishScheduled({
        url: receiverUrl,
        body: { type: "10min", ...payload },
        notBeforeEpochSeconds: tenMinEpoch,
      });
      await publishScheduled({
        url: receiverUrl,
        body: { type: "live", ...payload },
        notBeforeEpochSeconds: liveEpoch,
      });
    }

    // Mark confirmation status without failing the saved lead.
    if (rowNumber) {
      await markCell(rowNumber, COL_LETTER_SENT_CONFIRM, confirmationStatus);
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("API Error:", error);
    const raw = String(error?.message || "");
    let safeMessage = "Something went wrong. Please try again.";
    const lowerRaw = raw.toLowerCase();
    if (
      lowerRaw.includes("insufficient whatsapp conversation credits") ||
      lowerRaw.includes("insufficient wallet balance")
    ) {
      safeMessage = "We are facing some issue. Please try again later.";
    } else if (lowerRaw.includes("invalid phone")) {
      safeMessage = "Please enter a valid 10-digit phone number.";
    } else if (lowerRaw.includes("webinar")) {
      safeMessage = "Please refresh the page and try again.";
    }
    return NextResponse.json(
      { success: false, message: safeMessage },
      { status: 400 }
    );
  }
}
