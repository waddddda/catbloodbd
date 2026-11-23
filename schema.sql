-- CatBloodBD migration. Run in Supabase → SQL Editor BEFORE deploying the new site.
-- Safe to re-run.

-- 1. New columns the site now uses ---------------------------------------
alter table cats add column if not exists travel_ok boolean not null default false;
alter table emergency_alerts add column if not exists division text;

-- 2. Clinics: everyone can read, only you can write (via the dashboard) ---
create table if not exists clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  division text not null,
  district text not null,
  address text,
  phone text,
  emergency_24h boolean not null default false,
  status text not null default 'listed' check (status in ('confirmed', 'listed')),
  source_url text,
  last_verified date,
  notes text,
  created_at timestamptz not null default now()
);

alter table clinics enable row level security;
drop policy if exists "clinics public read" on clinics;
create policy "clinics public read" on clinics for select using (true);

-- 3. Clinic suggestions: everyone can submit, only you can read them -----
create table if not exists clinic_suggestions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  division text not null,
  district text not null,
  phone text,
  note text,
  created_at timestamptz not null default now()
);

alter table clinic_suggestions enable row level security;
drop policy if exists "anyone can suggest" on clinic_suggestions;
create policy "anyone can suggest" on clinic_suggestions for insert with check (true);

-- 4. Seed: the only clinics I could find listing transfusion online -------
-- status = 'listed' means "their own website says so". Change a row to
-- 'confirmed' and set last_verified only after YOU have phoned and asked
-- whether they transfuse CATS and have a donor pool.
insert into clinics (name, division, district, address, phone, emergency_24h, status, source_url, notes)
select v.name, v.division, v.district, v.address, v.phone, v.emergency_24h, v.status, v.source_url, v.notes
from (values
  ('Precise PetLab', 'Dhaka', 'Dhaka',
   'House 15, Road 24, Gulshan 2, Dhaka 1212', '+880 1800-000203', true, 'listed',
   'https://precisepetlab.com/',
   'Website lists blood transfusion under 24/7 emergency care. Call to confirm cat transfusion and donor availability.'),
  ('CVASU Veterinary Hospital (Khulshi)', 'Chittagong', 'Chittagong',
   'Khulshi, Chattogram', '01314300655', false, 'listed',
   'https://cvasu.ac.bd/office/directorate-of-veterinary-clinics',
   'University page lists an animal blood transfusion unit and a dog and cat care unit. Confirm it is open and does cat transfusions.'),
  ('CVASU Pet Hospital (Dhaka)', 'Dhaka', 'Dhaka',
   null, '01814362649', false, 'listed',
   'https://cvasu.ac.bd/office/directorate-of-veterinary-clinics',
   'Same CVASU directorate page lists this number for its Dhaka pet hospital. Confirm transfusion and address by phone.')
) as v(name, division, district, address, phone, emergency_24h, status, source_url, notes)
where not exists (
  select 1 from clinics c where c.name = v.name and c.district = v.district
);

-- 5. OPTIONAL hardening (read the comment, then uncomment) ----------------
-- The site reads donors' phone numbers on purpose (that is how people reach
-- them). It does NOT need donors.email in the browser any more. If your
-- existing RLS lets anyone select from donors, everyone can read every
-- donor's email too. This limits what the public API can read:
--
-- revoke select on donors from anon, authenticated;
-- grant select (id, user_id, phone_number, division, district) on donors to anon, authenticated;
--
-- Check Authentication → Policies first, and test signup + search afterwards.
