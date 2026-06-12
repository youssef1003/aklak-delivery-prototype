import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, Plus, Minus, Tag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <h1 className="text-lg font-bold text-dark">السلة</h1>
        </div>
        <button className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
          تفريغ
        </button>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60" alt="Restaurant" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p className="text-xs text-gray-500 mb-1">الطلب من</p>
            <h2 className="font-bold text-dark text-sm">Heart Attack - المهندسين</h2>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          {[1, 2].map(item => (
            <div key={item} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <img src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60" alt="Item" className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-dark text-sm">وجبة هارت أتاك</h3>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">حجم وسط، بدون بصل</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-primary text-sm">180 ج.م</p>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                    <button className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-dark">
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-sm">1</span>
                    <button className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded shadow-sm">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button onClick={() => navigate(-1)} className="w-full py-3 flex items-center justify-center gap-2 text-primary font-bold text-sm border border-primary/20 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
            <Plus size={16} />
            إضافة المزيد من الأصناف
          </button>
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
            <Tag size={20} />
          </div>
          <div className="flex-1">
            <input type="text" placeholder="أدخل كود الخصم" className="w-full text-sm outline-none bg-transparent" />
          </div>
          <button className="text-primary font-bold text-sm">تطبيق</button>
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
          <h3 className="font-bold text-dark mb-4">ملخص الطلب</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>المجموع الفرعي</span>
            <span>360 ج.م</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>رسوم التوصيل</span>
            <span>25 ج.م</span>
          </div>
          <div className="flex justify-between text-sm text-success">
            <span>الخصم (أول طلب)</span>
            <span>-50 ج.م</span>
          </div>
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="font-bold text-dark">الإجمالي</span>
            <span className="font-bold text-xl text-primary">335 ج.م</span>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-20 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => navigate('/customer/checkout')} className="w-full bg-primary text-white py-4 rounded-xl font-bold flex justify-between items-center px-6 shadow-lg shadow-primary/30 group hover:bg-primary/90 transition-colors">
          <span>متابعة للدفع</span>
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
