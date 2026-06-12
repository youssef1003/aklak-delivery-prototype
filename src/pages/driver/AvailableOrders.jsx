import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Clock, Banknote, User } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function AvailableOrders() {
  const navigate = useNavigate();
  const { orders } = useDemo();

  const availableOrders = orders.filter(o => o.status === 'Ready for pickup' || o.status === 'Preparing');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="bg-green-600 p-4 text-white flex items-center justify-between sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <p className="text-xs text-green-100">مرحباً كابتن</p>
            <h1 className="font-bold">محمود السيد</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold bg-white/20 px-2 py-1 rounded">متصل</span>
          <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse border-2 border-green-600"></div>
        </div>
      </header>

      <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm">
        <div className="text-center flex-1 border-l border-gray-100">
          <p className="text-xs text-gray-500 mb-1">طلبات اليوم</p>
          <p className="font-bold text-dark text-lg">{orders.filter(o => o.status === 'Delivered').length}</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-xs text-gray-500 mb-1">أرباح اليوم</p>
          <p className="font-bold text-green-600 text-lg">240 ج.م</p>
        </div>
      </div>

      <main className="flex-1 p-4 space-y-4">
        <h2 className="text-lg font-bold text-dark mb-2">الطلبات المتاحة حولك</h2>

        {availableOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-12">لا توجد طلبات متاحة حالياً</div>
        ) : (
          availableOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-bold mb-2 inline-block ${order.status === 'Ready for pickup' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {order.status === 'Ready for pickup' ? 'جاهز للاستلام' : 'طلب جديد'}
                  </span>
                  <p className="font-bold text-dark">#{order.id}</p>
                </div>
                <div className="text-left">
                  <p className="font-bold text-green-600 text-xl">25 ج.م</p>
                  <p className="text-xs text-gray-500">أجرة التوصيل</p>
                </div>
              </div>

              <div className="space-y-4 relative before:absolute before:right-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200 mb-4">
                <div className="flex gap-3 relative z-10">
                  <div className="w-7 h-7 bg-white border-2 border-green-500 rounded-full flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">استلام من</p>
                    <p className="font-bold text-dark text-sm">{order.restaurantName}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Navigation size={12} /> 2.5 كم</p>
                  </div>
                </div>
                
                <div className="flex gap-3 relative z-10">
                  <div className="w-7 h-7 bg-white border-2 border-red-500 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">تسليم إلى</p>
                    <p className="font-bold text-dark text-sm">{order.customer.address}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Navigation size={12} /> 4.2 كم الإجمالي</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
                  تجاهل
                </button>
                <button 
                  onClick={() => navigate(`/driver/order/${order.id}`)} 
                  disabled={order.status !== 'Ready for pickup'}
                  className="flex-[2] bg-green-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-600/30 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {order.status === 'Ready for pickup' ? 'قبول الطلب' : 'جاري التجهيز...'}
                </button>
              </div>
            </div>
          ))
        )}

      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md px-6 py-3 flex justify-between items-center z-20 pb-safe">
        <button className="flex flex-col items-center gap-1 text-green-600">
          <Navigation size={24} className="fill-green-600/20" />
          <span className="text-[10px] font-medium">الطلبات</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Clock size={24} />
          <span className="text-[10px] font-medium">السجل</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Banknote size={24} />
          <span className="text-[10px] font-medium">الأرباح</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <User size={24} />
          <span className="text-[10px] font-medium">حسابي</span>
        </button>
      </nav>
    </div>
  );
}
