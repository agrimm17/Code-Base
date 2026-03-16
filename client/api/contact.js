import nodemailer from 'nodemailer';

const INBOX_EMAIL = 'alexandergrimm17@gmail.com';

function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON body.',
      });
    }
  }
  body = body ?? {};

  const { name, email, message } = body;

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

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    await transporter.sendMail({
      from: user,
      to: INBOX_EMAIL,
      replyTo: email.trim(),
      subject: `Portfolio contact from ${name.trim()}`,
      text: message.trim(),
      html: `<p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p><p>${safeMessage.replace(/\n/g, '<br>')}</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact send error:', err);
    const payload = {
      success: false,
      error: 'Failed to send message. Please try again later.',
    };
    if (process.env.VERCEL_ENV !== 'production') {
      payload.debug = err.message || String(err);
    }
    return res.status(500).json(payload);
  }
};
