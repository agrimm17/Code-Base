const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const INBOX_EMAIL = 'alexandergrimm17@gmail.com';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required.',
    });
  }

  const user = process.env.EMAIL_USER;
  const password = process.env.EMAIL_APP_PASSWORD;

  if (!user || !password) {
    return res.status(503).json({
      success: false,
      error: 'Contact form is not configured. Please try again later.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass: password },
    });

    await transporter.sendMail({
      from: user,
      to: INBOX_EMAIL,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: message,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact send error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    });
  }
});

module.exports = router;
