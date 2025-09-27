// api/send-email.js  (CommonJS, works on Vercel/Netlify serverless)
// Required env:
//   SMTP_HOST, SMTP_PORT, SMTP_SECURE ("true"/"false"), SMTP_USER, SMTP_PASS
//   TO_EMAIL
// Optional:
//   SMTP_FROM (defaults to SMTP_USER), ALLOW_ORIGINS (comma-separated list)

const nodemailer = require("nodemailer");

/** Very small CORS helper (allows OPTIONS preflight) */
function applyCors(req, res) {
  const allowList = (process.env.ALLOW_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const origin = req.headers.origin;
  if (allowList.length && origin && allowList.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!allowList.length) {
    // fallback: allow all if list not provided
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

/** Minimal HTML escaper for safe email rendering */
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

module.exports = async (req, res) => {
  // CORS / preflight
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST,OPTIONS");
    return bad(res, 405, "Method not allowed");
  }

  try {
    // Body may be a string on some platforms; normalize to object
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
    } = body;

    // Honeypot (add hidden input named "website" in your form; it must stay empty)
    if (website) return ok(res, { filtered: true });

    // Validate basics
    if (!name.trim() || !email.trim() || !message.trim()) {
      return bad(res, 400, "Missing required fields.");
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return bad(res, 400, "Invalid email.");
    }

    // SMTP config
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

    const to = process.env.TO_EMAIL || "longliveyousefdalloul@gmail.com";
    const fromAddr = process.env.SMTP_FROM || process.env.SMTP_USER;

    const subject = `QSMT Inquiry from ${name}`;

    const text = [
      "New Inquiry / Feedback",
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
        <h2 style="margin:0 0 10px;">New Inquiry / Feedback</h2>
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
