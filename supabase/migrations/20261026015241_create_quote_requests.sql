/*
# Create quote_requests table (single-tenant, no auth)

1. New Tables
- `quote_requests`
  - id (uuid, primary key)
  - services (text[], requested services)
  - approx_size (text, acreage bucket)
  - vegetation (text, growth density bucket)
  - address_or_road (text, location description)
  - town_county (text, town/county)
  - how_soon (text, timing bucket)
  - photo_urls (text[], optional submitted photo URLs)
  - notes (text, optional notes)
  - name (text, required)
  - phone (text, required mobile phone)
  - email (text, optional)
  - preferred_contact (text, call/text/email)
  - site_walk_date (date, optional)
  - site_walk_time (text, morning/afternoon, optional)
  - referral_source (text, how they heard about us)
  - status (text, default 'new')
  - created_at (timestamptz, default now())
2. Security
- Enable RLS on `quote_requests`.
- Grant INSERT to anon + authenticated so the public form can submit.
- Allow anon + authenticated inserts only (public quote form). No public reads of submissions.
*/
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  services text[] NOT NULL DEFAULT '{}',
  approx_size text,
  vegetation text,
  address_or_road text,
  town_county text,
  how_soon text,
  photo_urls text[] NOT NULL DEFAULT '{}',
  notes text,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  preferred_contact text,
  site_walk_date date,
  site_walk_time text,
  referral_source text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON quote_requests TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;
CREATE POLICY "anon_insert_quote_requests"
ON quote_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);
