import { NextResponse } from "next/server";
import { saveCoursePurchaseToSheet2 } from "../../../lib/googleSheet";

function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.length > 10 ? digits.slice(-10) : digits;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const phone = normalizePhone(body?.phone);
    const paymentStatus = String(body?.paymentStatus || "").trim();

    if (!name || !email || !phone || !paymentStatus) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!["Done", "Cancel"].includes(paymentStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid payment status." },
        { status: 400 }
      );
    }

    await saveCoursePurchaseToSheet2({
      name,
      email,
      phone,
      courseName: "Price Behaviour Mastery",
      price: "999",
      paymentStatus,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to save payment status." },
      { status: 400 }
    );
  }
}
