/*
# Create quote-photos storage bucket

1. New Storage Bucket
- `quote-photos` — public bucket for visitor-submitted quote request photos.
  Photos are uploaded by anonymous site visitors and read publicly so the
  photo URLs can be included in the Formspree email to Shay.
2. Security
- Bucket is public (public = true) so uploaded files are readable by anyone
  with the URL.
- Storage object policies: allow anon + authenticated to INSERT and SELECT
  objects in the `quote-photos` bucket. No UPDATE or DELETE from the site.
3. Notes
- The bucket is intentionally public-read/write for inserts because the quote
  form is a no-auth public form. Each upload gets a random UUID-based path so
  URLs are not guessable.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('quote-photos', 'quote-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload files to the quote-photos bucket.
DROP POLICY IF EXISTS "anon_insert_quote_photos" ON storage.objects;
CREATE POLICY "anon_insert_quote_photos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'quote-photos');

-- Allow anyone to read (view) files in the quote-photos bucket.
DROP POLICY IF EXISTS "anon_select_quote_photos" ON storage.objects;
CREATE POLICY "anon_select_quote_photos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'quote-photos');
