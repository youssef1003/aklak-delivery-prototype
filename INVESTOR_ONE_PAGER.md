# Aklak Delivery: Investor One-Pager

## What is Aklak Delivery?
Aklak is a localized, Arabic-first food delivery ecosystem (Prototype V1). It is an integrated platform featuring four distinct interfaces: a Customer App, a Restaurant Dashboard, a Driver App, and an Admin Control Panel.

## Who is it for?
- **Primary Markets:** Egypt and Saudi Arabia.
- **End-Users:** Hungry consumers seeking a seamless, gamified ordering experience.
- **B2B Partners:** Restaurants seeking a fair-commission delivery alternative.
- **Gig Workers:** Drivers looking for transparent earnings and intuitive routing.

## What problem does it solve?
Most existing platforms in the MENA region charge extremely high commissions (up to 30%), squeezing restaurant profits. Furthermore, generic white-label solutions lack deep Arabic localization. Aklak solves this by offering a built-from-scratch, culturally localized experience with an architecture that allows for a disruptive, low-commission business model.

## What is working in the demo?
The current V1 Prototype demonstrates the **complete cross-role order lifecycle**:
- Customers can browse, add to cart, apply promos, and checkout.
- Restaurants can receive live orders and update preparation status.
- Drivers can accept orders and mark them as delivered.
- Admins can monitor global operations and financials in real-time.
*(Note: Data is currently stored via LocalStorage to ensure a fast, offline-capable demo experience without backend bottlenecks).*

## What comes next?
The **Backend Integration Phase** (Next 6 Months):
1. Migrate from LocalStorage to the already-prepared Supabase/PostgreSQL database.
2. Activate real user authentication.
3. Integrate live payment gateways (Paymob/Stripe).
4. Integrate Google Maps for real-time driver tracking.

## Demo URL
[https://aklak-delivery-prototype.vercel.app/showcase](https://aklak-delivery-prototype.vercel.app/showcase)

## Demo Accounts
Use these one-click credentials on the Showcase page, or login manually (Password for all: `123456`):
- **Customer:** `customer@aklak.demo`
- **Restaurant:** `restaurant@aklak.demo`
- **Driver:** `driver@aklak.demo`
- **Admin:** `admin@aklak.demo`
