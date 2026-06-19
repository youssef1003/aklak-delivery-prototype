# Showcase Demo Guide

## Production URL
https://aklak-delivery-prototype.vercel.app/showcase

## Demo Accounts
- **Customer:** customer@aklak.demo / 123456
- **Restaurant:** restaurant@aklak.demo / 123456
- **Driver:** driver@aklak.demo / 123456
- **Admin:** admin@aklak.demo / 123456

## Recommended Demo Order
To demonstrate the full capability of the Aklak multi-role platform, follow this exact sequence:

1. **Start at `/showcase`:** Briefly explain the vision (multi-role platform for Egypt & KSA).
2. **Login as Customer:** 
   - Add items to the cart.
   - Apply the promo code `AKLAK10`.
   - Complete checkout.
   - Show the tracking page waiting for the restaurant.
3. **Login as Restaurant:** 
   - Go to the Dashboard -> Orders.
   - Accept the new order.
   - Move the order to "Ready for Pickup".
4. **Login as Driver:** 
   - Go to Available Orders.
   - Accept the order.
   - Mark as "Delivered".
5. **Login as Customer (Optional Return):**
   - Show that the order is now Delivered.
   - Show loyalty points awarded.
6. **Login as Admin:**
   - Go to Dashboard.
   - Show the live monitoring map/stats.
   - Show the financial reports.

## What to Show First
- The **Showcase page** gives the best 30,000-foot view.
- The **Customer App** is the most polished visual experience. Show the responsive design.

## What to Avoid Showing
- Avoid trying to register new real accounts (Demo Mode is active).
- Do not spend too much time in settings pages that aren't hooked up to a real backend yet (e.g., changing passwords).

## Known Limitations
- Data is stored in `localStorage` for the demo. It resets if the browser data is cleared or if "Reset Demo Data" is clicked.
- Maps are visual placeholders. Real GPS tracking is not implemented yet.
- Payment gateways are simulated. No real transactions occur.
- Supabase Auth is built but disabled on production (`VITE_AUTH_MODE=demo`).
