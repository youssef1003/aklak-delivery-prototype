import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, MapPin, CreditCard, Heart, Bell, HelpCircle, LogOut, Settings, ChevronRight } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <User size={20} />, label: 'المعلومات الشخصية', path: '#' },
    { icon: <MapPin size={20} />, label: 'العناوين المحفوظة', path: '#' },
    { icon: <CreditCard size={20} />, label: 'طرق الدفع', path: '#' },
    { icon: <Heart size={20} />, label: 'المطاعم المفضلة', path: '#' },
    { icon: <Bell size={20} />, label: 'الإشعارات', path: '#' },
    { icon: <HelpCircle size={20} />, label: 'مركز المساعدة', path: '#' },
    { icon: <Settings size={20} />, label: 'الإعدادات', path: '#' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => navigate('/customer/home')} className="p-2 hover:bg-gray-50 rounded-full">
          <ChevronLeft size={24} className="text-dark" />
        </button>
        <h1 className="text-lg font-bold text-dark">حسابي</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
            أ
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-dark text-lg mb-1">أحمد محمد</h2>
            <p className="text-gray-500 text-sm dir-ltr text-right">+20 101 234 5678</p>
          </div>
          <button className="p-2 text-primary bg-primary/5 rounded-lg">
            <Settings size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <p className="text-2xl font-bold text-primary mb-1">15</p>
            <p className="text-gray-500 text-sm">إجمالي الطلبات</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <p className="text-2xl font-bold text-yellow-500 mb-1">1250</p>
            <p className="text-gray-500 text-sm">أكلك كوينز</p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <button key={index} className="w-full flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-gray-400">{item.icon}</div>
                <span className="font-medium text-dark text-sm">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-red-50 rounded-2xl font-bold hover:bg-red-100 transition-colors">
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </main>
    </div>
  );
}
