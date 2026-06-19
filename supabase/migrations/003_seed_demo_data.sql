-- 003_seed_demo_data.sql

-- 1. Insert Countries
INSERT INTO countries (id, code, name_ar, name_en, currency_code) VALUES
('11111111-1111-1111-1111-111111111111', 'EG', 'مصر', 'Egypt', 'EGP'),
('22222222-2222-2222-2222-222222222222', 'SA', 'السعودية', 'Saudi Arabia', 'SAR')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Cities
INSERT INTO cities (id, country_id, name_ar, name_en) VALUES
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'القاهرة', 'Cairo'),
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'الجيزة', 'Giza'),
('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'الإسكندرية', 'Alexandria'),
('66666666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', 'الرياض', 'Riyadh'),
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'جدة', 'Jeddah'),
('88888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'الدمام', 'Dammam')
ON CONFLICT (id) DO NOTHING;

-- Note: We are skipping inserting users, customers, and drivers because they depend on auth.users 
-- which cannot easily be seeded with dummy UUIDs in Supabase without proper Auth API creation.
-- In a real setup, auth accounts will be created first, then triggering insertion here.

-- 3. Insert Restaurants
INSERT INTO restaurants (id, country_id, name_ar, name_en, description, logo_url, cover_url, status) VALUES
('aaaa1111-aaaa-1111-aaaa-1111aaaa1111', '22222222-2222-2222-2222-222222222222', 'البيك', 'Al Baik', 'أشهر دجاج بروستد في المملكة', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop', 'active'),
('bbbb2222-bbbb-2222-bbbb-2222bbbb2222', '11111111-1111-1111-1111-111111111111', 'بازوكا', 'Bazooka', 'ملوك السعادة في مصر', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop', 'active')
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Restaurant Branches
INSERT INTO restaurant_branches (id, restaurant_id, city_id, name_ar, name_en) VALUES
('cccc3333-cccc-3333-cccc-3333cccc3333', 'aaaa1111-aaaa-1111-aaaa-1111aaaa1111', '66666666-6666-6666-6666-666666666666', 'فرع الرياض الرئيسي', 'Riyadh Main Branch'),
('dddd4444-dddd-4444-dddd-4444dddd4444', 'bbbb2222-bbbb-2222-bbbb-2222bbbb2222', '33333333-3333-3333-3333-333333333333', 'فرع المعادي', 'Maadi Branch')
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Menu Categories
INSERT INTO menu_categories (id, restaurant_id, name_ar, name_en, sort_order) VALUES
('eeee5555-eeee-5555-eeee-5555eeee5555', 'aaaa1111-aaaa-1111-aaaa-1111aaaa1111', 'وجبات التوفير', 'Value Meals', 1),
('ffff6666-ffff-6666-ffff-6666ffff6666', 'bbbb2222-bbbb-2222-bbbb-2222bbbb2222', 'السندوتشات', 'Sandwiches', 1)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Menu Items
INSERT INTO menu_items (id, category_id, restaurant_id, name_ar, name_en, price, is_available) VALUES
('00007777-0000-7777-0000-777700007777', 'eeee5555-eeee-5555-eeee-5555eeee5555', 'aaaa1111-aaaa-1111-aaaa-1111aaaa1111', 'وجبة مسحب', 'Nuggets Meal', 20.00, true),
('11118888-1111-8888-1111-888811118888', 'ffff6666-ffff-6666-ffff-6666ffff6666', 'bbbb2222-bbbb-2222-bbbb-2222bbbb2222', 'سندوتش كرانشي', 'Crunchy Sandwich', 85.00, true)
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Coupons
INSERT INTO coupons (id, code, discount_percent, max_uses) VALUES
('22229999-2222-9999-2222-999922229999', 'AKLAK10', 10.00, 1000)
ON CONFLICT (id) DO NOTHING;
