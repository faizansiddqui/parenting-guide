// src/app/api/whatsapp/route.js
import { NextResponse } from "next/server";
import { cleanPhone10 } from "../../lib/phone";
import { validateForm } from "../../lib/validate";
import { findActiveLeadByContact, saveToSheet, markCell } from "../../lib/googleSheet";
import { isWhatsAppSendingEnabled, sendConfirmation } from "../../lib/waspakamify";
import { getQstashTargetUrl, publishScheduled, toEpochSeconds } from "../../lib/qstash";
import {
  formatWebinarParts,
  getMorningReminderDate,
  getNextWebinarDate,
} from "../../lib/webinar";

// Column J = sentConfirmation
const COL_LETTER_SENT_CONFIRM = "J";

export async function POST(req) {
  try {
    const body = await req.json();

    // basic validations + normalization
    const normalized = validateForm(body);

    const phone10 = cleanPhone10(normalized.phone);

    const webinarDT = getNextWebinarDate();
    const { webinarDay, webinarDate, webinarTime } = formatWebinarParts(webinarDT);
    const webinarISO = webinarDT.toISOString();

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

    // Save the lead before sending or scheduling messages.
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

    // schedule reminders via QStash only if confirmation was sent successfully
    if (rowNumber && whatsappEnabled && confirmationStatus === "yes") {
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
      const morningEpoch = toEpochSeconds(getMorningReminderDate(webinarDT).toISOString());
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
        body: { type: "morning", ...payload },
        notBeforeEpochSeconds: morningEpoch,
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

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully!",
      webinar: { webinarDay, webinarDate, webinarTime },
    });
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
