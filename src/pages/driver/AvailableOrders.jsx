import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Clock, Banknote, User, CheckCircle2, ChevronRight } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function AvailableOrders() {
  const navigate = useNavigate();
  const { orders } = useDemo();

  const availableOrders = orders.filter(o => o.status === 'Ready for pickup' || o.status === 'Preparing');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header Profile Map/Top section */}
      <header className="bg-dark p-6 text-white flex flex-col relative overflow-hidden rounded-b-[2rem] shadow-lg mb-6 pb-12">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" alt="Captain" className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10 shadow-lg" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-green-500 border-2 border-dark rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">مرحباً كابتن</p>
              <h1 className="font-bold text-lg">محمود السيد</h1>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
            <span className="text-sm font-bold text-green-400">متصل</span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Stats Cards Overlapping Header */}
      <div className="px-4 -mt-16 relative z-10 grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-3xl p-4 shadow-xl shadow-black/5 border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-[4rem] opacity-50"></div>
          <p className="text-xs text-gray-500 mb-1 font-bold relative z-10">طلبات اليوم</p>
          <p className="font-black text-dark text-3xl relative z-10">{orders.filter(o => o.status === 'Delivered').length}</p>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-xl shadow-black/5 border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-[4rem] opacity-50"></div>
          <p className="text-xs text-gray-500 mb-1 font-bold relative z-10">أرباح اليوم</p>
          <p className="font-black text-green-600 text-3xl relative z-10">240<span className="text-sm ml-1 text-gray-400 font-bold">ج.م</span></p>
        </div>
      </div>

      <main className="flex-1 p-4 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black text-dark tracking-tight">الطلبات المتاحة حولك</h2>
          <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
            {availableOrders.length}
          </div>
        </div>

        {availableOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <Navigation size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-dark mb-2">لا توجد طلبات متاحة حالياً</h3>
            <p className="text-sm text-gray-500">ابقى متصلاً، سيتم إعلامك فور توفر طلبات جديدة بالقرب منك.</p>
          </div>
        ) : (
          availableOrders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl p-5 shadow-lg shadow-black/5 border border-gray-100 relative overflow-hidden group">
              {order.status === 'Ready for pickup' && (
                 <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-[4rem] transition-transform group-hover:scale-150"></div>
              )}
              
              <div className="flex justify-between items-start mb-5 pb-5 border-b border-gray-50 relative z-10">
                <div>
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-bold mb-2 inline-flex items-center gap-1.5 ${order.status === 'Ready for pickup' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {order.status === 'Ready for pickup' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    {order.status === 'Ready for pickup' ? 'جاهز للاستلام' : 'جاري التجهيز'}
                  </div>
                  <p className="font-black text-dark text-lg">#{order.id}</p>
                </div>
                <div className="text-left bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                  <p className="font-black text-green-600 text-xl">25 <span className="text-sm font-bold text-gray-400">ج.م</span></p>
                  <p className="text-[10px] text-gray-500 font-bold">أجرة التوصيل</p>
                </div>
              </div>

              <div className="space-y-6 relative before:absolute before:right-[15px] before:top-2 before:bottom-6 before:w-0.5 before:bg-gradient-to-b before:from-gray-300 before:to-gray-100 mb-6 z-10 px-1">
                <div className="flex gap-4 relative z-10">
                  <div className="w-8 h-8 bg-white border-4 border-dark rounded-full flex items-center justify-center shrink-0 shadow-sm relative z-10">
                    <div className="w-2 h-2 bg-dark rounded-full"></div>
                  </div>
                  <div className="pt-1 w-full">
                    <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wide">نقطة الاستلام</p>
                    <p className="font-bold text-dark text-base mb-1">{order.restaurantName}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 font-medium"><Navigation size={12} className="text-primary" /> 2.5 كم من موقعك</p>
                  </div>
                </div>
                
                <div className="flex gap-4 relative z-10">
                  <div className="w-8 h-8 bg-white border-4 border-primary rounded-full flex items-center justify-center shrink-0 shadow-sm relative z-10">
                    <MapPin size={12} className="text-primary" />
                  </div>
                  <div className="pt-1 w-full">
                    <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wide">نقطة التسليم</p>
                    <p className="font-bold text-dark text-base mb-1 truncate max-w-[200px]">{order.customer.address}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 font-medium"><Navigation size={12} className="text-primary" /> 4.2 كم الإجمالي</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 relative z-10">
                <button className="flex-1 bg-gray-50 text-gray-600 py-3.5 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-colors border border-gray-100">
                  تجاهل
                </button>
                <button 
                  onClick={() => navigate(`/driver/order/${order.id}`)} 
                  disabled={order.status !== 'Ready for pickup'}
                  className="flex-[2] bg-dark text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-black/10 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn"
                >
                  {order.status === 'Ready for pickup' ? (
                    <>قبول الطلب <ChevronRight size={18} className="group-hover/btn:-translate-x-1 transition-transform" /></>
                  ) : (
                    'جاري التجهيز بالمطعم...'
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 fixed bottom-0 w-full max-w-md px-6 py-4 flex justify-between items-center z-30 pb-safe shadow-[0_-15px_30px_rgba(0,0,0,0.04)]">
        <button className="flex flex-col items-center gap-1.5 text-dark transition-colors">
          <div className="p-1.5 bg-gray-100 rounded-xl">
            <Navigation size={22} className="fill-dark/20" />
          </div>
          <span className="text-[10px] font-bold">الطلبات</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <div className="p-1.5 rounded-xl">
            <Clock size={22} />
          </div>
          <span className="text-[10px] font-bold">السجل</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <div className="p-1.5 rounded-xl">
            <Banknote size={22} />
          </div>
          <span className="text-[10px] font-bold">الأرباح</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <div className="p-1.5 rounded-xl">
            <User size={22} />
          </div>
          <span className="text-[10px] font-bold">حسابي</span>
        </button>
      </nav>
    </div>
  );
}
