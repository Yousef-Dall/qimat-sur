// api/send-email.js  (CommonJS; Vercel/Netlify compatible)
//
// ENV you must set in Vercel → Project → Settings → Environment Variables:
//
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=465
//   SMTP_SECURE=true
//   SMTP_USER=longliveyousefdalloul@gmail.com
//   SMTP_PASS=<YOUR_GMAIL_APP_PASSWORD>
//   SMTP_FROM=longliveyousefdalloul@gmail.com            # optional (defaults to SMTP_USER)
//   TO_EMAIL=yousef.n.d.2002@gmail.com                  # receiver inbox
//   ALLOW_ORIGINS=https://qimat-sur.vercel.app,http://localhost:3000
//
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.TO_EMAIL || "yousef.n.d.2002@gmail.com";
    const fromAddr = process.env.SMTP_FROM || process.env.SMTP_USER;

    const subject =
      lang === "ar"
        ? `طلب تواصل من ${name} - QSMT`
        : `QSMT Inquiry from ${name}`;

    const text = [
      lang === "ar" ? "رسالة جديدة (نموذج الموقع)" : "New Inquiry / Feedback",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      "",
      "Message:",
      message,
      "",
      "--",
      "Sent from QSMT website form",
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:#111;">
        <h2 style="margin:0 0 10px;">
          ${
            lang === "ar"
              ? "رسالة جديدة (نموذج الموقع)"
              : "New Inquiry / Feedback"
          }
        </h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone || "-")}</p>
        <p style="margin:18px 0 6px;"><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;background:#f6f7fb;padding:12px;border-radius:8px;border:1px solid #e5e7f2;">
          ${esc(message)}
        </div>
        <hr style="border:none;border-top:1px solid #e5e7f2;margin:16px 0;" />
        <small>Sent from QSMT website form</small>
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

    return ok(res);
  } catch (err) {
    console.error("[send-email]", err);
    return bad(res, 500, "Email failed to send.");
  }
};
