import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, Plus, Minus, Tag, ArrowLeft } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, clearCart, promoCode, applyPromoCode, clearPromoCode } = useDemo();
  const [promoInput, setPromoInput] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoCode ? (subtotal * promoCode.discountPercent / 100) : 0;
  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      if (!applyPromoCode(promoInput.trim())) {
        alert('كود الخصم غير صالح. جرب AKLAK10');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <h1 className="text-lg font-bold text-dark">السلة</h1>
        </div>
        {cart.length > 0 && (
          <button onClick={clearCart} className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
            تفريغ
          </button>
        )}
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Restaurant Info */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-lg">
              {cart[0].restaurantName.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">الطلب من</p>
              <h2 className="font-bold text-dark text-sm">{cart[0].restaurantName}</h2>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8">السلة فارغة</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-dark text-sm">{item.name}</h3>
                      <button onClick={() => updateCartQuantity(item.id, 0)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold text-primary text-sm">{item.price * item.quantity} ج.م</p>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-dark hover:bg-gray-100 transition">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded shadow-sm hover:bg-primary/90 transition">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          <button onClick={() => navigate('/customer/home')} className="w-full py-3 flex items-center justify-center gap-2 text-primary font-bold text-sm border border-primary/20 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
            <Plus size={16} />
            إضافة المزيد من الأصناف
          </button>
        </div>

        {/* Promo Code */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <Tag size={20} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              {promoCode ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-success">{promoCode.code} مُطبق!</span>
                  <button onClick={clearPromoCode} className="text-red-500 text-xs hover:underline">إزالة</button>
                </div>
              ) : (
                <input 
                  type="text" 
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="أدخل كود الخصم (جرب AKLAK10)" 
                  className="w-full text-sm outline-none bg-transparent" 
                />
              )}
            </div>
            {!promoCode && (
              <button onClick={handleApplyPromo} className="text-primary font-bold text-sm hover:text-primary/80 transition-colors">تطبيق</button>
            )}
          </div>
        )}

        {/* Bill Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
          <h3 className="font-bold text-dark mb-4">ملخص الطلب</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>المجموع الفرعي</span>
            <span>{subtotal} ج.م</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>رسوم التوصيل</span>
            <span>{deliveryFee} ج.م</span>
          </div>
          {promoCode && (
            <div className="flex justify-between text-sm text-success font-medium">
              <span>خصم كود العرض</span>
              <span>-{discount} ج.م</span>
            </div>
          )}
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="font-bold text-dark">الإجمالي</span>
            <span className="font-bold text-xl text-primary">{total} ج.م</span>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-20 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <button onClick={() => navigate('/customer/checkout')} className="w-full bg-primary text-white py-4 rounded-xl font-bold flex justify-between items-center px-6 shadow-lg shadow-primary/30 group hover:bg-primary/90 transition-colors">
            <span>متابعة للدفع</span>
            <div className="flex items-center gap-3">
              <span>{total} ج.م</span>
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
