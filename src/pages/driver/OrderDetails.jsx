import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Map, Phone, MessageCircle, Navigation, CheckCircle2, ShieldAlert, Car, MapPin } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders, updateOrderStatus } = useDemo();
  
  const order = orders.find(o => o.id === id) || { status: 'Picked up', restaurantName: 'Restaurant', customer: { name: 'Customer', address: 'Address' }, total: 0 };
  
  const statusToStep = {
    'Ready for pickup': 1,
    'Picked up': 2,
    'On the way': 2,
    'Delivered': 3,
    'Completed': 3
  };
  
  const step = statusToStep[order.status] || 1;

  const handleNextStep = () => {
    if (order.status === 'Ready for pickup') {
      updateOrderStatus(id, 'Picked up');
    } else if (order.status === 'Picked up' || order.status === 'On the way') {
      updateOrderStatus(id, 'Delivered');
      navigate('/driver/orders');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-dark">تفاصيل الطلب</h1>
            <p className="text-xs text-primary font-bold">#{order.id}</p>
          </div>
        </div>
        <button className="text-red-500 p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors">
          <ShieldAlert size={20} />
        </button>
      </header>

      {/* Map Premium Placeholder */}
      <div className="h-72 bg-gray-200 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="map" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center mb-3 shadow-xl border border-white/50">
            <Car size={32} className="text-primary" />
          </div>
          <div className="bg-dark/80 backdrop-blur text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
            توجيه مباشر (GPS)
          </div>
        </div>
      </div>

      <main className="flex-1 p-4 -mt-10 relative z-10 space-y-4 pb-28">
        {/* Progress Timeline */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-center relative z-10 px-4 before:absolute before:top-1/2 before:-translate-y-1/2 before:left-8 before:right-8 before:h-1.5 before:bg-gray-100 before:rounded-full">
            {/* Active Track */}
            <div className="absolute top-1/2 -translate-y-1/2 right-8 h-1.5 bg-green-500 rounded-full transition-all duration-1000" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-md ${step >= 1 ? 'bg-green-500 text-white shadow-green-500/40 border-2 border-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <span className={`text-[10px] font-bold ${step >= 1 ? 'text-dark' : 'text-gray-400'}`}>المطعم</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-md ${step >= 2 ? 'bg-green-500 text-white shadow-green-500/40 border-2 border-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>2</div>
              <span className={`text-[10px] font-bold ${step >= 2 ? 'text-dark' : 'text-gray-400'}`}>الاستلام</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-md ${step >= 3 ? 'bg-green-500 text-white shadow-green-500/40 border-2 border-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>3</div>
              <span className={`text-[10px] font-bold ${step >= 3 ? 'text-dark' : 'text-gray-400'}`}>العميل</span>
            </div>
          </div>
        </div>

        {/* Current Target Info */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-2 h-full ${step === 1 ? 'bg-primary' : 'bg-blue-500'}`}></div>
          
          <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wide px-2">{step === 1 ? 'وجهتك الحالية: المطعم' : 'وجهتك الحالية: العميل'}</h2>
          
          <div className="flex justify-between items-start mb-6 px-2">
            <div>
              <p className="font-black text-xl text-dark mb-2">{step === 1 ? order.restaurantName : order.customer.name}</p>
              <div className="flex items-start gap-2">
                <Navigation size={16} className="text-gray-400 mt-0.5" /> 
                <p className="text-sm text-gray-600 font-medium leading-relaxed max-w-[220px]">
                  {step === 1 ? 'موقع المطعم (سيتم عرضه على الخريطة)' : order.customer.address}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-100 transition-colors border border-green-100">
                <Phone size={20} />
              </button>
              <button className="w-12 h-12 bg-gray-50 text-gray-600 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>

          <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50 flex gap-3 items-start">
            <div className="mt-0.5 w-2 h-2 bg-orange-400 rounded-full shrink-0"></div>
            <div>
              <p className="text-xs text-orange-800 font-bold mb-1">ملاحظات التوصيل:</p>
              <p className="text-sm text-orange-900 font-medium leading-relaxed">
                {step === 1 ? `تأكد من استلام الطلب رقم #${order.id} كاملًا من المطعم.` : 'الدور الرابع، شقة 12. يرجى الاتصال عند الوصول ولا تدق الجرس.'}
              </p>
            </div>
          </div>
        </div>

        {/* Order Payment Info */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-gray-500 mb-1">المطلوب تحصيله</p>
            <div className="flex items-end gap-1">
              <p className="font-black text-2xl text-dark">{order.total}</p>
              <p className="text-sm text-gray-500 font-bold mb-1">ج.م</p>
            </div>
          </div>
          <div className="text-right">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-bold border border-green-200 inline-block">دفع نقدي</span>
          </div>
        </div>
      </main>

      {/* Action Button */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-30 pb-safe shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
        {step === 1 && (
          <button onClick={handleNextStep} className="w-full bg-dark text-white py-4.5 rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-xl shadow-black/20 hover:bg-black transition-all">
            <MapPin size={22} />
            <span>تم استلام الطلب من المطعم</span>
          </button>
        )}
        {step === 2 && (
          <button onClick={handleNextStep} className="w-full bg-green-500 text-white py-4.5 rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-xl shadow-green-500/30 hover:bg-green-600 transition-all">
            <CheckCircle2 size={24} />
            <span>تسليم الطلب للعميل</span>
          </button>
        )}
      </div>
    </div>
  );
}
