-- 002_rls_policies.sql

-- Enable RLS on core tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;

-- 1. Public Reads
-- Anyone can view active restaurants, branches, and available menu items
CREATE POLICY "Public can view active restaurants" 
ON restaurants FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view active branches" 
ON restaurant_branches FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view menu categories" 
ON menu_categories FOR SELECT USING (true);

CREATE POLICY "Public can view available menu items" 
ON menu_items FOR SELECT USING (is_available = true);

-- 2. Users Table
-- Users can only read and update their own profile
CREATE POLICY "Users can view own profile" 
ON users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON users FOR UPDATE USING (auth.uid() = id);

-- 3. Customers Table
CREATE POLICY "Customers can view own data" 
ON customers FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Customers can update own data" 
ON customers FOR UPDATE USING (user_id = auth.uid());

-- 4. Orders
-- Customer can read and insert their own orders
CREATE POLICY "Customers can view own orders" 
ON orders FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

CREATE POLICY "Customers can insert own orders" 
ON orders FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Driver can read orders assigned to them or ready for pickup
-- TODO: Expand logic once Driver table mapping is strictly defined in auth context
CREATE POLICY "Drivers can view assigned or ready orders" 
ON orders FOR SELECT USING (
    status = 'ready_for_pickup' OR 
    driver_id IN (SELECT id FROM drivers WHERE user_id = auth.uid())
);

CREATE POLICY "Drivers can update assigned orders" 
ON orders FOR UPDATE USING (
    driver_id IN (SELECT id FROM drivers WHERE user_id = auth.uid())
);

-- Restaurant Owner/Staff can read and update orders for their restaurant
CREATE POLICY "Restaurant staff can view their orders" 
ON orders FOR SELECT USING (
    restaurant_id IN (
        SELECT id FROM restaurants WHERE owner_id = auth.uid()
        UNION
        SELECT restaurant_id FROM restaurant_staff WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Restaurant staff can update their orders" 
ON orders FOR UPDATE USING (
    restaurant_id IN (
        SELECT id FROM restaurants WHERE owner_id = auth.uid()
        UNION
        SELECT restaurant_id FROM restaurant_staff WHERE user_id = auth.uid()
    )
);

-- 5. Order Items
-- Inherits visibility conceptually, but we write explicit policies.
CREATE POLICY "Users can view their order items" 
ON order_items FOR SELECT USING (
    order_id IN (
        SELECT id FROM orders WHERE 
            customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()) OR
            restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
    )
);

CREATE POLICY "Customers can insert order items" 
ON order_items FOR INSERT WITH CHECK (
    order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()))
);

-- 6. Favorites & Loyalty
CREATE POLICY "Customers can manage own favorites" 
ON favorites FOR ALL USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

CREATE POLICY "Customers can view own loyalty points" 
ON loyalty_points FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- 7. Admin & Super Admin Bypass (Assumes role column in users table)
-- Note: In a true production app, you might use Supabase Custom Claims.
-- For this MVP schema, we check the users table role.
CREATE POLICY "Admins can view all users" 
ON users FOR SELECT USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'super_admin'))
);

CREATE POLICY "Admins can view all orders" 
ON orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'super_admin'))
);

-- TODO: Expand admin policies to allow full CRUD once the admin dashboard features are finalized.
