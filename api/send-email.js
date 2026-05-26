export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { district, bloodType, seekerPhone, donorEmail } = req.body;

  if (!district || !bloodType || !seekerPhone || !donorEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CatBloodBD <onboarding@resend.dev>',
        to: [donorEmail],
        subject: `🚨 Emergency: Type ${bloodType} Blood Needed in ${district}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #fef2f2; border-radius: 8px;">
            <h2 style="color: #e04f4f;">🚨 Emergency Blood Alert!</h2>
            <p><strong>Type ${bloodType}</strong> blood is urgently needed in <strong>${district}</strong>.</p>
            <p style="font-size: 1.2em;">Seeker's Phone: <a href="tel:${seekerPhone}" style="color: #0066cc;">${seekerPhone}</a></p>
            <p style="margin-top: 20px;">If you have a cat donor matching this need, please contact them immediately.</p>
            <p style="margin-top: 20px; color: #777; font-size: 0.9em;">CatBloodBD – Saving cat lives across Bangladesh</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: error.message });
  }
}
