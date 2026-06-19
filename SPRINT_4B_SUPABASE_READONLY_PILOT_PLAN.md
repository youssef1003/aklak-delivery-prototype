# Sprint 4B: Supabase Read-Only Pilot Plan

## Scope
Connect the app securely to Supabase to fetch public, read-only data, proving the foundation works without disrupting the primary demo logic. Auth, orders, and payments will remain firmly isolated and managed locally.

## What will be read from Supabase first
We will introduce safe, read-only API calls in the `supabaseAdapter` for the following public data:
- `countries`
- `cities`
- `restaurants`
- `restaurant_branches`
- `menu_categories`
- `menu_items`

## What will remain localStorage
Everything else remains dependent on local storage, including:
- Customer Auth / Profiles
- Admin / Restaurant / Driver Auth
- Cart & Checkout logic
- Live Orders lifecycle
- Driver states
- Payments / Loyalty
- Settings / Favorites

## Required Supabase Tables
To successfully run this pilot locally or on production if configured, the following tables must exist in the Supabase schema and be populated:
- `countries`
- `cities`
- `restaurants`
- `restaurant_branches`
- `menu_categories`
- `menu_items`

## Env Strategy
No `.env` file will be tracked or committed. We rely purely on local developer environments placing `.env.local` using placeholders from `.env.example`. Vercel will not be supplied with Supabase credentials yet.

## Feature Flag Strategy
We will continue to use `VITE_DATA_SOURCE`.
- If `VITE_DATA_SOURCE` is absent or `localStorage`, the `adapterSelector` will ignore `supabaseAdapter` entirely.
- If it is set to `supabase`, the selector attempts to use the Supabase read-only methods.

## Fallback Strategy
Inside `supabaseAdapter`, every async fetch operation will be wrapped in a `try/catch`. 
- If the `supabaseClient` is null or disabled, it will immediately return an empty array `[]` or a graceful fallback value.
- If the network request fails or the table doesn't exist, it catches the error, logs it, and returns a safe fallback without crashing the app.
- Critical app flows (like `DemoContext` initialization) should be designed to handle empty read-only data gracefully.

## QA Plan
1. Validate `npm run build` succeeds without lint/syntax errors.
2. Ensure default mode (`localStorage`) runs the exact same demo experience with zero degradation.
3. Simulate `VITE_DATA_SOURCE=supabase` with an invalid key: Ensure the Admin settings page accurately reflects the disabled state and the app doesn't crash on load.
4. Perform regression testing on the cross-role order lifecycle (Customer -> Restaurant -> Driver) under `localStorage`.

## Rollback Plan
If any read-only logic interferes with the main application flow, the quickest rollback is to remove or revert the `VITE_DATA_SOURCE` flag. If code level rollback is required, we can revert to the `sprint-4a-stable` tag.
