/*
# Create rental_requests table

1. New Table
- `rental_requests` — self-serve equipment rental reservations submitted
  from the site's rental quote builder.
2. Security
- RLS enabled. INSERT open to anon + authenticated (no-auth public form).
  All other verbs restricted to service_role (server-side / dashboard use).
- Grants: anon/authenticated get INSERT only; service_role gets all.
3. Notes
- Mirrors the quote_requests pattern. `items` stores the cart as JSON so
  the builder's breakdown is preserved without a separate cart table.
*/

CREATE TABLE IF NOT EXISTS rental_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),

  name text NOT NULL,
  phone text NOT NULL,
  email text,
  company text,
  delivery boolean NOT NULL DEFAULT false,
  address text,
  has_insurance boolean NOT NULL DEFAULT false,
  wants_operator boolean NOT NULL DEFAULT false,
  notes text,

  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  pickup_date date,
  return_date date,
  half_day boolean NOT NULL DEFAULT false,
  delivery_miles integer,

  damage_waiver boolean NOT NULL DEFAULT true,
  subtotal numeric(10, 2) NOT NULL DEFAULT 0,
  waiver_amount numeric(10, 2) NOT NULL DEFAULT 0,
  delivery_cost numeric(10, 2) NOT NULL DEFAULT 0,
  tax numeric(10, 2) NOT NULL DEFAULT 0,
  total numeric(10, 2) NOT NULL DEFAULT 0,
  deposit numeric(10, 2) NOT NULL DEFAULT 500
);

ALTER TABLE rental_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON rental_requests TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON rental_requests TO service_role;

CREATE POLICY "anon_insert_rental_requests"
ON rental_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);
