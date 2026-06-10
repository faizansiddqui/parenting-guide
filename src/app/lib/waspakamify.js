// src/app/lib/waspakamify.js
import { to91 } from "./phone";

const WASPAKAMIFY_DEBUG = process.env.WASPAKAMIFY_DEBUG === "true";

export function isWhatsAppSendingEnabled() {
  return process.env.WHATSAPP_SENDING_ENABLED !== "false";
}

function maskValue(value) {
  const str = String(value ?? "");
  if (!str) return "";
  if (str.includes("@")) {
    const [user, domain] = str.split("@");
    const safeUser = user.length <= 2 ? `${user[0] || ""}*` : `${user[0]}***${user[user.length - 1]}`;
    return `${safeUser}@${domain}`;
  }
  if (/^\d{6,}$/.test(str)) {
    return `${str.slice(0, 2)}******${str.slice(-2)}`;
  }
  return str.length > 8 ? `${str.slice(0, 4)}****${str.slice(-2)}` : `${str[0]}***`;
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function buildCampaignSendUrl() {
  const baseUrl = requireEnv("WASPAKAMIFY_BASE_URL").replace(/\/+$/, "");
  return `${baseUrl}/integrations/campaigns/send`;
}

async function callWaspAkamify({ campaignName, destination, variables }) {
  if (!isWhatsAppSendingEnabled()) {
    console.log("WaspAkamify send skipped: WHATSAPP_SENDING_ENABLED=false", {
      campaignName,
      destination: maskValue(destination),
    });
    return { status: "skipped", reason: "disabled" };
  }

  const apiKey = requireEnv("WASPAKAMIFY_API_KEY");
  const payload = {
    campaignName,
    recipients: [
      {
        to: destination,
        variables: variables.map((value) => String(value ?? "")),
      },
    ],
  };

  if (WASPAKAMIFY_DEBUG) {
    console.log("WaspAkamify DEBUG:", {
      campaignName,
      destination: maskValue(destination),
      variablesCount: payload.recipients[0].variables.length,
      variables: payload.recipients[0].variables.map(maskValue),
    });
  }

  const response = await fetch(buildCampaignSendUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  console.log("WaspAkamify RAW response:", text);

  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(`WaspAkamify failed (${response.status}): ${text}`);
  }

  if (data?.success === true || data?.status === "success" || data?.status === "queued") {
    return { status: "success", data };
  }

  throw new Error("WaspAkamify failed: " + text);
}

export async function sendConfirmation({ name, email, phone10, webinarMeta }) {
  return callWaspAkamify({
    campaignName: requireEnv("WASPAKAMIFY_CAMPAIGN_CONFIRM"),
    destination: to91(phone10),
    // TEMPLATE: {{1}} name, {{2}} email, {{3}} phone, {{4}} date, {{5}} day, {{6}} time
    variables: [
      name,
      email,
      phone10,
      webinarMeta.webinarDate,
      webinarMeta.webinarDay,
      webinarMeta.webinarTime,
    ],
  });
}

export async function sendCoursePurchaseWhatsApp({
  name,
  email,
  phone10,
  courseName,
  whatsappCommunityUrl,
}) {
  return callWaspAkamify({
    campaignName: requireEnv("WASPAKAMIFY_CAMPAIGN_COURSE_PURCHASE"),
    destination: to91(phone10),
    // TEMPLATE: {{1}} name, {{2}} email, {{3}} course name, {{4}} WhatsApp community URL
    variables: [name, email, courseName, whatsappCommunityUrl],
  });
}

export async function send1DayReminder({ name, phone10, webinarDate, webinarDay, webinarTime }) {
  return callWaspAkamify({
    campaignName: requireEnv("WASPAKAMIFY_CAMPAIGN_1DAY"),
    destination: to91(phone10),
    // TEMPLATE: {{1}} name, {{2}} date, {{3}} day, {{4}} time, {{5}} community URL
    variables: [
      name,
      webinarDate,
      webinarDay,
      webinarTime,
      requireEnv("WHATSAPP_COMMUNITY_URL"),
    ],
  });
}

export async function sendMorningReminder({ name, phone10, webinarDate, webinarDay, webinarTime }) {
  return callWaspAkamify({
    campaignName: requireEnv("WASPAKAMIFY_CAMPAIGN_MORNING"),
    destination: to91(phone10),
    // TEMPLATE: {{1}} name, {{2}} date, {{3}} day, {{4}} time, {{5}} webinar link, {{6}} community URL
    variables: [
      name,
      webinarDate,
      webinarDay,
      webinarTime,
      requireEnv("WEBINAR_LINK"),
      requireEnv("WHATSAPP_COMMUNITY_URL"),
    ],
  });
}

export async function send10MinReminder({ name, phone10, webinarDate, webinarDay, webinarTime }) {
  return callWaspAkamify({
    campaignName: requireEnv("WASPAKAMIFY_CAMPAIGN_10MIN"),
    destination: to91(phone10),
    // TEMPLATE: {{1}} name, {{2}} date, {{3}} day, {{4}} time, {{5}} webinar link, {{6}} community URL
    variables: [
      name,
      webinarDate,
      webinarDay,
      webinarTime,
      requireEnv("WEBINAR_LINK"),
      requireEnv("WHATSAPP_COMMUNITY_URL"),
    ],
  });
}

export async function sendLiveNow({ name, phone10, webinarDate, webinarDay, webinarTime }) {
  return callWaspAkamify({
    campaignName: requireEnv("WASPAKAMIFY_CAMPAIGN_LIVE"),
    destination: to91(phone10),
    // TEMPLATE: {{1}} name, {{2}} date, {{3}} day, {{4}} time, {{5}} webinar link, {{6}} community URL
    variables: [
      name,
      webinarDate,
      webinarDay,
      webinarTime,
      requireEnv("WEBINAR_LINK"),
      requireEnv("WHATSAPP_COMMUNITY_URL"),
    ],
  });
}
