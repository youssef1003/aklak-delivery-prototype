# Aklak Delivery: Live Demo Walkthrough Checklist

Use this checklist to ensure a flawless live presentation.

## Before the Demo
- [ ] Open the browser in Incognito mode to ensure a clean slate.
- [ ] Navigate to the Production URL: `https://aklak-delivery-prototype.vercel.app/showcase`
- [ ] Have the 4 demo accounts memorized or visible on a secondary screen:
  - `customer@aklak.demo` / `123456`
  - `restaurant@aklak.demo` / `123456`
  - `driver@aklak.demo` / `123456`
  - `admin@aklak.demo` / `123456`

## Step 1: Reset Demo Data (Crucial)
- [ ] Go to `/login`.
- [ ] Scroll to the bottom and click **"Reset Demo Data"**.
- [ ] Return to `/showcase`.

## Step 2: The Customer Flow
- [ ] **Action:** Click "Login as Customer".
- [ ] **Say:** "Notice the Arabic-first, mobile-optimized design. We are now the customer."
- [ ] **Action:** Browse a restaurant, add an item (e.g., Burger) to the cart.
- [ ] **Action:** Go to Cart. Apply the promo code `AKLAK10`.
- [ ] **Say:** "Gamification is built-in. Promo codes apply instantly."
- [ ] **Action:** Click Checkout and place the order.
- [ ] **Action:** Show the tracking screen (Waiting for Restaurant).
- [ ] **Action:** Logout.

## Step 3: The Restaurant Flow
- [ ] **Action:** Click "Login as Restaurant".
- [ ] **Say:** "Instantly, the restaurant's kitchen display receives the order."
- [ ] **Action:** Go to Orders. Find the 'New' order.
- [ ] **Action:** Click "Accept" -> "Preparing" -> "Ready for Pickup".
- [ ] **Say:** "The restaurant has full control over the preparation lifecycle."
- [ ] **Action:** Logout.

## Step 4: The Driver Flow
- [ ] **Action:** Click "Login as Driver".
- [ ] **Say:** "Nearby drivers get notified immediately once food is ready."
- [ ] **Action:** Go to Available Orders. Accept the order.
- [ ] **Action:** Mark as "Picked Up" -> "Delivered".
- [ ] **Say:** "The driver completes the delivery, and earnings are added to their wallet."
- [ ] **Action:** Logout.

## Step 5: The Admin Flow
- [ ] **Action:** Click "Login as Admin".
- [ ] **Say:** "As operators, we monitor everything in real-time."
- [ ] **Action:** Show the Dashboard stats (Revenue, Orders).
- [ ] **Action:** Show the Orders tab (The recent order is marked Delivered).
- [ ] **Action:** Logout.

## What NOT to Show Yet
- **Registration Flow:** Do not attempt to create a real account during the demo (Auth mode is restricted to Demo).
- **Profile Password Change:** Backend auth is disabled in the prototype.
- **Real Maps:** Explain that maps are static visual placeholders for now.
