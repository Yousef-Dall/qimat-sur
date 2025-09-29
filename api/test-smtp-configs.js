// Alternative SMTP configuration test
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
  
  // Try multiple SMTP configurations
  const configs = [
    {
      name: "Standard Gmail SMTP",
      config: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    },
    {
      name: "Gmail SMTP with TLS",
      config: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    },
    {
      name: "Gmail with explicit TLS",
      config: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        tls: {
          ciphers: 'SSLv3'
        },
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    }
  ];

  const results = {
    timestamp,
    environment: {
      SMTP_USER: process.env.SMTP_USER || "NOT_SET",
      SMTP_PASS: process.env.SMTP_PASS ? `SET (${process.env.SMTP_PASS.length} chars)` : "NOT_SET",
      TO_EMAIL: process.env.TO_EMAIL || "NOT_SET"
    },
    tests: []
  };

  // Test each configuration
  for (const { name, config } of configs) {
    try {
      const transporter = nodemailer.createTransport(config);
      await transporter.verify();
      results.tests.push({ name, status: "✅ SUCCESS", error: null });
      
      // If this is a POST request and this config worked, try sending an email
      if (req.method === "POST") {
        try {
          const result = await transporter.sendMail({
            from: `"QSMT Alternative Test" <${process.env.SMTP_USER}>`,
            to: process.env.TO_EMAIL,
            subject: `🧪 QSMT Alternative SMTP Test - ${name}`,
            text: `Alternative SMTP configuration test successful at ${timestamp}\nConfiguration: ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #087ccf;">🧪 QSMT Alternative SMTP Test</h2>
                <p>✅ Alternative SMTP configuration working!</p>
                <p><strong>Configuration:</strong> ${name}</p>
                <p><strong>Test time:</strong> ${timestamp}</p>
                <p><strong>Message ID:</strong> ${result.messageId}</p>
              </div>
            `
          });
          results.tests[results.tests.length - 1].emailTest = `✅ Email sent - ID: ${result.messageId}`;
          break; // Stop after first successful send
        } catch (emailError) {
          results.tests[results.tests.length - 1].emailTest = `❌ Email failed: ${emailError.message}`;
        }
      }
    } catch (error) {
      results.tests.push({ 
        name, 
        status: "❌ FAILED", 
        error: error.message,
        code: error.code 
      });
    }
  }

  return res.status(200).json(results);
};