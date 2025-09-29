// Enhanced debug endpoint to check exact environment variables in production
const nodemailer = require("nodemailer");

function applyCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}

module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  const timestamp = new Date().toISOString();
  
  // Comprehensive environment check
  const envCheck = {
    timestamp,
    method: req.method,
    vercelInfo: {
      region: process.env.VERCEL_REGION || "NOT_SET",
      url: process.env.VERCEL_URL || "NOT_SET",
      env: process.env.VERCEL_ENV || "NOT_SET"
    },
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.startsWith('SMTP_') || key.startsWith('TO_') || key.startsWith('ALLOW_')
    ),
    smtpConfig: {
      SMTP_HOST: process.env.SMTP_HOST ? `✅ ${process.env.SMTP_HOST}` : "❌ NOT_SET",
      SMTP_PORT: process.env.SMTP_PORT ? `✅ ${process.env.SMTP_PORT}` : "❌ NOT_SET",
      SMTP_SECURE: process.env.SMTP_SECURE ? `✅ ${process.env.SMTP_SECURE}` : "❌ NOT_SET",
      SMTP_USER: process.env.SMTP_USER ? `✅ ${process.env.SMTP_USER}` : "❌ NOT_SET",
      SMTP_PASS: process.env.SMTP_PASS ? `✅ SET (${process.env.SMTP_PASS.length} chars)` : "❌ NOT_SET",
      SMTP_FROM: process.env.SMTP_FROM ? `✅ ${process.env.SMTP_FROM}` : "❌ NOT_SET",
      TO_EMAIL: process.env.TO_EMAIL ? `✅ ${process.env.TO_EMAIL}` : "❌ NOT_SET",
      ALLOW_ORIGINS: process.env.ALLOW_ORIGINS ? `✅ ${process.env.ALLOW_ORIGINS}` : "❌ NOT_SET"
    }
  };

  // Test SMTP connection if all variables are present
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const port = Number(process.env.SMTP_PORT || 465);
      const secure = port === 465;
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.verify();
      envCheck.smtpTest = "✅ SMTP connection successful";
    } catch (error) {
      envCheck.smtpTest = `❌ SMTP failed: ${error.message}`;
      envCheck.smtpError = {
        code: error.code,
        response: error.response
      };
    }
  } else {
    envCheck.smtpTest = "⚠️ Cannot test SMTP - missing required variables";
  }

  // Send test email if this is a POST request
  if (req.method === "POST" && envCheck.smtpTest === "✅ SMTP connection successful") {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: Number(process.env.SMTP_PORT || 465) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const result = await transporter.sendMail({
        from: `"QSMT Debug Test" <${process.env.SMTP_USER}>`,
        to: process.env.TO_EMAIL,
        subject: "🧪 QSMT Production Email Test",
        text: `Production email test successful at ${timestamp}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #087ccf;">🧪 QSMT Production Email Test</h2>
            <p>✅ Your production email setup is working!</p>
            <p><strong>Test time:</strong> ${timestamp}</p>
            <p><strong>Environment:</strong> ${process.env.VERCEL_ENV}</p>
            <p><strong>Region:</strong> ${process.env.VERCEL_REGION}</p>
          </div>
        `
      });

      envCheck.testEmail = `✅ Test email sent successfully - ID: ${result.messageId}`;
    } catch (error) {
      envCheck.testEmail = `❌ Test email failed: ${error.message}`;
    }
  }

  return res.status(200).json(envCheck);
};