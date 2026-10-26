/*
# Add photo_urls column to quote_requests

1. Modified Tables
- `quote_requests`
  - photo_urls (text[], default '{}') — public URLs of photos uploaded to the
    `quote-photos` storage bucket, included in the Formspree email as links.
2. Security
- No policy changes. Existing INSERT policy (anon, authenticated) covers the new
  column automatically. The column is nullable-safe via its default.
3. Notes
- This is an additive column change; no data is lost.
*/

ALTER TABLE quote_requests
  ADD COLUMN IF NOT EXISTS photo_urls text[] NOT NULL DEFAULT '{}';
