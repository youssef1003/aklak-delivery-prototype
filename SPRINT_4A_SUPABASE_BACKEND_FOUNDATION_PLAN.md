# Sprint 4A: Supabase Backend Foundation Plan

## Goal
Add a safe Supabase backend foundation without breaking the existing `localStorage` demo mode.

## What will be added
1. `@supabase/supabase-js` client library.
2. Safe `.env.example` file exposing `VITE_DATA_SOURCE`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY`.
3. `supabaseClient.js` logic to safely initialize the Supabase client without crashing if env values are missing.
4. Data Source Configuration to read `VITE_DATA_SOURCE` with `localStorage` as default.
5. Adapter Selector skeleton to select between `localStorageAdapter` and a future `supabaseAdapter`.
6. A backend status/health utility or screen (Admin Settings) to easily verify initialization status.
7. Updated documentation (`BACKEND_SETUP.md`) explaining the strategy.

## What will not be changed
* Production data source will not be switched.
* Real authentication is not added.
* Demo authentication is not broken.
* `DemoContext` will not be completely rewritten (it will still use `localStorage` as default).
* Protected routes will remain as they are.
* All existing customer, restaurant, driver, and admin UI and logic will continue working from local storage.

## Safety Strategy
The default configuration assumes no Supabase environment variables exist. If `VITE_DATA_SOURCE` is either absent or set to `localStorage`, the system relies entirely on local storage. If set to `supabase` but the URL/key is missing, the `supabaseClient` will gracefully degrade to `null` or log a warning without throwing white screen errors.

## Feature Flag Strategy
The feature flag is `VITE_DATA_SOURCE=localStorage|supabase`. By default, it's `localStorage`. This will be integrated into the adapter selector so that `DemoContext` transparently requests data from the active adapter.

## Env Strategy
Only `.env.example` will be managed. We will not create `.env` with real credentials.

## Adapter Strategy
We'll create an `adapterSelector.js` which exports the currently active adapter. In Sprint 4A, it will export `localStorageAdapter` unless `supabase` is perfectly configured. This keeps changes minimal and backwards compatible.

## QA Plan
1. Ensure the app builds (`npm run build`).
2. Test default `localStorage` mode: the app should be 100% functional.
3. Test missing Supabase envs: no crashes.
4. Verify routing, demo accounts, and dashboard features still behave identically to Sprint 3E.

## Rollback Plan
If something breaks unexpectedly, we can immediately reset `VITE_DATA_SOURCE` to `localStorage` and ensure `supabaseClient` import is isolated. Alternatively, revert to `sprint-3e-stable`.
