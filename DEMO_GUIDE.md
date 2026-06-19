# Aklak Delivery - Demo Guide

Welcome to the Aklak Delivery interactive prototype. This document serves as a guide for investors, partners, and team members to test and understand the complete flow of the platform.

## 1. Production URL
**Live Demo:** [https://aklak-delivery-prototype.vercel.app/](https://aklak-delivery-prototype.vercel.app/)

## 2. What the Demo Includes
The prototype demonstrates a full ecosystem featuring four interconnected interfaces:
- **Customer App:** Mobile-first ordering experience.
- **Restaurant Dashboard:** Web-based tablet/desktop management system.
- **Driver App:** Mobile-first delivery and navigation tool.
- **Admin Dashboard:** Centralized control panel for the platform owner.

## 3. How to Test the Customer Flow
1. Open the Production URL and click on **تطبيق العميل**.
2. Go through the splash screen and login mock.
3. Browse the home page. Try the **Search** and **Filters** (e.g., Fastest, Top Rated).
4. Click on a restaurant, then select a meal. 
5. Add the meal to your cart and proceed to checkout.
6. Note the subtotal, apply promo code `AKLAK10`, and complete the order.
7. Navigate to **حسابي (Profile)** to see your Loyalty Points and Favorites.

## 4. How to Test Restaurant Dashboard Flow
1. From the main portal, click on **لوحة المطعم**.
2. View the **Overview** page to see mock analytics and sales data.
3. Go to **إدارة الطلبات (Orders Management)**. Any order you placed in the Customer App will appear here as a "New" order.
4. You can visually explore the menu management page.

## 5. How to Test Driver Flow
1. From the main portal, click on **تطبيق المندوب**.
2. Click login to enter the "Available Orders" screen.
3. You will see orders that are ready for pickup. Accept an order to see the map navigation screen.
4. Click through the progress buttons:
   - **تم استلام الطلب من المطعم** (Picked up)
   - **تسليم الطلب للعميل** (Delivered)
5. Once "Delivered", check the Customer App's tracking or profile—Loyalty Points will now be awarded!

## 6. How to Test Admin Dashboard
1. From the main portal, click on **لوحة الإدارة**.
2. View platform-wide metrics, including performance across Egypt and Saudi Arabia.
3. View the **إدارة المطاعم** list to see active restaurants, their ratings, and commission rates.

## 7. Demo Limitations
As this is **Prototype Version 1 (Sprint 2)**, please keep the following technical constraints in mind:
- **localStorage only:** Data is saved locally in your browser. 
- **No shared state across devices:** An order placed on your phone will not appear on your desktop.
- **No real backend/database:** All data is initialized from local mock files.
- **No real payments:** Checkout is a UI simulation.
- **No real GPS:** Map screens use placeholder graphics or static components.
- **Data Reset:** If you wish to restart the demo, go to the Customer App -> Profile -> scroll to the bottom and click **إعادة ضبط البيانات التجريبية (Reset Demo)**.
