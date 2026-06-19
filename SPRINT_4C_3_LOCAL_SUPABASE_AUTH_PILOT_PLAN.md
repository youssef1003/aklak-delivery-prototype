# Sprint 4C-3: Local Supabase Auth Pilot Plan

## Scope
Implement a real Supabase Auth pilot locally to validate the architecture without affecting the active Demo Auth running in production. This sprint introduces real signup/login logic behind the `VITE_AUTH_MODE=hybrid` flag.

## Local-only Strategy
- Production remains untouched with `VITE_AUTH_MODE=demo`.
- Developers can opt-in to `hybrid` mode locally via an uncommitted `.env.local` file.
- `hybrid` mode reveals a new UI component for Real Auth alongside the existing Demo Auth.

## What remains Demo/localStorage
- Order processing, cart, driver states, and restaurant dashboards remain completely isolated from Supabase Auth right now.
- Users who log in via Demo Auth will bypass all real network checks and operate in the `localStorage` world just as before.

## What Supabase Auth will handle
- `signInWithEmail`: Validating credentials with Supabase.
- `signUpCustomer`: Creating a new Auth User and a matching `customers` profile table entry.
- `getSession`: Checking JWT validity on initial load.
- `signOut`: Revoking the real JWT session securely.

## Feature Flag Behavior
- **`demo`**: Shows only standard demo login UI. Supabase Auth is strictly disabled.
- **`hybrid`**: Shows Demo Login + Real Supabase Login form. Enables real Supabase calls.
- **`supabase`**: Shows Real Supabase Login only (Local isolated test only).

## Required Local Env Values
To test this pilot locally, `.env.local` must contain:
```
VITE_DATA_SOURCE=localStorage
VITE_AUTH_MODE=hybrid
VITE_SUPABASE_URL=YOUR_REAL_URL
VITE_SUPABASE_ANON_KEY=YOUR_REAL_KEY
```

## Profile Loading Strategy
We introduce `profileService.js`:
- Upon successful login, the app fetches `users` -> `customers` based on `auth.uid()`.
- The loaded profile assigns the correct role to the application's global state.
- Fallback: If profile fetch fails or policies block it, return gracefully to avoid crashing.

## RLS Assumptions
- Supabase SQL schema should allow a user to read/update their own profile.
- Customer registration requires an insert policy on `public.users` and `public.customers` matching `auth.uid()`. If this fails locally, the code will log the warning and fallback.

## QA Plan
1. Default Demo mode QA to ensure nothing broke.
2. Hybrid Mode QA to verify the new UI toggle works.
3. Successful Registration flow simulation.
4. Successful Login flow simulation.
5. Error handling for bad credentials or missing tables.

## Rollback Plan
- Ensure production continues using `localStorage`/`demo` natively.
- Revert the `hybrid` mode logic if it interferes with the Demo context.
- Use the `sprint-4c-2-stable` tag as the immediate safe fallback.
