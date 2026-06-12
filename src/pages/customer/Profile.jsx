import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, MapPin, CreditCard, Heart, Bell, HelpCircle, LogOut, Settings, ChevronRight } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { MOCK_RESTAURANTS, MOCK_MENU, GENERIC_MENU } from '../../data/mockData';
import PointsCard from '../../components/customer/PointsCard';
import RestaurantCard from '../../components/customer/RestaurantCard';

export default function Profile() {
  const navigate = useNavigate();
  const { orders, user, favorites, resetDemoData } = useDemo();
  const [showFavorites, setShowFavorites] = useState(false);

  const menuItems = [
    { icon: <User size={20} />, label: 'المعلومات الشخصية', action: () => {} },
    { icon: <MapPin size={20} />, label: 'العناوين المحفوظة', action: () => {} },
    { icon: <CreditCard size={20} />, label: 'طرق الدفع', action: () => {} },
    { icon: <Heart size={20} />, label: 'المفضلة (مطاعم ووجبات)', action: () => setShowFavorites(true) },
    { icon: <Bell size={20} />, label: 'الإشعارات', action: () => {} },
    { icon: <HelpCircle size={20} />, label: 'مركز المساعدة', action: () => {} },
    { icon: <Settings size={20} />, label: 'الإعدادات', action: () => {} },
  ];

  // Derive favorite restaurants
  const favoriteRestaurants = MOCK_RESTAURANTS.filter(r => favorites?.restaurants?.includes(r.id));

  if (showFavorites) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
        <header className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
          <button onClick={() => setShowFavorites(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <h1 className="text-lg font-bold text-dark">المفضلة</h1>
        </header>
        <main className="flex-1 p-4">
          <h2 className="text-lg font-bold text-dark mb-4">المطاعم المفضلة</h2>
          {favoriteRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm">
              <Heart size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-dark mb-2">لا يوجد مطاعم مفضلة</h3>
              <p className="text-sm text-gray-500">قم بتصفح المطاعم وأضف ما يعجبك إلى قائمتك المفضلة.</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('/customer/home')} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-dark" />
        </button>
        <h1 className="text-lg font-bold text-dark">حسابي</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        
        {/* User Info */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-12 bg-primary/5"></div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl font-black relative z-10 border border-primary/20 shadow-inner">
            {user?.name?.[0] || 'أ'}
          </div>
          <div className="flex-1 relative z-10">
            <h2 className="font-bold text-dark text-lg mb-1">{user?.name || 'أحمد محمد'}</h2>
            <p className="text-gray-500 text-sm dir-ltr text-right font-medium">{user?.phone || '+20 101 234 5678'}</p>
          </div>
          <button className="p-2 text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors relative z-10">
            <Settings size={20} />
          </button>
        </div>

        {/* Loyalty Points Card */}
        <PointsCard points={user?.points || 0} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 rounded-full"></div>
            <p className="text-3xl font-black text-dark mb-1 relative z-10">{orders.length}</p>
            <p className="text-gray-500 text-xs font-bold relative z-10">إجمالي الطلبات</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-red-50 rounded-full"></div>
            <p className="text-3xl font-black text-dark mb-1 relative z-10">{favorites?.restaurants?.length || 0}</p>
            <p className="text-gray-500 text-xs font-bold relative z-10">المطاعم المفضلة</p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <button key={index} onClick={item.action} className="w-full flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {item.icon}
                </div>
                <span className="font-bold text-dark text-sm">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-white border border-red-100 rounded-2xl font-bold hover:bg-red-50 transition-colors shadow-sm mb-4">
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>

        {/* Reset Demo Data */}
        <button onClick={() => {
          if(window.confirm('هل أنت متأكد من مسح جميع البيانات التجريبية (الطلبات، السلة، النقاط) والعودة لنقطة الصفر؟')) {
            resetDemoData();
          }
        }} className="w-full flex items-center justify-center gap-2 p-4 text-gray-500 bg-gray-100 border border-gray-200 rounded-2xl font-bold hover:bg-gray-200 transition-colors shadow-sm">
          <span>إعادة ضبط البيانات التجريبية (Reset Demo)</span>
        </button>
      </main>
    </div>
  );
}
