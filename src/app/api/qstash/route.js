// src/app/api/qstash/route.js
import { NextResponse } from "next/server";
import { verifyQstashRequest } from "../../lib/qstash";
import { findRowByLeadId, markCell } from "../../lib/googleSheet";
import {
  isWhatsAppSendingEnabled,
  send1DayReminder,
  send10MinReminder,
  sendLiveNow,
} from "../../lib/waspakamify";

const REMINDER_COLUMNS = {
  "1day": "K",
  "10min": "L",
  live: "M",
};

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get("upstash-signature") || "";

    const isValid = await verifyQstashRequest({ body, signature, reqUrl: req.url });
    if (!isValid) {
      return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(body || "{}");
    const {
      type,
      rowNumber,
      leadId,
      name,
      phone10,
      webinarDate,
      webinarDay,
      webinarTime,
    } = data;

    if (!type) {
      return NextResponse.json({ ok: false, message: "Missing payload fields" }, { status: 400 });
    }

    let targetRow = null;
    if (leadId) {
      targetRow = await findRowByLeadId(leadId);
    }
    if (!targetRow && rowNumber) {
      targetRow = rowNumber;
    }
    if (!targetRow) {
      return NextResponse.json({ ok: false, message: "Row not found" }, { status: 404 });
    }

    console.log("QSTASH RECEIVED", { type, rowNumber: targetRow, leadId, phone10, webinarDate, webinarDay, webinarTime });

    if (!isWhatsAppSendingEnabled()) {
      const column = REMINDER_COLUMNS[type];
      if (column) {
        await markCell(targetRow, column, "disabled");
      }
      console.log("QSTASH WHATSAPP SKIPPED", {
        type,
        rowNumber: targetRow,
        reason: "WHATSAPP_SENDING_ENABLED=false",
      });
      return NextResponse.json({ ok: true, skipped: true });
    }

    if (type === "1day") {
      await send1DayReminder({ name, phone10, webinarDate, webinarDay, webinarTime });
      await markCell(targetRow, "K", "yes");
      console.log("QSTASH SENT 1DAY", { rowNumber: targetRow });
    } else if (type === "10min") {
      await send10MinReminder({ name, phone10, webinarDate, webinarDay, webinarTime });
      await markCell(targetRow, "L", "yes");
      console.log("QSTASH SENT 10MIN", { rowNumber: targetRow });
    } else if (type === "live") {
      await sendLiveNow({ name, phone10, webinarDate, webinarDay, webinarTime });
      await markCell(targetRow, "M", "yes");
      console.log("QSTASH SENT LIVE", { rowNumber: targetRow });
    } else {
      return NextResponse.json({ ok: false, message: "Unknown job type" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("QStash Error:", error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
