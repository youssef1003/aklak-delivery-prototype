# Aklak Delivery - Web Prototype

Aklak Delivery is a high-quality, clickable web prototype for a modern food delivery platform tailored specifically for the markets in Egypt and Saudi Arabia. It is designed to be premium, responsive, and Arabic-first.

## 🚀 Prototype Sections

The project consists of four main distinct prototypes, all accessible from the main portal (`/`):

1. **Customer App (`/customer`)**
   - Mobile-first experience with a clean, app-like layout.
   - Includes full flows from location selection, restaurant browsing, cart, checkout, to order tracking.
2. **Restaurant Dashboard (`/restaurant-dashboard`)**
   - Professional dashboard for restaurant managers.
   - Includes real-time order management, menu editing, and sales overview.
3. **Admin Dashboard (`/admin-dashboard`)**
   - Centralized SaaS-like control panel for platform administrators.
   - Includes performance overviews, geographical metrics, and restaurant management.
4. **Driver App (`/driver`)**
   - Mobile-first experience for delivery captains.
   - Includes available orders list, order acceptance, and live map delivery flow.

## 🛠 Tech Stack

- **Framework:** React + Vite
- **Routing:** React Router (v6)
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React

## 📦 How to Run Locally

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## 🏗 How to Build for Production

To create a production-ready build:
```bash
npm run build
```
This will generate optimized files in the `dist/` directory.

## 🌐 How to Deploy on Vercel

This project is pre-configured for Vercel deployment as a Single Page Application (SPA). The repository includes a `vercel.json` file to handle React Router navigation correctly.

1. Push your code to a GitHub repository.
2. Log into [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect the Vite framework.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

*No environment variables are required.*

## ⚠️ Current Limitations

This is **Prototype Version 1**, intended for presentation and flow validation. Please note the following limitations:
- **Mock Data Only:** All data (restaurants, orders, users) is loaded locally from `src/data/mockData.js`. There is no real backend connected.
- **No Real Payments:** The checkout flow is a UI mockup. Real payment gateways are not integrated.
- **No Real Maps/GPS:** Map screens and tracking timelines use static placeholders or visual animations instead of real Google Maps API integrations.
- **State Persistence:** Because there is no backend, actions like placing an order or editing the menu will reset upon refreshing the browser.
