# Sprint 3A: Production Foundation Implementation Plan

## 1. Proposed Folder Structure
To cleanly separate logic and prepare for a real backend without cluttering components, we will implement the following service-oriented architecture:

```text
src/
 ├── services/
 │    ├── adapters/
 │    │    ├── localStorageAdapter.js       # Current logic extracted here
 │    │    └── supabaseAdapter.placeholder.js # Empty skeleton for future use
 │    ├── orderService.js                   # Business logic for orders
 │    ├── cartService.js                    # Business logic for cart
 │    ├── userService.js                    # Business logic for users/loyalty
 │    ├── restaurantService.js              # Business logic for restaurants
 │    ├── driverService.js                  # Business logic for drivers
 │    └── adminService.js                   # Business logic for admin
 ├── utils/
 │    ├── storageVersioning.js              # State migration and validation logic
 │    ├── currencyFormat.js                 # Centralized EGP/SAR formatter
 │    ├── statusLabels.js                   # Centralized order status maps
 │    └── validationHelpers.js              # Reusable form validators
```

## 2. Adapter Strategy
We will implement the **Adapter Pattern** to decouple the app UI from its data source. 
- The `services/` layer (e.g., `orderService.js`) will expose standardized asynchronous methods (e.g., `placeOrder()`, `updateOrderStatus()`).
- These services will read a configuration flag (e.g., `import.meta.env.VITE_USE_BACKEND`) to decide which adapter to instantiate.
- **Currently**, all services will strictly use `localStorageAdapter.js`. This ensures the live demo continues working exactly as before. 
- Later, when switching to Supabase, we only rewrite the methods inside `supabaseAdapter` without touching a single React component.

## 3. DemoContext Migration Plan
Currently, `DemoContext.jsx` holds all logic (state management + local storage operations). We will refactor it gracefully:
1. **Move Logic:** Extract all `localStorage.getItem` and `setItem` logic into `localStorageAdapter.js`.
2. **Move Business Rules:** Extract logic like calculating totals, assigning random order IDs, and awarding points into their respective services (e.g., `orderService`).
3. **Simplify Context:** `DemoContext` will become a pure UI state manager. It will call `await orderService.placeOrder(cart, customer)` and simply update its React `orders` state. 
4. **Gradual Refactor:** The context will expose the exact same variables and function signatures to avoid breaking existing UI components.

## 4. State Versioning and Safe Migrations
Since we are modifying how data is structured, users returning to the live Vercel URL might experience crashes if their old `localStorage` format conflicts with the new services. 
- **Versioning Strategy:** We will introduce a top-level key: `aklak_demo_state_version` (e.g., `version: 1`).
- **Migration Script:** Inside `utils/storageVersioning.js`, we will run a check on app load:
  ```javascript
  const currentVersion = localStorage.getItem('aklak_demo_state_version');
  if (!currentVersion || currentVersion < 1) {
      // Safe reset or migration logic
      localStorage.clear();
      localStorage.setItem('aklak_demo_state_version', '1');
      // Re-seed initial clean mock data
  }
  ```
This ensures zero crashes for returning visitors by safely migrating or clearing outdated demo states.

## 5. Production-Readiness Improvements
We will introduce centralized utilities to prevent code duplication and bugs:
- **Centralized Status Labels:** Create `statusLabels.js` mapping english status keys (`ready_for_pickup`) to Arabic UI strings (`جاهز للاستلام`) and colors.
- **Centralized Currency Formatting:** A utility function to format numbers based on country code (e.g., `25 ج.م` vs `25 ر.س`).
- **Safer Reset Demo Data:** The reset function will now utilize `storageVersioning.js` to ensure the state is fully wiped and properly re-seeded without refreshing manually.
- **Consistent Error Handling:** Ensure services return standard error objects to UI components.

## 6. What Should Not Change
To guarantee safety and stability during Sprint 3A:
- **NO UI Redesign:** Do not change CSS, Layouts, or React component visual structures.
- **NO Real Backend Integration:** Supabase will not be connected yet.
- **NO Payments or Maps:** No third-party APIs will be integrated.
- **NO Route Changes:** All URLs remain exactly as they are.
- **NO Deployments:** No code is pushed to `main` until this branch is thoroughly QA'd.

## 7. Risk Analysis & Mitigations
| Risk | Mitigation |
|------|------------|
| **Breaking localStorage data** | Implement `storageVersioning.js` to wipe/migrate legacy data safely without crashing the UI. |
| **Breaking checkout/cart flow** | Ensure `cartService.js` perfectly mimics the current Context state logic. Comprehensive local QA required before merge. |
| **Breaking order lifecycle** | `orderService.js` will maintain the exact state machine (`created` -> `delivered`). |
| **Breaking loyalty points** | Keep points calculation inside `userService.awardPoints()` and call it strictly when status changes to `delivered`. |
| **Accidental changes to main** | All work is strictly isolated in `sprint-3a-production-foundation` branch. |
| **Accidental changes to SCQ** | Absolute strict scoping to `C:\Users\youssef\OneDrive\Desktop\aklak`. |

## 8. QA Plan
Before considering Sprint 3A complete, the following must be manually tested and verified locally:
- **Routes:** 
  - `/` (Landing page)
  - `/customer` & `/customer/home` (Customer app + search/filters)
  - `/customer/cart` & `/customer/checkout`
  - `/customer/tracking`
  - `/restaurant-dashboard`
  - `/admin-dashboard`
  - `/driver`
- **Features:** 
  - Cart addition and quantity updates.
  - Favorites toggling and Loyalty points visualization.
  - Reset Demo Data functionality.
- **Full Order Lifecycle:** 
  - Customer order → Restaurant dashboard (`ready_for_pickup`) → Driver app (`picked_up` -> `delivered`) → Customer tracking updated → Loyalty points awarded exactly once.

## 9. Build Verification
Once the code refactoring is complete, we will execute:
```bash
npm run build
```
This ensures that the extraction of services and adapters did not introduce import errors, missing dependencies, or Vite compilation failures.
