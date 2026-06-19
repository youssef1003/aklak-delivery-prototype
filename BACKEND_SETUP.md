# Backend Setup Guide (Supabase)

## 1. Creating a Supabase Project
1. Go to [Supabase](https://supabase.com) and sign in.
2. Click "New Project" and select an organization.
3. Choose a strong database password and select a region closest to your primary users (e.g., Middle East or Europe).
4. Wait for the project to finish provisioning.

## 2. Setting Environment Variables
Once the project is ready:
1. Navigate to Project Settings -> API.
2. Copy the `Project URL` and `anon public` key.
3. Duplicate the `.env.example` file locally and rename it to `.env.local` (this file is ignored by Git).
4. Paste the URL and Anon Key into the respective variables.
5. Do **NOT** put your `service_role` secret key anywhere in the frontend code.

## 3. Keeping Secrets out of Git
- The `.env.local` file is automatically ignored by standard Vite `.gitignore` configurations.
- Never commit real keys to Git. Only commit `.env.example`.
- Vercel handles production environment variables securely via its Project Settings dashboard.

## 4. Running SQL Migrations
Until a CI/CD pipeline is built for Supabase, migrations are run manually:
1. Open the Supabase SQL Editor in your dashboard.
2. Copy the contents of `supabase/migrations/001_initial_schema.sql` and run it.
3. Next, run `002_rls_policies.sql`.
4. Finally, run `003_seed_demo_data.sql` to populate the database with mock data.

## 5. LocalStorage Demo Mode vs Supabase Mode
- **Current Limitation:** The frontend is not yet connected to Supabase. This sprint only prepared the database foundation.
- To keep the existing demo mode running, ensure `VITE_DATA_SOURCE=localStorage` (which is also the default fallback).
- Later, to test Supabase, you will change it to `VITE_DATA_SOURCE=supabase` and restart the Vite dev server.

## 6. Vercel Deployment Notes
When we are ready to deploy the backend version:
1. Go to the Vercel dashboard for Aklak.
2. Navigate to Settings -> Environment Variables.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. If you wish to keep the live demo strictly on local storage while testing backend elsewhere, simply do not set `VITE_DATA_SOURCE` in Vercel (or set it to `localStorage`).

## 7. Security Warning
- **Anon Key:** The `anon` key is safe to be exposed in the browser because the database uses Row Level Security (RLS) to enforce rules.
- **Service Role Key:** The `service_role` key bypasses all RLS. It must only be used in secure backend environments (like Supabase Edge Functions or a separate Node server). Never put it in Vite environment variables.

## 8. Sprint 4A: Safe Foundation & Environment Preparation
In Sprint 4A, we introduced the `@supabase/supabase-js` client in a "safe fallback" configuration. The goal is to build the adapter infrastructure without breaking the existing local storage demo mode.

### Safe Fallback
If `VITE_DATA_SOURCE=supabase` but the URL or Key is missing, the application will catch the missing keys and gracefully degrade to localStorage mode without crashing or throwing a white screen.

### Adapter Strategy
We have introduced an `adapterSelector.js` in `src/services/adapters/`. It checks the environment variable and imports either `localStorageAdapter` or the skeleton `supabaseAdapter`. This ensures that all components relying on `DemoContext` can eventually switch backends by updating a single environment variable, without massive codebase rewrites.

### Rollback
To rollback to pure localStorage demo mode at any time, simply delete the `.env.local` file or explicitly set `VITE_DATA_SOURCE=localStorage`.

## 9. Sprint 4B: Supabase Read-Only Pilot Checklist
If you wish to test the read-only Supabase pilot locally, follow these steps exactly:

1. **Create Supabase Project Manually**: Log into Supabase and create a new project.
2. **Run Existing SQL Migrations**: Open the Supabase SQL Editor and run `001_initial_schema.sql`, `002_rls_policies.sql`, and `003_seed_demo_data.sql`.
3. **Confirm Tables Exist**: Ensure tables like `countries`, `cities`, `restaurants`, `restaurant_branches`, `menu_categories`, and `menu_items` exist.
4. **Confirm Demo Seed Data Exists**: Verify the tables have data.
5. **Configure Local Env Variables**: Create a `.env.local` file (this is strictly local and `.gitignore`d). Add:
   ```
   VITE_DATA_SOURCE=supabase
   VITE_SUPABASE_URL=real_url_here
   VITE_SUPABASE_ANON_KEY=real_anon_key_here
   ```
6. **Production Fallback**: Keep Vercel production on `localStorage` until the pilot is approved. **Never** commit the `.env` or `.env.local` files to Git.

## 10. Sprint 4C: Real Supabase Auth Mode
A new environment variable has been introduced to control the authentication flow independently from the data source:
`VITE_AUTH_MODE=demo | supabase | hybrid`

- **Why demo is default:** To ensure the core investor demonstration remains fully functional out-of-the-box without requiring database setup or real credentials.
- **How to enable locally:** Once real Auth is implemented in later phases, you can add `VITE_AUTH_MODE=supabase` to your local `.env.local`.
- **Production Status:** Production explicitly remains on `demo` mode until the real auth flow passes full QA.
- **Rollback Strategy:** If real auth causes issues, simply remove `VITE_AUTH_MODE` or set it to `demo`. You can also fallback to the `sprint-4b-stable` Git tag.

## 11. Sprint 4C-3: Local Supabase Auth Pilot
To test the real Supabase Auth locally without affecting the Demo Auth, configure your `.env.local` as follows:
```
VITE_DATA_SOURCE=localStorage
VITE_AUTH_MODE=hybrid
VITE_SUPABASE_URL=real_local_project_url
VITE_SUPABASE_ANON_KEY=real_local_anon_key
```
This enables the "Real Supabase Login" section on the login page alongside the standard Demo login. 
**Important**: Vercel production remains strictly on `demo` mode. Never commit these keys to Git.
