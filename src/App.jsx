import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MobileLayout from './layouts/MobileLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PlaceholderPage from './components/PlaceholderPage';

// Context
import { DemoProvider } from './context/DemoContext';

// Main Portal
import PortalHome from './pages/Home';

// Customer Pages
import Splash from './pages/customer/Splash';
import CustomerLogin from './pages/customer/Login';
import CountryCity from './pages/customer/CountryCity';
import CustomerHome from './pages/customer/Home';
import RestaurantDetails from './pages/customer/RestaurantDetails';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import Tracking from './pages/customer/Tracking';
import Profile from './pages/customer/Profile';

// Restaurant Pages
import RestOverview from './pages/restaurant/Overview';
import RestOrders from './pages/restaurant/Orders';
import RestMenu from './pages/restaurant/Menu';

// Admin Pages
import AdminOverview from './pages/admin/Overview';
import AdminRestaurants from './pages/admin/Restaurants';

// Driver Pages
import DriverLogin from './pages/driver/Login';
import AvailableOrders from './pages/driver/AvailableOrders';
import DriverOrderDetails from './pages/driver/OrderDetails';

function App() {
  return (
    <DemoProvider>
      <Router>
        <Routes>
          {/* Main Entry */}
          <Route path="/" element={<PortalHome />} />

          {/* Customer App (Mobile Layout) */}
          <Route path="/customer" element={<MobileLayout />}>
            <Route index element={<Splash />} />
            <Route path="login" element={<CustomerLogin />} />
            <Route path="location" element={<CountryCity />} />
            <Route path="home" element={<CustomerHome />} />
            <Route path="restaurant/:id" element={<RestaurantDetails />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<PlaceholderPage title="صفحة العميل" module="تطبيق العميل" />} />
          </Route>

          {/* Driver App (Mobile Layout) */}
          <Route path="/driver" element={<MobileLayout />}>
            <Route index element={<DriverLogin />} />
            <Route path="orders" element={<AvailableOrders />} />
            <Route path="order/:id" element={<DriverOrderDetails />} />
            <Route path="*" element={<PlaceholderPage title="صفحة المندوب" module="تطبيق المندوب" />} />
          </Route>

          {/* Restaurant Dashboard */}
          <Route path="/restaurant-dashboard" element={<DashboardLayout type="restaurant" />}>
            <Route index element={<RestOverview />} />
            <Route path="orders" element={<RestOrders />} />
            <Route path="menu" element={<RestMenu />} />
            {/* Placeholders for other dashboard routes */}
            <Route path="*" element={<PlaceholderPage title="صفحة تحت الإنشاء" module="لوحة تحكم المطعم" />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin-dashboard" element={<DashboardLayout type="admin" />}>
            <Route index element={<AdminOverview />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
            <Route path="*" element={<PlaceholderPage title="صفحة تحت الإنشاء" module="لوحة تحكم الإدارة" />} />
          </Route>

          {/* Global Fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <PlaceholderPage title="الصفحة غير موجودة" module="النظام الأساسي" />
            </div>
          } />

        </Routes>
      </Router>
    </DemoProvider>
  );
}

export default App;
