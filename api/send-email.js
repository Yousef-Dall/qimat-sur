// api/send-email.js (CommonJS)
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.TO_EMAIL || "longliveyousefdalloul@gmail.com";
    const esc = (s = "") =>
      String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif">
        <h2>New Inquiry / Feedback</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <p><b>Phone:</b> ${esc(phone || "-")}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;background:#f6f7fb;padding:12px;border-radius:8px">${esc(
          message
        )}</pre>
        <hr/>
        <small>Sent from QSMT website form</small>
      </div>
    `;

    await transporter.sendMail({
      from: `"QSMT Website" <${process.env.SMTP_USER}>`,
      to,
      subject: `QSMT Inquiry from ${name}`,
      replyTo: email,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Email failed to send." });
  }
};
