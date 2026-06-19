# Supabase Backend Documentation

This folder contains the foundation for connecting Aklak Delivery to a real Postgres database via Supabase.

## Current Status
**INTENTIONALLY DISCONNECTED:** As of Sprint 3B-1, the frontend still runs exclusively on the `localStorage` adapter. Supabase is **not yet connected** to the React app.

## File Overview

- **`migrations/001_initial_schema.sql`**: The MVP PostgreSQL schema. It contains all the tables needed to represent the Aklak ecosystem (Customers, Restaurants, Drivers, Orders, Menus).
- **`migrations/002_rls_policies.sql`**: Row Level Security policies. These enforce who can read/write data directly at the database level. Currently includes safe defaults and foundational structures.
- **`migrations/003_seed_demo_data.sql`**: Seed data for basic geographical locations (Egypt/KSA), sample restaurants, menu categories, and test coupons.

## How to use (When Approved)

1. Create a Supabase project.
2. In the Supabase SQL editor, run the files in strict order:
   - Run `001_initial_schema.sql` first.
   - Run `002_rls_policies.sql` second.
   - Run `003_seed_demo_data.sql` third.
3. Once completed, your database will be structured and populated, ready for the backend adapter implementation in upcoming sprints.
