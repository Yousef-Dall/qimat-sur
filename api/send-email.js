// api/send-email.js - Vercel Serverless Function
const nodemailer = require("nodemailer");

/** Tiny CORS helper (handles OPTIONS preflight) */
function applyCors(req, res) {
  const allowList = (process.env.ALLOW_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const origin = req.headers.origin;
  if (allowList.length && origin && allowList.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!allowList.length) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}

const bad = (res, code, msg) => res.status(code).json({ error: msg });
const ok = (res, data) => res.status(200).json({ ok: true, ...data });

/** Minimal HTML escaping for email body safety */
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST,OPTIONS");
    return bad(res, 405, "Method not allowed");
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const {
      name = "",
      phone = "",
      email = "",
      message = "",
      website = "",
      lang,
    } = body;

    // Honeypot – if bots fill it, silently succeed
    if (website) return ok(res, { filtered: true });

    if (!name.trim() || !email.trim() || !message.trim()) {
      return bad(res, 400, "Missing required fields.");
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return bad(res, 400, "Invalid email.");

    const port = Number(process.env.SMTP_PORT || 465);
    const secure =
      String(process.env.SMTP_SECURE || "").toLowerCase() === "true" ||
      port === 465;

    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send to yousef.n.d.2002@gmail.com
    const to = process.env.TO_EMAIL || "yousef.n.d.2002@gmail.com";
    const fromAddr = process.env.SMTP_FROM || process.env.SMTP_USER;

    const subject =
      lang === "ar"
        ? `🔧 طلب تواصل من ${name} - QSMT`
        : `🔧 QSMT Contact from ${name}`;

    const text = [
      lang === "ar" ? "رسالة جديدة من موقع QSMT" : "New message from QSMT website",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Language: ${lang === "ar" ? "Arabic" : "English"}`,
      "",
      "Message:",
      message,
      "",
      "--",
      "Sent from QSMT website contact form",
      "Reply directly to customer email: " + email,
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:#111;max-width:600px;">
        <h2 style="margin:0 0 20px;color:#1f1b5a;border-bottom:3px solid #087ccf;padding-bottom:10px;">
          ${
            lang === "ar"
              ? "🔧 رسالة جديدة من موقع QSMT"
              : "🔧 New QSMT Website Inquiry"
          }
        </h2>
        
        <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0;">
          <h3 style="margin:0 0 15px;color:#1f1b5a;">📋 Contact Details</h3>
          <p><strong>👤 Name:</strong> ${esc(name)}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${esc(email)}" style="color:#087ccf;">${esc(email)}</a></p>
          <p><strong>📞 Phone:</strong> ${esc(phone || "Not provided")}</p>
          <p><strong>🌐 Language:</strong> ${lang === "ar" ? "Arabic (العربية)" : "English"}</p>
        </div>
        
        <div style="background:#fff;padding:20px;border:1px solid #e5e7f2;border-radius:8px;margin:20px 0;">
          <h3 style="margin:0 0 15px;color:#1f1b5a;">💬 Message</h3>
          <div style="white-space:pre-wrap;font-size:15px;line-height:1.5;">
            ${esc(message)}
          </div>
        </div>
        
        <div style="background:#087ccf;color:white;padding:15px;border-radius:8px;text-align:center;">
          <p style="margin:0;font-weight:bold;">
            💡 Reply directly to: <a href="mailto:${esc(email)}" style="color:#fff;text-decoration:underline;">${esc(email)}</a>
          </p>
        </div>
        
        <hr style="border:none;border-top:1px solid #e5e7f2;margin:20px 0;" />
        <small style="color:#6b7280;">
          📅 Sent: ${new Date().toLocaleString()}<br>
          🌐 From: QSMT Website Contact Form
        </small>
      </div>
    `;

    await transporter.sendMail({
      from: `"QSMT Website" <${fromAddr}>`,
      to,
      subject,
      replyTo: email,
      text,
      html,
    });

    console.log(`[send-email] Email sent successfully to ${to} from ${email}`);
    return ok(res, { message: "Email sent successfully" });
  } catch (err) {
    console.error("[send-email] Error:", err);
    return bad(res, 500, "Email failed to send.");
  }
};