const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, phone, reason } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name und E-Mail sind erforderlich' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"NeuroVita Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'info@neurovita-berlin.de',
      subject: `Neue Terminanfrage von ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Neue Terminanfrage</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
            <p><strong>Grund des Besuchs:</strong></p>
            <p style="white-space: pre-wrap;">${reason || 'Nicht angegeben'}</p>
          </div>
          <p style="color: #7f8c8d; font-size: 12px; margin-top: 20px;">
            Diese Nachricht wurde über das Kontaktformular auf neurovita-berlin.de gesendet.
          </p>
        </div>
      `,
      text: `
Neue Terminanfrage

Name: ${name}
E-Mail: ${email}
Telefon: ${phone || 'Nicht angegeben'}
Grund des Besuchs: ${reason || 'Nicht angegeben'}

Diese Nachricht wurde über das Kontaktformular auf neurovita-berlin.de gesendet.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'E-Mail erfolgreich gesendet'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Fehler beim Senden der E-Mail',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
