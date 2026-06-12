import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Map, Phone, MessageCircle, Navigation, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(1); // 1: Going to rest, 2: Picked up, 3: Delivered

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
              <p className="font-bold text-lg text-dark mb-1">{step === 1 ? 'Heart Attack' : 'أحمد محمد'}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Navigation size={14} /> 
                {step === 1 ? 'المهندسين، شارع جامعة الدول' : 'الدقي، شارع التحرير، عمارة 15'}
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
            <p className="font-medium text-dark">{step === 1 ? 'رقم الطلب #ORD-10985' : 'الدور الرابع، شقة 12. يرجى الاتصال عند الوصول.'}</p>
          </div>
        </div>

        {/* Order Payment Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">المطلوب تحصيله من العميل</p>
            <p className="font-bold text-xl text-primary">335 ج.م</p>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold">دفع نقدي</span>
        </div>
      </main>

      {/* Action Button */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-20 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        {step === 1 && (
          <button onClick={() => setStep(2)} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-green-600/30">
            <span>تم الوصول للمطعم</span>
          </button>
        )}
        {step === 2 && (
          <button onClick={() => setStep(3)} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-green-600/30">
            <span>تم استلام الطلب وبدء التوصيل</span>
          </button>
        )}
        {step === 3 && (
          <button onClick={() => {
            alert('تم التوصيل بنجاح!');
            navigate('/driver/orders');
          }} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-green-600/30">
            <CheckCircle2 size={20} />
            <span>تم التسليم بنجاح</span>
          </button>
        )}
      </div>
    </div>
  );
}
