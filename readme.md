# Faith for the Cosmos — Course Platform

Standalone login, module delivery, progress tracking, and certificate
generation, built to sit alongside your existing landing page at
faith-for-cosmos.netlify.app.

## What's included

- `login.html` — magic link sign-in (no passwords)
- `dashboard.html` — module list, progress bar, certificate download
- `modules/module-1.html` through `module-4.html` — full lesson content, gated behind login
- `js/supabase-client.js` — fill in your Supabase project URL + anon key here
- `js/auth.js` — shared auth/progress helper functions
- `css/course.css` — uses CSS variables at the top so you can retheme colors/fonts to match your book cover art (dusk sky, gold accent currently set as a placeholder)
- `supabase/schema.sql` — run this once in the Supabase SQL Editor to create the database tables

## Setup steps

1. **Create a Supabase project** at supabase.com (see chat for the walkthrough)
2. **Run `supabase/schema.sql`** in Supabase's SQL Editor to create the `profiles` and `progress` tables
3. **Fill in `js/supabase-client.js`** with your Project URL and anon public key from Supabase's API settings
4. **Set your Site URL** in Supabase under Authentication > URL Configuration to your live Netlify domain, so magic links redirect correctly
5. **Move this repo to GitHub**, then connect that repo to Netlify (Netlify > Site settings > Build & deploy > Link to Git repository) so future changes deploy automatically on push
6. **Drop these files into your existing site folder** alongside your landing page. Link "Enroll Now" on the landing page to `login.html`
7. Test locally or on a Netlify preview: sign up with your own email, confirm the magic link works, click through all four modules, mark them complete, and confirm the certificate downloads correctly with all four marked

## Notes

- Certificates are generated client-side (via jsPDF) the moment all four modules are marked complete, no server or paid service needed
- The `full_name` field isn't collected yet, certificates currently fall back to the user's email as their name. Let me know if you want a "complete your profile" step added before the first module so the certificate shows a real name
- Progress is per logged-in user via Supabase Row Level Security, pastors can only ever see and edit their own progress
