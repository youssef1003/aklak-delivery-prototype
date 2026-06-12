import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Map, Phone, MessageCircle, Navigation, CheckCircle2, ShieldAlert } from 'lucide-react';
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
    'Delivered': 3
  };
  
  const step = statusToStep[order.status] || 1;

  const handleNextStep = () => {
    if (order.status === 'Ready for pickup') {
      updateOrderStatus(id, 'Picked up');
    } else if (order.status === 'Picked up' || order.status === 'On the way') {
      updateOrderStatus(id, 'Delivered');
      alert('تم التوصيل بنجاح!');
      navigate('/driver/orders');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <h1 className="text-lg font-bold text-dark">تفاصيل الطلب</h1>
        </div>
        <button className="text-red-500 p-2 hover:bg-red-50 rounded-full">
          <ShieldAlert size={20} />
        </button>
      </header>

      {/* Map Placeholder */}
      <div className="h-64 bg-gray-200 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
          <Map size={48} className="mb-2 text-gray-400" />
          <p className="font-medium">توجيه GPS المباشر</p>
        </div>
      </div>

      <main className="flex-1 p-4 -mt-6 relative z-10 space-y-4 pb-24">
        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center px-8 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-12 before:right-12 before:h-1 before:bg-gray-100">
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <span className="text-[10px] font-bold text-dark">التوجه للمطعم</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <span className="text-[10px] font-bold text-dark">استلام الطلب</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
            <span className="text-[10px] font-bold text-dark">تسليم للعميل</span>
          </div>
        </div>

        {/* Current Target Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-sm font-bold text-dark mb-4">{step === 1 ? 'تفاصيل المطعم' : 'تفاصيل العميل'}</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-bold text-lg text-dark mb-1">{step === 1 ? order.restaurantName : order.customer.name}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Navigation size={14} /> 
                {step === 1 ? 'موقع المطعم' : order.customer.address}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-gray-100 text-dark rounded-full flex items-center justify-center hover:bg-gray-200">
                <MessageCircle size={18} />
              </button>
              <button className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200">
                <Phone size={18} />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-sm">
            <p className="text-gray-500 mb-1">ملاحظات:</p>
            <p className="font-medium text-dark">{step === 1 ? `رقم الطلب #${order.id}` : 'الدور الرابع، شقة 12. يرجى الاتصال عند الوصول.'}</p>
          </div>
        </div>

        {/* Order Payment Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">المطلوب تحصيله من العميل</p>
            <p className="font-bold text-xl text-primary">{order.total} ج.م</p>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold">دفع نقدي</span>
        </div>
      </main>

      {/* Action Button */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-20 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        {step === 1 && (
          <button onClick={handleNextStep} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-green-600/30">
            <span>تم الوصول للمطعم واستلام الطلب</span>
          </button>
        )}
        {step === 2 && (
          <button onClick={handleNextStep} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-green-600/30">
            <CheckCircle2 size={20} />
            <span>تم التسليم للعميل بنجاح</span>
          </button>
        )}
      </div>
    </div>
  );
}
