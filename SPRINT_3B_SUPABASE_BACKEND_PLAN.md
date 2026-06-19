# Sprint 3B: Supabase Backend Integration Plan

> **Note:** Sprint 3B-1 only creates the initial schema, policies, and documentation. The frontend is **not yet connected**, and the app continues to run safely on the localStorage adapter.

## 1. Supabase Project Setup
To prepare for the backend transition without breaking the current localStorage setup, we will configure Supabase carefully.
**Manual Setup Required:**
- Create a new project in the Supabase Dashboard.
- Enable Email Authentication.
- Obtain the `Project URL` and `Anon Public Key`.

**Environment Variables:**
We will use Vite's standard environment handling:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_DATA_SOURCE` (Values: `localStorage` | `supabase`)

**Security:**
- These keys are safe for public clients (Anon Key enforces RLS). However, they will be stored in `.env.local` which is added to `.gitignore`. An `.env.example` will be pushed instead.
- The `VITE_DATA_SOURCE` defaults to `localStorage` if not set, ensuring Vercel and new clones automatically use the existing demo mode without crashing.

---

## 2. Database Migration Plan
The MVP SQL schema (`supabase/migrations/`) will include these core tables:
- **countries & cities:** Lookups for regions (EG, SA).
- **users & auth.users:** Supabase handles `auth.users`, we create a public `users` profile table tied to it.
- **customers:** Extended profile for end-users.
- **restaurants & restaurant_branches:** Owner details, commission rates, and branch locations.
- **drivers:** Driver status, zone, and vehicle info.
- **menu_categories, menu_items, item_addons:** The catalog structure.
- **orders & order_items:** Core transaction data.
- **order_status_history:** Audit log for status changes.
- **loyalty_points & favorites:** Customer engagement tracking.
- **payments & coupons:** Financial records and discounts.
- **reviews, support_tickets, notifications:** Feedback and communication.

---

## 3. Row Level Security (RLS) Plan
Supabase relies heavily on RLS for data protection:
- **customer:** Can `SELECT` active restaurants and menus. Can `SELECT/INSERT/UPDATE` orders where `customer_id = auth.uid()`.
- **restaurant owner/staff:** Can `SELECT/UPDATE` their own restaurant and menus. Can `SELECT/UPDATE` orders where `restaurant_id` matches their ownership.
- **driver:** Can `SELECT` orders where `status = 'ready_for_pickup'` or `driver_id = auth.uid()`. Can `UPDATE` status for assigned orders.
- **admin:** Broad read access across tables. Can `UPDATE` support tickets and verify restaurants.
- **super admin:** Bypasses all RLS rules (enforced via a custom DB role or a `is_super_admin` flag check in policies).

---

## 4. Auth Plan
**Implementation Strategy:**
- **Customer Auth:** Email/Password via Supabase. Customers can register, login, and persist sessions securely.
- **Restaurant/Admin/Driver Auth:** Pre-provisioned accounts by Super Admin, or standard Email login with role-based redirection.
- **Protected Routes:** A new `ProtectedRoute` component will wrap dashboards, validating the `auth.session` and user role before rendering.
- **Demo Mode Fallback:** If `VITE_DATA_SOURCE === 'localStorage'`, the auth checks will simply read the mock `user` object from local storage, bypassing Supabase completely.

---

## 5. Adapter Switch Plan
We will implement the adapter routing mapped out in Sprint 3A:
- **Configuration:** `src/config/appConfig.js` will export a `dataSource` constant evaluating `import.meta.env.VITE_DATA_SOURCE || 'localStorage'`.
- **Service Layer Switch:** Inside `orderService.js` (and others):
  ```javascript
  import { storageAdapter } from './adapters/localStorageAdapter';
  import { supabaseAdapter } from './adapters/supabaseAdapter';
  import { APP_CONFIG } from '../config/appConfig';

  const adapter = APP_CONFIG.DATA_SOURCE === 'supabase' ? supabaseAdapter : storageAdapter;
  ```
- This ensures 100% decoupling. UI components will just call `orderService.placeOrder()` unaware of the underlying engine.

---

## 6. MVP Backend Scope
To ensure a fast, stable Sprint 3B, we limit the backend scope strictly to core operations.
**Included in Sprint 3B:**
- Auth (Sign up / Sign in / Logout)
- Restaurants & Menus (Fetching from DB)
- Orders (Placing an order, updating status)
- Basic Admin View (Reading live orders from DB)

**Postponed (Not in Sprint 3B MVP):**
- Real payments (Still mocked)
- Real maps (Static UI)
- Push notifications
- Advanced analytics

---

## 7. Migration Safety (No Breaking Changes)
- **Cart/Checkout:** The `cartService` will function identically. The local storage adapter continues to manage local carts even in Supabase mode (until checkout).
- **Order Lifecycle:** The exact same state strings (`new`, `accepted`, etc.) will be mapped to the DB.
- **Reset Demo Data:** Will check the config. If in Supabase mode, it might do nothing or clear the local session. If in localStorage mode, it works as it currently does.
- **Existing Production Demo:** Because `VITE_DATA_SOURCE` defaults to `localStorage` on Vercel, the live investors' demo will remain **entirely unaffected**.

---

## 8. Required Files Later (Do Not Create Yet)
- `supabase/migrations/01_initial_schema.sql`
- `supabase/seed.sql`
- `src/lib/supabaseClient.js`
- `src/services/adapters/supabaseAdapter.js`
- `.env.example`
- `.env.local` (Ignored)
- `BACKEND_SETUP.md`

---

## 9. QA Plan
Before considering Sprint 3B complete, the following checks must pass:
- **localStorage Mode:** Running `npm run dev` without an `.env` file should boot the app exactly as it is today.
- **Backend Mode Disabled:** The Vercel build remains stable.
- **Build Pass:** `npm run build` succeeds regardless of env variables.
- **Security:** No API keys committed to the repository.
- **Routing:** All routes work flawlessly under both data sources.
