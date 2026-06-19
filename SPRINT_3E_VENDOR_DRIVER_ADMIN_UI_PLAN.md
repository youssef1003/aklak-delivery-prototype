# Sprint 3E: Vendor, Driver, and Admin UI Completion Plan

## 1. Restaurant Dashboard Completion
To elevate the Restaurant dashboard to a production-ready MVP state before backend connection, we will implement the following mocked interfaces:
- **Menu CRUD UI:** A drag-and-drop or simple list interface to add, edit, and hide menu items. Includes image placeholders, price, and category selectors.
- **Item Options & Add-ons:** UI for defining choices (e.g., Size: Small/Large) and optional add-ons (e.g., Extra Cheese).
- **Branch Settings & Opening Hours:** Toggles for "Store Open/Closed" and a weekly schedule grid.
- **Preparation Time Controls:** Ability to set average prep time which would theoretically update the customer ETA.
- **Offers Management:** An interface to generate promo codes (e.g., `AKLAK20`) and set percentage discounts.
- **Cancellation Reason Flow:** A modal for rejecting incoming orders with predefined reasons (e.g., "Out of Stock", "Too Busy").
- **Financials & Payouts:** A dashboard showing total sales, Aklak commission deductions, and net payouts.
- **Staff Management Placeholder:** A visual list of staff members with "Invite Staff" button (mocked action).

## 2. Driver App Completion
The Driver app requires essential operational screens:
- **Online/Offline Availability Toggle:** A prominent, sticky switch to indicate readiness to accept orders.
- **Current Delivery Improvements:** Better step-by-step UI (Accept ➔ Arrived at Restaurant ➔ Picked Up ➔ Arrived at Customer ➔ Delivered).
- **Delivery History:** A list view of completed past deliveries.
- **Earnings Wallet:** A financial breakdown showing daily and weekly earnings, cash collected, and balance owed to the platform.
- **Profile & Vehicle Details:** A mocked form showing ID verification status, vehicle type, and license plate.
- **Navigation Placeholder:** A map interface mockup simulating route instructions.

## 3. Admin Control Center Completion
The Admin dashboard needs comprehensive management tools to oversee the platform:
- **Restaurants Management:** View all restaurants, approve pending registrations, and toggle active status.
- **Drivers Management:** View active/offline drivers, approve vehicle documents, and suspend accounts.
- **Customers Management:** List of registered users with options to view their order history or ban them.
- **Orders Global Monitoring:** A master view of all platform orders (Live / Completed / Cancelled).
- **Support Tickets Workflow:** A Kanban or list view of customer/driver complaints (e.g., "Missing Item").
- **Countries/Cities & Zones:** UI to add new operational zones and manage delivery fee rules (base fee + per km).
- **Commission Settings:** Global platform settings for default restaurant commission %.
- **Financial Reports:** System-wide gross merchandise value (GMV) and profit calculations.

## 4. Demo Data / State Requirements
To support these new UIs without a real backend, we will expand `appState` in `storageVersioning.js` safely:
- `restaurantMenu`: An array of mock menu items linked to the logged-in restaurant.
- `restaurantSettings`: Opening hours and active status.
- `driverProfile`: Online status and mock earnings history.
- `adminData`: Mock arrays for `restaurantsQueue`, `supportTickets`, `systemSettings`.
*(All state will strictly remain in `localStorage` under `aklak_demo_state`.)*

## 5. Route Plan
The following protected routes will be added to `App.jsx`, preserving all existing paths:
- **Restaurant:** `/restaurant-dashboard/menu`, `/restaurant-dashboard/offers`, `/restaurant-dashboard/settings`, `/restaurant-dashboard/staff`, `/restaurant-dashboard/reports`
- **Driver:** `/driver/earnings`, `/driver/history`, `/driver/profile`
- **Admin:** `/admin-dashboard/restaurants`, `/admin-dashboard/drivers`, `/admin-dashboard/customers`, `/admin-dashboard/orders`, `/admin-dashboard/support`, `/admin-dashboard/settings`, `/admin-dashboard/reports`

## 6. UX Rules
- **Realistic Data:** Use accurate mock data (real Arabic names, logical prices).
- **Clear Empty States:** E.g., "لا توجد طلبات سابقة" (No past orders) with an engaging illustration.
- **Status Badges:** Color-coded pills for statuses (Green for Active/Delivered, Yellow for Pending, Red for Cancelled).
- **Smooth Navigation:** Seamless transitions between dashboard tabs.
- **Demo Mode Warnings:** Tooltips indicating that actions (like saving settings) are saved locally.

## 7. Risk Mitigation
To avoid breaking the current stable flow:
- **Protected Routes:** All new routes will be wrapped in the existing `ProtectedRoute` component.
- **Existing Logic Intact:** The Customer `Checkout` and the `cartService` will not be touched. The order lifecycle remains exactly as is.
- **Non-Destructive State:** New state arrays will be added via `migrateStateIfNeeded` using `|| []` fallbacks, ensuring old sessions don't crash.
- **Isolated Component Testing:** New components will be built in separate files and imported cleanly.

## 8. QA Plan
Before finalizing the Sprint, we will execute the following manual tests:
1. **Restaurant:** Login, add a mock menu item, save settings, check reports.
2. **Driver:** Login, toggle online/offline, view mocked earnings.
3. **Admin:** Login, view the restaurants and drivers lists.
4. **Integration Check:** Verify that adding a menu item in the dashboard appears in the Customer App (if feasible with current mock structure).
5. **Stability Check:** Run a full Customer ➔ Restaurant ➔ Driver order lifecycle to ensure no regressions.
6. **Recovery Check:** Hit "Reset Demo Data" and ensure the app clears state and resets to defaults securely.
7. **Build Check:** Ensure `npm run build` passes with zero errors.
