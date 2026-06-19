# Sprint 4C: Real Supabase Auth Planning

## 1. Current Auth State
The current authentication is fully simulated (Demo Auth):
- **Demo accounts:** Predefined credentials (`admin@aklak.demo`, `customer@aklak.demo`, `driver@aklak.demo`, `restaurant@aklak.demo`) bypass real backend checks.
- **localStorage session:** Auth state is preserved in browser `localStorage` under keys `demoSession` or similar via `DemoContext`.
- **currentUser & currentRole:** Handled strictly on the client side, parsed from local state.
- **Protected routes:** `ProtectedRoute.jsx` checks the `DemoContext` role against allowed roles to grant or deny access.
- **Role-based access:** UIs and navigation links render conditionally based on `currentRole`.
- **Logout/Reset behavior:** Clears the local state, resets the demo session, and pushes the user to the login or home page.

## 2. Target Real Auth Architecture
Supabase Auth will act as the source of truth for identity, paired with custom tables for role data:
- **Supabase Auth:** Handles standard email/password authentication (JWT issuance, sessions).
- **App users table (`users`):** Stores generic profile data linked to `auth.users.id`.
- **Role mapping:** Specific tables (`customers`, `restaurants`, `drivers`, `admin`) will link via Foreign Keys to `users.id` or `auth.users.id` to establish role-based access.
- **Loading profiles:** On successful `supabase.auth.getSession()`, the app fetches the respective role table to populate the UI.
- **Protected routes:** Will check both the Supabase session presence and the loaded role to determine access.

## 3. Demo Auth Preservation Strategy
Demo Auth must remain completely untouched and available:
- **Default mode:** Production and local environments will continue to default to `localStorage`.
- **Feature Flagging:** Real auth will strictly require a feature flag (e.g., `VITE_AUTH_MODE=supabase`).
- **Existing Accounts:** The predefined `.demo` accounts remain hardcoded for instant login when in demo mode.
- **Investor accessibility:** Demo mode ensures instant access without requiring email verification or typing passwords.
- **Fallback:** If Supabase Auth fails (missing env, network issue), the system falls back to `localStorage` safely without crashing.

## 4. Feature Flag Strategy
We will use environment variables to control the Auth and Data flow:
- `VITE_DATA_SOURCE=localStorage | supabase`
- `VITE_AUTH_MODE=demo | supabase | hybrid`

**Behavior:**
- `demo`: The app behaves exactly as it does today. No real network calls for auth.
- `supabase`: Forces real Supabase Auth. Hides the "One-Click Demo Login" buttons.
- `hybrid`: Displays both real login forms and demo buttons, ideal for gradual testing.
- **Default:** If undefined, both default to `localStorage` and `demo`.

## 5. Registration Strategy
Registration flows will differ strictly by role:
- **Customer:** Self-register. Creates `auth.users` -> inserts into `public.users` -> inserts into `public.customers`. Status: Active instantly.
- **Restaurant:** Admin-approved only. User submits an application. Creates a `restaurant_applications` record. Admin approves -> Creates Auth user + `public.restaurants`. Status: Pending approval initially.
- **Driver:** Admin-approved only. User submits application + documents. Creates `driver_applications`. Admin approves -> Creates Auth user + `public.drivers`. Status: Pending verification.
- **Admin:** Manual creation only via Supabase Dashboard or secured internal Admin panel. No public registration path.

## 6. Database Tables Needed
To support real Auth, the schema must include:
- `users`: Core profile (id, auth_id, full_name, phone, role).
- `customers`: Customer details (id, user_id, preferences).
- `restaurants`: Restaurant profiles (id, owner_id, name, status).
- `restaurant_staff`: Link table mapping staff users to a restaurant.
- `drivers`: Driver profiles (id, user_id, vehicle_info, status).
- `driver_documents`: Placeholder for verification docs.
- `restaurant_applications`: Placeholder for onboarding requests.
- `driver_applications`: Placeholder for onboarding requests.
- `role_permissions`: Placeholder for granular RBAC if needed.

## 7. RLS / Security Planning
Strict Row Level Security (RLS) rules are mandatory:
- **Customer:** `SELECT/UPDATE` on `public.customers` where `user_id = auth.uid()`.
- **Restaurant:** `SELECT/UPDATE` on `public.restaurants` where `owner_id = auth.uid()` or via `restaurant_staff`.
- **Driver:** `SELECT/UPDATE` on `public.drivers` where `user_id = auth.uid()`.
- **Admin:** `ALL` on all tables where user role = 'admin'.
- **Public:** `SELECT` only on `restaurants`, `menu_items`, `cities`.
- No anonymous `INSERT/UPDATE/DELETE`.
- No `service_role` keys in the frontend bundle.

## 8. Auth Service Design
We will build modular services to abstract Auth logic:
- `supabaseAuthService.js`: Wraps Supabase auth calls (login, register, session management).
- `authModeSelector.js`: Decides whether to use `supabaseAuthService` or `localStorageAdapter` based on `VITE_AUTH_MODE`.
- `DemoContext` integration: We will incrementally update `DemoContext` (or create an `AuthContext`) to rely on `authModeSelector.js`.
- `profileService.js`: Fetches user profile after auth.
- `roleService.js`: Handles role-specific fetching.

## 9. Route Protection Design
The `ProtectedRoute.jsx` component will be updated to handle:
- **Dual Support:** Checks `VITE_AUTH_MODE` to validate via Demo session OR Supabase session.
- **Loading State:** Renders a spinner while validating the JWT.
- **Unauthorized State:** Redirects unauthenticated users cleanly to `/login`.
- **Role Mismatch:** Redirects authenticated users with the wrong role to their appropriate dashboard or `/unauthorized`.
- **Session Refresh:** Handles token expiration by refreshing the session silently via Supabase.

## 10. Migration Strategy
A safe phased rollout plan:
- **Phase 4C-1:** Planning only (This sprint).
- **Phase 4C-2:** Add auth mode selector and service skeleton only.
- **Phase 4C-3:** Enable local Supabase Auth login/register on branch only.
- **Phase 4C-4:** Customer real registration pilot only.
- **Phase 4C-5:** Restaurant/driver approval flow.
- **Phase 4C-6:** Production opt-in after full QA.

## 11. QA Strategy
Testing will be extensive:
- Validate Demo auth works 100% untouched.
- Test local Supabase Auth with test credentials.
- Test missing env keys gracefully fall back.
- Simulate token expiration and refresh.
- Test Logout clears session cleanly.
- Test Role mismatch redirection.
- E2E test Customer self-registration.
- E2E test Admin approval flow for Drivers/Restaurants.
- Ensure `Reset Demo Data` doesn't affect real Supabase users.
- Confirm production remains unaffected until opt-in.

## 12. Rollback Strategy
If any Phase introduces instability:
- Fall back to the `sprint-4b-stable` tag immediately.
- Ensure `VITE_AUTH_MODE=demo` is forced.
- Remove any Supabase Auth env vars from Vercel.
- Revert the branch before merging into main.
- Never forcefully deprecate Demo Auth until Real Auth is battle-tested.

## 13. What Must Not Be Done Yet
- Do not write auth code during this planning phase.
- Do not connect orders, payments, or maps to Supabase yet.
- Do not force real login in production.
- Do not remove demo accounts.
- Do not commit secrets (`.env`).
- Do not use `service_role` keys.
- Do not modify Vercel environment variables yet.
