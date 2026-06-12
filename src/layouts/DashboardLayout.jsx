import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Utensils, Tag, BarChart3, Settings, Users, LogOut, Globe, MapPin, Truck, Ticket, LifeBuoy } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';

export default function DashboardLayout({ type }) {
  const location = useLocation();

  const restaurantLinks = [
    { name: 'الرئيسية', path: '/restaurant-dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'الطلبات', path: '/restaurant-dashboard/orders', icon: <ShoppingBag size={20} /> },
    { name: 'المنيو', path: '/restaurant-dashboard/menu', icon: <Utensils size={20} /> },
    { name: 'العروض', path: '/restaurant-dashboard/offers', icon: <Tag size={20} /> },
    { name: 'التقارير', path: '/restaurant-dashboard/reports', icon: <BarChart3 size={20} /> },
    { name: 'الإعدادات', path: '/restaurant-dashboard/settings', icon: <Settings size={20} /> },
  ];

  const adminLinks = [
    { name: 'لوحة التحكم', path: '/admin-dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'الدول والمدن', path: '/admin-dashboard/locations', icon: <Globe size={20} /> },
    { name: 'المطاعم', path: '/admin-dashboard/restaurants', icon: <Utensils size={20} /> },
    { name: 'الطلبات', path: '/admin-dashboard/orders', icon: <ShoppingBag size={20} /> },
    { name: 'المناديب', path: '/admin-dashboard/drivers', icon: <Truck size={20} /> },
    { name: 'العملاء', path: '/admin-dashboard/customers', icon: <Users size={20} /> },
    { name: 'الكوبونات', path: '/admin-dashboard/coupons', icon: <Ticket size={20} /> },
    { name: 'إعدادات العمولة', path: '/admin-dashboard/commission', icon: <Settings size={20} /> },
    { name: 'تذاكر الدعم', path: '/admin-dashboard/support', icon: <LifeBuoy size={20} /> },
  ];

  const links = type === 'admin' ? adminLinks : restaurantLinks;
  const title = type === 'admin' ? 'لوحة تحكم الإدارة' : 'لوحة تحكم المطعم';

  return (
    <div className="flex min-h-screen bg-gray-50 text-dark">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">{title}</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {links.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== `/${type}-dashboard` && location.pathname.startsWith(link.path));
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between">
          <div className="md:hidden">
            <h1 className="text-lg font-bold text-primary">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <DemoBadge />
    </div>
  );
}
