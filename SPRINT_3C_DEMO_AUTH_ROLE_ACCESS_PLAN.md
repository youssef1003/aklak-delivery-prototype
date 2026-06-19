# Sprint 3C: Demo Authentication & Role-Based Access Plan

## 1. Git Safety & Workflow
**Recommended Workflow:**
1. **Merge 3B-1 first:** We should merge the `sprint-3b-1-supabase-schema` branch into `main`. Since it only contains `.md` and `.sql` documentation without touching app code, it is 100% safe and ensures `main` has the complete backend roadmap.
2. **Branch from main:** After the merge, create a new branch `sprint-3c-demo-auth` from the updated stable `main`. This guarantees we are building our frontend auth logic on top of a perfectly clean and updated repository.

## 2. Demo Users
We will hardcode predefined demo users in the `localStorageAdapter` defaults to represent the four primary personas of the platform.
- **Admin:** `admin@aklak.demo`
- **Customer:** `customer@aklak.demo`
- **Driver:** `driver@aklak.demo`
- **Restaurant:** `restaurant@aklak.demo`
- **Password (Global Demo):** `123456`

*(Important: These are strictly mock credentials existing only in client-side memory. No real authentication is taking place, and no secrets will be stored).*

## 3. Demo Auth State (localStorage)
The local state schema will be expanded to support session persistence:
```json
{
  "auth": {
    "isAuthenticated": true,
    "currentUser": {
      "id": "mock-uuid-123",
      "email": "customer@aklak.demo",
      "name": "أحمد محمد"
    },
    "currentRole": "customer",
    "demoSession": true
  }
}
```
Login and Logout functions will be added to an `authService` that updates this state and notifies the UI listeners.

## 4. Role-Based Routing
Routing will be strictly isolated to prevent roles from viewing inappropriate dashboards:
- **Customer:** `/customer/*` (or `/` default)
- **Driver:** `/driver/*`
- **Restaurant:** `/restaurant-dashboard/*`
- **Admin:** `/admin-dashboard/*`
- **Unknown/Logged Out:** Redirected to a `/login` or role selection portal.

*Note: If an investor hits `/` directly, the system will elegantly prompt the Demo Login portal so they can easily choose their journey.*

## 5. Login / Role Selection UX
We will build a clean, premium "Login Portal" acting as the entry point:
- **Clear "Demo Mode" Warning:** A banner indicating that data is stored locally and passwords are mock.
- **Manual Form:** Email and password inputs for a traditional feel.
- **One-Click Magic Buttons:** "Login as Admin", "Login as Customer", etc., ensuring zero friction for testing and investor pitches.

## 6. Protected Layouts
We will introduce a `ProtectedRoute` component:
```jsx
<Route path="/admin-dashboard" element={
  <ProtectedRoute allowedRole="admin">
    <AdminDashboard />
  </ProtectedRoute>
} />
```
If an unauthenticated user or a driver tries to access `/admin-dashboard`, they will be securely bounced back to the Login Portal.

## 7. User Profiles
Basic profile mock data will be initialized per role:
- **Customer:** Name, phone, default address, loyalty points.
- **Driver:** Name, phone, vehicle type (e.g., Motorcycle), availability status, total earnings.
- **Restaurant:** Owner name, restaurant name (e.g., Al Baik), branch details, staff role.
- **Admin:** Name, super-admin permissions flag.

## 8. Production Gap Audit (Post-Login Review)
After simulating logins, we will review the UI to identify missing screens:
- **Customer:** Onboarding flow, exact location pinning, cart UX, checkout, live tracking, order history, favorites list, loyalty dashboard.
- **Driver:** Go Online/Offline toggle, available orders map/list, active delivery steps, earnings summary, driver profile.
- **Restaurant:** Live incoming orders, menu management (disable/enable items), branch status (open/closed), promotional offers, basic daily reports, staff roles.
- **Admin:** Restaurant approval queues, customer/driver suspensions, system-wide order monitoring, support ticket handling, country/city configurations, commission tracking.

## 9. What should NOT be changed
This sprint adheres strictly to safety constraints:
- **No real backend:** Operations remain in localStorage.
- **No Supabase Auth:** The real Supabase Auth SDK is NOT used.
- **No payments or maps:** Integrations remain mocked/visual.
- **No production secrets:** Code remains completely safe.
- **No breaking route changes:** The existing URLs will be preserved, just gated.
- **No merge/deploy without approval.**

## 10. QA Plan
Tests to execute before declaring Sprint 3C complete:
1. Login cleanly as each of the 4 roles.
2. Logout and confirm session is destroyed.
3. Attempt to access a restricted URL (e.g., driver trying to access admin dashboard) and verify rejection.
4. Refresh the page on a protected route and ensure the `localStorage` session persists.
5. Click "Reset Demo Data" and ensure it completely signs the user out and clears the state.
6. Run through a full order lifecycle (Customer -> Restaurant -> Driver) by logging in and out of different demo roles.
7. Confirm `npm run build` passes with zero errors.
