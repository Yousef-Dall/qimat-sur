// api/send-email.js - Vercel Serverless Function
const nodemailer = require("nodemailer");

/** Tiny     console.log("[send-email] Creating transporter with config:", {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure,
      user: process.env.SMTP_USER ? "SET" : "NOT_SET"
    });

    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify SMTP connection before attempting to send
    console.log("[send-email] Verifying SMTP connection...");
    try {
      await transporter.verify();
      console.log("[send-email] SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("[send-email] SMTP verification failed:", {
        message: verifyError.message,
        code: verifyError.code,
        response: verifyError.response
      });
      return bad(res, 500, `SMTP connection failed: ${verifyError.message}`);
    }dles OPTIONS preflight) */
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
    // Enhanced environment validation
    const requiredEnvs = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
    const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
    
    // Log environment variables (without sensitive data)
    console.log("[send-email] Environment check:", {
      SMTP_HOST: process.env.SMTP_HOST || "NOT_SET",
      SMTP_PORT: process.env.SMTP_PORT || "NOT_SET", 
      SMTP_USER: process.env.SMTP_USER ? "SET" : "NOT_SET",
      SMTP_PASS: process.env.SMTP_PASS ? `SET (${process.env.SMTP_PASS.length} chars)` : "NOT_SET",
      TO_EMAIL: process.env.TO_EMAIL || "NOT_SET",
      MISSING_ENVS: missingEnvs.length > 0 ? missingEnvs : "NONE"
    });

    // Fail fast if critical environment variables are missing
    if (missingEnvs.length > 0) {
      console.error("[send-email] Missing critical environment variables:", missingEnvs);
      return bad(res, 500, `Server configuration error: Missing ${missingEnvs.join(', ')}`);
    }

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

    console.log("[send-email] Form data:", { name, email, phone: phone ? "PROVIDED" : "EMPTY", messageLength: message.length });

    // Honeypot – if bots fill it, silently succeed
    if (website) return ok(res, { filtered: true });

    if (!name.trim() || !email.trim() || !message.trim()) {
      console.log("[send-email] Validation failed: missing required fields");
      return bad(res, 400, "Missing required fields.");
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      console.log("[send-email] Validation failed: invalid email format");
      return bad(res, 400, "Invalid email.");
    }

    const port = Number(process.env.SMTP_PORT || 465);
    const secure =
      String(process.env.SMTP_SECURE || "").toLowerCase() === "true" ||
      port === 465;

    console.log("[send-email] Creating transporter with config:", {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure,
      user: process.env.SMTP_USER ? "SET" : "NOT_SET"
    });

    const transporter = nodemailer.createTransport({
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

    console.log("[send-email] Attempting to send email...");
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
    console.error("[send-email] Detailed error:", {
      message: err.message,
      code: err.code,
      response: err.response,
      stack: err.stack
    });
    return bad(res, 500, `Email failed to send: ${err.message}`);
  }
};