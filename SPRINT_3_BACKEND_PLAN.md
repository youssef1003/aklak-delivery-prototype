# Sprint 3: Backend & Architecture Transition Plan

## 1. Backend Strategy
To transition Aklak Delivery from a frontend-only prototype to a scalable product, we evaluated several backend architectures:
- **Supabase Backend:** Offers a managed PostgreSQL database, built-in Authentication, Real-time subscriptions, and Edge Functions.
- **Custom Node.js / NestJS Backend:** High control and flexibility but requires significant boilerplate, DevOps, and time to build auth and real-time features.
- **FastAPI Backend:** Great for Python developers and AI integrations, but similar overhead to Node.js for standard CRUD and auth.
- **Hybrid Approach:** Supabase for Auth/DB/Real-time, with a custom Node.js microservice for complex tasks (like payment webhooks and driver matching).

**Recommendation for MVP:** **Supabase Backend**. 
It is the safest and fastest option. It provides immediate out-of-the-box functionality for Authentication, Database, and Real-time order tracking, drastically reducing development time while remaining highly scalable (Postgres under the hood). We can always add custom edge functions or microservices later for complex logic.

---

## 2. Database Design
Proposed PostgreSQL Schema (Conceptual):

- **users:** `id`, `email`, `phone`, `auth_id`, `role`, `created_at`
- **customers:** `id`, `user_id`, `name`, `default_address_id`, `loyalty_points_balance`
- **restaurants:** `id`, `name`, `owner_id`, `logo_url`, `cover_url`, `description`, `commission_rate`, `status`, `country_code`
- **restaurant_branches:** `id`, `restaurant_id`, `city_id`, `address`, `lat`, `lng`, `is_active`
- **drivers:** `id`, `user_id`, `vehicle_type`, `plate_number`, `current_lat`, `current_lng`, `status`, `zone_id`
- **menu_categories:** `id`, `restaurant_id`, `name_ar`, `name_en`, `sort_order`
- **menu_items:** `id`, `category_id`, `restaurant_id`, `name_ar`, `name_en`, `description`, `price`, `image_url`, `is_available`
- **item_options:** `id`, `item_id`, `name`, `is_required`, `max_choices`
- **item_addons:** `id`, `option_id`, `name`, `price`
- **carts:** `id`, `customer_id`, `restaurant_id`, `status`
- **orders:** `id`, `customer_id`, `restaurant_id`, `branch_id`, `driver_id`, `total_amount`, `subtotal`, `delivery_fee`, `discount`, `status`, `payment_method`, `payment_status`, `delivery_address`, `created_at`
- **order_items:** `id`, `order_id`, `item_id`, `quantity`, `unit_price`, `special_instructions`
- **order_status_history:** `id`, `order_id`, `status`, `changed_by_user_id`, `changed_at`
- **payments:** `id`, `order_id`, `transaction_id`, `gateway`, `amount`, `status`
- **delivery_zones:** `id`, `city_id`, `name`, `polygon_coords`, `base_fee`
- **coupons:** `id`, `code`, `discount_type`, `discount_value`, `max_uses`, `valid_until`, `restaurant_id` (optional)
- **loyalty_points:** `id`, `customer_id`, `order_id`, `points_earned`, `points_redeemed`, `created_at`
- **favorites:** `id`, `customer_id`, `entity_type` (restaurant/meal), `entity_id`
- **reviews:** `id`, `order_id`, `customer_id`, `restaurant_id`, `driver_id`, `rating`, `comment`
- **support_tickets:** `id`, `user_id`, `order_id`, `subject`, `message`, `status`
- **admin_users:** `id`, `user_id`, `permissions_level`
- **countries:** `id`, `code` (EG, SA), `name`, `currency_code`
- **cities:** `id`, `country_id`, `name_ar`, `name_en`
- **notifications:** `id`, `user_id`, `title`, `body`, `type`, `is_read`, `created_at`

---

## 3. Roles & Permissions
A robust Row Level Security (RLS) system will govern data access:
- **customer:** Can read active restaurants/menus. Can read/write their own profile, addresses, favorites, and orders.
- **restaurant_owner:** Can read/write their own restaurant details, branches, menus, and view orders directed to their restaurant.
- **restaurant_staff:** Similar to owner but restricted from changing financial settings (commission, bank details).
- **driver:** Can read available orders in their zone. Can update status of assigned orders. Can read/write their own profile/location.
- **admin:** Has broad read access for analytics. Can manage support tickets, approve restaurants, and view user data.
- **super_admin:** Full access to all tables, including commission rates, system settings, and admin user management.

---

## 4. Authentication Plan
- **Customer:** Phone number + OTP (primary), Email/Password fallback.
- **Restaurant/Admin:** Email/Password via Supabase Auth with secure session cookies.
- **Driver:** Phone number + OTP or specific driver credentials provided by admin.
- **Protected Routes:** React Router will use a Higher-Order Component (`ProtectedRoute`) to check session validity and role before rendering dashboard/driver pages.
- **Session Handling:** Supabase SDK handles token refresh automatically.

---

## 5. Orders System Plan
The core lifecycle state machine for an Order:
1. `created`: Customer places order. Payment pending or Cash.
2. `accepted`: Restaurant confirms they can fulfill it.
3. `preparing`: Kitchen starts making the food.
4. `ready_for_pickup`: Food is ready. Broadcasted to nearby drivers.
5. `assigned_to_driver`: Driver accepts the delivery request.
6. `picked_up`: Driver confirms receiving food from restaurant.
7. `on_the_way`: Driver navigates to customer.
8. `delivered`: Customer receives food. Points awarded.
- **Alternative States:** `cancelled` (by user before prep, or by restaurant/admin), `refunded`.

*Interactions:*
- **Customer:** Views status updates.
- **Restaurant:** Moves status from `created` -> `accepted` -> `preparing` -> `ready_for_pickup`.
- **Driver:** Moves status from `ready_for_pickup` -> `assigned_to_driver` -> `picked_up` -> `delivered`.
- **Admin:** Can view full timeline or force-change status to `cancelled` if issues arise.

---

## 6. Real-time Strategy
**Recommendation for MVP:** **Supabase Realtime (Postgres CDC)**.
Since we recommend Supabase, we can listen to Postgres database changes via WebSockets out-of-the-box. 
- *How it works:* The Customer App subscribes to the `orders` table where `id = current_order`. When the restaurant updates the status, Supabase pushes the change instantly to the customer's UI. 
- *Fallback:* Polling every 10 seconds if WebSockets fail or disconnect.

---

## 7. Payments Plan (Conceptual)
**Egypt:**
- **Cash on Delivery (COD):** Default option.
- **Card/Wallet:** Integrate **Paymob** or **Fawry** API. Handles local Visa/Mastercard and Meeza/Vodafone Cash wallets.

**Saudi Arabia:**
- **Cash on Delivery (COD):** Default option.
- **Mada/Apple Pay/Card:** Integrate **Moyasar** or **Tap Payments**. Natively supports Mada and Apple Pay which are dominant in KSA.

*Integration Note:* Payments will require a secure backend webhook to update order status to `payment_confirmed` before the restaurant begins preparing.

---

## 8. Maps & Delivery Plan (Conceptual)
- **Address Selection:** Integrate Google Maps Places API for autocomplete and reverse geocoding to save accurate lat/lng for customers.
- **Delivery Zones:** Draw polygons in the database (PostGIS) to determine if a customer is within a restaurant's delivery range.
- **Distance & Fees:** Calculate straight-line distance (Haversine formula) or routing distance to calculate dynamic delivery fees.
- **Driver Tracking:** Driver app frequently updates `current_lat`/`current_lng` in DB. Customer app subscribes to these changes to animate a car marker on a map.

---

## 9. Migration Strategy (Adapter Pattern)
To introduce backend capabilities without breaking the current Vercel demo, we will use the **Adapter Pattern**:
1. **Keep current demo mode working:** Do not delete `DemoContext.jsx` immediately.
2. **Add a data adapter layer:** Create interfaces like `IOrderService`, `IAuthService`.
3. **Create LocalStorage Adapter:** Refactor the current context logic into an injected service (`LocalStorageOrderService`).
4. **Create Backend Adapter:** Build `SupabaseOrderService` alongside it.
5. **Unified Switch:** Use a configuration variable (e.g., `VITE_USE_BACKEND=false`) to determine which adapter to inject into the React Context. The live demo continues to use `LocalStorage`, while local development can switch to `Supabase`.

---

## 10. Technical Risk Analysis
| Risk | Mitigation |
|------|------------|
| **Breaking existing demo** | Use the Adapter Pattern (Dependency Injection). Ensure the default config always falls back to localStorage. |
| **Auth complexity** | Start with Email/Password for MVP to simplify flow, add Phone OTP later via Twilio/MessageBird. |
| **Real-time sync issues** | Implement optimistic UI updates (update UI first, revert if API fails) and use a polling fallback. |
| **Multi-country pricing** | Store all prices as integers (cents/halalas) and use a robust formatter based on the `country_code` flag on the restaurant. |
| **Driver assignment logic** | MVP: Broadcast to all drivers in the zone, first to accept gets it. V2: Algorithmic assignment based on distance. |

---

## 11. Sprint 3 Implementation Options

**Option A: Planning & documentation only**
- No code changes. We just finalize this document and database schemas.

**Option B: Safe code foundation (Recommended)**
- Create the `src/services/` folder structure.
- Refactor `DemoContext` to use explicit Adapter classes (`StorageAuthService`, `StorageOrderService`).
- Keeps localStorage as the default provider.
- **Why?** It modernizes the React architecture and prepares the codebase perfectly for Sprint 4 (actual Supabase connection) without breaking the live Vercel UI.

---

## 12. Proposed Files (For Option B)
If approved, we will create/modify:
- `src/services/interfaces/AuthInterface.js`
- `src/services/interfaces/OrderInterface.js`
- `src/services/adapters/LocalStorageAdapter.js`
- `src/services/adapters/SupabaseAdapter.js` (empty skeleton)
- `src/context/AppContext.jsx` (to replace/wrap DemoContext)
- `src/config/env.js` (to toggle backend mode)

---

## 13. QA Plan for Sprint 3
Any code changes in Sprint 3 MUST pass these checks before merging:
1. Current routes (`/`, `/customer/home`, `/restaurant-dashboard`, etc.) render correctly.
2. Sprint 1 order lifecycle works end-to-end via the local storage adapter.
3. Sprint 2 features (Favorites, Loyalty) remain functional.
4. "Reset demo data" clears the adapter state completely.
5. The build command `npm run build` passes successfully.
6. Vercel deployment preview shows zero regressions.
