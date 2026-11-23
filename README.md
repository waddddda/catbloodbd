# CatBloodBD – clinic-first rebuild

## Deploy order
1. Supabase → SQL Editor → run `schema.sql` (adds `clinics`, `clinic_suggestions`, `cats.travel_ok`, `emergency_alerts.division`, and seeds 3 clinics).
2. Replace `index.html`, `app.js`, `styles.css` in your Vercel project and redeploy.
3. Optional: `supabase/functions/notify-donors` for donor emails (untested, see header comment).

## Adding clinics
Supabase → Table Editor → `clinics`. Set `status` to `confirmed` and fill `last_verified` only after you have phoned them. New leads from the site land in `clinic_suggestions`.

## Known limits
- Emails to donors do nothing until the optional function is deployed (the old code never sent them either: EmailJS was never loaded).
- The alert cooldown is client-side only. Real abuse protection has to be in Supabase.
- Donor phone numbers are public by design. The signup page now says so.
