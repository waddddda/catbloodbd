// OPTIONAL and UNTESTED. Emails donors when an emergency alert is posted.
//
// Why a function: the old site read donor emails in the browser and sent mail
// from there, which meant anyone could read every donor's email. Here the
// emails stay server-side.
//
// Setup (Supabase dashboard):
//   1. supabase functions deploy notify-donors --no-verify-jwt
//   2. Set secrets: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
//      EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY
//      (EmailJS → Account → turn on "Allow EmailJS API for non-browser applications")
//   3. Database → Webhooks → new webhook on table emergency_alerts, event INSERT,
//      type "Supabase Edge Functions" → notify-donors.
//
// Your EmailJS template can use: to_email, division, blood_type, seeker_phone.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const payload = await req.json().catch(() => null);
  const alert = payload?.record;
  if (!alert?.division || !alert?.blood_type) {
    return new Response('nothing to do', { status: 200 });
  }

  const sb = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Only donors who actually have a cat of the requested blood type.
  const { data, error } = await sb
    .from('cats')
    .select('donors(email)')
    .eq('division', alert.division)
    .eq('blood_type', alert.blood_type);

  if (error) return new Response(error.message, { status: 500 });

  const emails = [...new Set(
    (data ?? [])
      // deno-lint-ignore no-explicit-any
      .map((row: any) => row.donors?.email)
      .filter((e: string | null) => e && e.trim())
  )];

  let sent = 0;
  for (const to_email of emails) {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: Deno.env.get('EMAILJS_SERVICE_ID'),
        template_id: Deno.env.get('EMAILJS_TEMPLATE_ID'),
        user_id: Deno.env.get('EMAILJS_PUBLIC_KEY'),
        accessToken: Deno.env.get('EMAILJS_PRIVATE_KEY'),
        template_params: {
          to_email,
          division: alert.division,
          blood_type: alert.blood_type,
          seeker_phone: alert.seeker_phone_number
        }
      })
    });
    if (res.ok) sent++;
  }

  return new Response(JSON.stringify({ matched: emails.length, sent }), {
    headers: { 'Content-Type': 'application/json' }
  });
});
