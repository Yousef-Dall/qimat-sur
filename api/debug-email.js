// api/debug-email.js - Enhanced debugging version
const nodemailer = require("nodemailer");

/** CORS helper */
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
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}

module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  // Allow GET requests for debugging
  if (req.method === "GET") {
    return res.status(200).json({
      message: "Email Debug Endpoint - Environment Check",
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV || "NOT_SET",
        SMTP_HOST: process.env.SMTP_HOST ? "✅ SET" : "❌ NOT_SET",
        SMTP_PORT: process.env.SMTP_PORT ? `✅ SET (${process.env.SMTP_PORT})` : "❌ NOT_SET",
        SMTP_USER: process.env.SMTP_USER ? "✅ SET" : "❌ NOT_SET",
        SMTP_PASS: process.env.SMTP_PASS ? `✅ SET (${process.env.SMTP_PASS.length} chars)` : "❌ NOT_SET",
        SMTP_FROM: process.env.SMTP_FROM ? "✅ SET" : "❌ NOT_SET",
        TO_EMAIL: process.env.TO_EMAIL ? "✅ SET" : "❌ NOT_SET",
        ALLOW_ORIGINS: process.env.ALLOW_ORIGINS ? "✅ SET" : "❌ NOT_SET"
      },
      vercelInfo: {
        region: process.env.VERCEL_REGION || "NOT_SET",
        url: process.env.VERCEL_URL || "NOT_SET"
      }
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET,POST,OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const debugLog = {
    timestamp: new Date().toISOString(),
    steps: []
  };

  try {
    debugLog.steps.push("1. Request received");
    
    // Environment validation
    const requiredEnvs = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
    const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
    
    if (missingEnvs.length > 0) {
      debugLog.steps.push(`2. ❌ Missing environment variables: ${missingEnvs.join(', ')}`);
      return res.status(500).json({ 
        error: "Server configuration error",
        debug: debugLog,
        missingEnvs
      });
    }
    debugLog.steps.push("2. ✅ Environment variables present");

    // Parse request body
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { name = "", phone = "", email = "", message = "", website = "", lang } = body;
    
    debugLog.steps.push("3. ✅ Request body parsed");
    debugLog.formData = { name, email, hasPhone: !!phone, messageLength: message.length };

    // Validation
    if (website) {
      debugLog.steps.push("4. 🤖 Honeypot triggered - bot detected");
      return res.status(200).json({ ok: true, filtered: true, debug: debugLog });
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      debugLog.steps.push("4. ❌ Validation failed");
      return res.status(400).json({ error: "Missing required fields", debug: debugLog });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      debugLog.steps.push("4. ❌ Invalid email format");
      return res.status(400).json({ error: "Invalid email", debug: debugLog });
    }
    debugLog.steps.push("4. ✅ Validation passed");

    // SMTP Configuration
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || port === 465;
    
    const smtpConfig = {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
    
    debugLog.steps.push("5. ✅ SMTP config created");
    debugLog.smtpConfig = {
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      user: smtpConfig.auth.user,
      passLength: smtpConfig.auth.pass?.length || 0
    };

    // Create transporter
    const transporter = nodemailer.createTransporter(smtpConfig);
    debugLog.steps.push("6. ✅ Transporter created");

    // Verify connection
    try {
      await transporter.verify();
      debugLog.steps.push("7. ✅ SMTP connection verified");
    } catch (verifyError) {
      debugLog.steps.push(`7. ❌ SMTP verification failed: ${verifyError.message}`);
      return res.status(500).json({
        error: "SMTP connection failed",
        smtpError: verifyError.message,
        debug: debugLog
      });
    }

    // Prepare email
    const to = process.env.TO_EMAIL || "yousef.n.d.2002@gmail.com";
    const fromAddr = process.env.SMTP_FROM || process.env.SMTP_USER;
    
    const subject = lang === "ar" ? `🔧 طلب تواصل من ${name} - QSMT` : `🔧 QSMT Contact from ${name}`;
    
    const mailOptions = {
      from: `"QSMT Website Debug" <${fromAddr}>`,
      to,
      subject: `[DEBUG] ${subject}`,
      replyTo: email,
      text: `Debug Test Email\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nMessage: ${message}\n\nDebug Info: ${JSON.stringify(debugLog, null, 2)}`
    };

    debugLog.steps.push("8. ✅ Email prepared");

    // Send email
    const result = await transporter.sendMail(mailOptions);
    debugLog.steps.push(`9. ✅ Email sent successfully - MessageId: ${result.messageId}`);

    return res.status(200).json({
      ok: true,
      message: "Debug email sent successfully",
      messageId: result.messageId,
      debug: debugLog
    });

  } catch (error) {
    debugLog.steps.push(`❌ Error: ${error.message}`);
    debugLog.error = {
      message: error.message,
      code: error.code,
      response: error.response
    };

    console.error("Debug email error:", error);
    return res.status(500).json({
      error: "Email sending failed",
      details: error.message,
      debug: debugLog
    });
  }
};