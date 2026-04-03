const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

function requireEnv(name) {
    const value = process.env[name];
    if (!value) throw new Error(`${name} is required`);
    return value;
}

function getSender() {
    return {
        name: process.env.BREVO_SENDER_NAME || "Mahabali Education",
        email: requireEnv("BREVO_SENDER_EMAIL"),
    };
}

async function sendBrevoEmail(payload) {
    const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": requireEnv("BREVO_API_KEY"),
        },
        body: JSON.stringify(payload),
    });

    const text = await response.text();
    if (!response.ok) {
        throw new Error(`Brevo failed (${response.status}): ${text}`);
    }

    return text;
}

export async function sendBrevoTemplateEmail({ toEmail, toName, templateId, params }) {
    const resolvedTemplateId = Number(templateId || process.env.BREVO_TEMPLATE_ID_COURSE_PURCHASE);
    if (!Number.isFinite(resolvedTemplateId) || resolvedTemplateId <= 0) {
        throw new Error("BREVO_TEMPLATE_ID_COURSE_PURCHASE is missing or invalid");
    }

    return sendBrevoEmail({
        to: [{ email: toEmail, name: toName }],
        templateId: resolvedTemplateId,
        params,
        sender: getSender(),
    });
}

export async function sendCourseAccessEmail({ toEmail, toName, params }) {
    try {
        return await sendBrevoTemplateEmail({ toEmail, toName, params });
    } catch {
        const courseName = params?.course_name || "Learn Trading in 999";
        const accessLink = params?.course_access_link || "";

        return sendBrevoEmail({
            to: [{ email: toEmail, name: toName }],
            sender: getSender(),
            subject: "Your Course Access Details",
            htmlContent: `
                <p>Hi ${toName || "Student"},</p>
                <p>Your payment is successful for <b>${courseName}</b>.</p>
                <p><b>Payment ID:</b> ${params?.payment_id || "-"}</p>
                <p><b>Order ID:</b> ${params?.order_id || "-"}</p>
                <p><b>Amount:</b> ${params?.amount || "-"}</p>
                ${accessLink ? `<p><b>Course Access Link:</b> <a href="${accessLink}">${accessLink}</a></p>` : ""}
                <p>Team Mahabali Education</p>
            `,
            textContent: `Hi ${toName || "Student"}, your payment is successful for ${courseName}. Payment ID: ${params?.payment_id || "-"}. Order ID: ${params?.order_id || "-"}. Amount: ${params?.amount || "-"}. ${accessLink ? `Course Access Link: ${accessLink}.` : ""} Team Mahabali Education`,
        });
    }
}