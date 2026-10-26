# Rock The Hock Land Clearing website

Source for https://www.rthllc.com, exported from Bolt on 2026-10-26.

- Vite + React + TypeScript + Tailwind.
- `npm install`, then `npm run dev` to preview or `npm run build` to build into `dist/`.
- Quote and rental requests are emailed through Formspree (`FORM_ENDPOINT` in `src/lib/constants.ts`) and saved to Supabase (settings in `.env.production`).
- Rental items and prices live in `src/lib/rentals.ts`; business info in `src/lib/constants.ts`.
- Site photos are served from the Supabase `quote-photos` bucket (`PHOTO_BASE`).

Static hosting settings: build command `npm run build`, output directory `dist`.
