import { Navigation, Clock, Banknote, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DriverBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'orders', path: '/driver/orders', icon: Navigation, label: 'الطلبات' },
    { id: 'history', path: '/driver/history', icon: Clock, label: 'السجل' },
    { id: 'earnings', path: '/driver/earnings', icon: Banknote, label: 'الأرباح' },
    { id: 'profile', path: '/driver/profile', icon: User, label: 'حسابي' },
  ];

  return (
    <nav className="bg-white border-t border-gray-100 fixed bottom-0 w-full max-w-md px-6 py-4 flex justify-between items-center z-30 pb-safe shadow-[0_-15px_30px_rgba(0,0,0,0.04)]">
      {navItems.map((item) => {
        const isActive = location.pathname.includes(item.id) || (item.id === 'orders' && location.pathname === '/driver');
        const Icon = item.icon;
        
        return (
          <button 
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1.5 transition-colors ${isActive ? 'text-dark' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className={`p-1.5 rounded-xl ${isActive ? 'bg-gray-100' : ''}`}>
              <Icon size={22} className={isActive ? 'fill-dark/20' : ''} />
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
