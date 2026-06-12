import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, CreditCard, Banknote, Wallet, Edit3, Clock, TicketPercent, FileText } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, promoCode, placeOrder, location, applyPromoCode, clearPromoCode } = useDemo();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [deliveryTime, setDeliveryTime] = useState('now');
  const [instructions, setInstructions] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoCode ? (subtotal * promoCode.discountPercent / 100) : 0;
  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput.trim());
    if (success) {
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('كود الخصم غير صحيح');
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    const customer = {
      name: 'أحمد محمود',
      phone: '01012345678',
      address: `15 شارع التحرير، الدقي، ${location.city}، ${location.country === 'EG' ? 'مصر' : 'السعودية'}`,
      instructions,
      deliveryTime
    };

    placeOrder(customer, paymentMethod);
    navigate('/customer/tracking');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-28">
      <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <h1 className="text-lg font-bold text-dark">الدفع والتأكيد</h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        
        {/* Delivery Address */}
        <div>
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-lg font-bold text-dark">عنوان التوصيل</h2>
            <button className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
              <Edit3 size={14} /> تغيير
            </button>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 items-start">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mt-1">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-bold text-dark text-sm mb-1">المنزل</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                15 شارع التحرير، الدقي، {location.city}
              </p>
              <p className="text-dark text-xs font-bold mt-2">01012345678</p>
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div>
          <h2 className="text-lg font-bold text-dark mb-3">وقت التوصيل</h2>
          <div className="flex gap-3">
            <label className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 border rounded-2xl cursor-pointer transition-all ${deliveryTime === 'now' ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-gray-200'}`} onClick={() => setDeliveryTime('now')}>
              <Clock size={24} className={deliveryTime === 'now' ? 'text-primary' : 'text-gray-400'} />
              <span className={`text-sm font-bold ${deliveryTime === 'now' ? 'text-primary' : 'text-gray-600'}`}>الآن</span>
            </label>
            <label className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 border rounded-2xl cursor-pointer transition-all ${deliveryTime === 'scheduled' ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-gray-200'}`} onClick={() => setDeliveryTime('scheduled')}>
              <div className="flex items-center gap-1">
                <Clock size={24} className={deliveryTime === 'scheduled' ? 'text-primary' : 'text-gray-400'} />
                <span className="bg-yellow-100 text-yellow-700 text-[9px] px-1.5 py-0.5 rounded font-bold">جديد</span>
              </div>
              <span className={`text-sm font-bold ${deliveryTime === 'scheduled' ? 'text-primary' : 'text-gray-600'}`}>مجدول</span>
            </label>
          </div>
          {deliveryTime === 'scheduled' && (
            <div className="mt-3 bg-white p-3 rounded-xl border border-gray-200 text-sm flex gap-2">
              <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 outline-none">
                <option>اليوم</option>
                <option>غداً</option>
              </select>
              <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 outline-none">
                <option>14:00 - 15:00</option>
                <option>15:00 - 16:00</option>
                <option>16:00 - 17:00</option>
              </select>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-lg font-bold text-dark mb-3">طريقة الدفع</h2>
          <div className="space-y-3">
            <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => setPaymentMethod('cash')}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Banknote size={20} />
                </div>
                <span className="font-bold text-dark text-sm">الدفع عند الاستلام</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-primary' : 'border-gray-300'}`}>
                {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
              </div>
            </label>

            <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => setPaymentMethod('card')}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <span className="font-bold text-dark text-sm">بطاقة ائتمان / مدى</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-300'}`}>
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
              </div>
            </label>

            <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'wallet' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => setPaymentMethod('wallet')}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <Wallet size={20} />
                </div>
                <div>
                  <span className="font-bold text-dark text-sm block">المحفظة الإلكترونية</span>
                  <span className="text-xs text-gray-500">رصيدك: 120 ج.م</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'wallet' ? 'border-primary' : 'border-gray-300'}`}>
                {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
              </div>
            </label>
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <h2 className="text-lg font-bold text-dark mb-3">كوبون الخصم</h2>
          {!promoCode ? (
            <div className="bg-white p-3 rounded-2xl border border-gray-200 flex gap-2 shadow-sm">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="أدخل الرمز الترويجي (AKLAK10)" 
                  className="w-full bg-gray-50 px-10 py-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary uppercase"
                />
                <TicketPercent size={18} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
              <button onClick={handleApplyPromo} className="bg-dark text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-dark/90 transition-colors">
                تطبيق
              </button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2 text-green-700">
                <TicketPercent size={20} />
                <span className="font-bold text-sm">تم تطبيق الكوبون {promoCode.code}</span>
              </div>
              <button onClick={clearPromoCode} className="text-red-500 text-xs font-bold px-3 py-1 bg-red-50 rounded-lg hover:bg-red-100">
                إزالة
              </button>
            </div>
          )}
          {promoError && <p className="text-red-500 text-xs mt-2 px-2">{promoError}</p>}
        </div>

        {/* Delivery Instructions */}
        <div>
          <h2 className="text-lg font-bold text-dark mb-3">تعليمات التوصيل (اختياري)</h2>
          <div className="relative">
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="مثال: الرجاء ترك الطلب عند الباب، لا تدق الجرس..." 
              rows={2}
              className="w-full bg-white border border-gray-200 px-10 py-3 rounded-2xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none shadow-sm"
            ></textarea>
            <FileText size={18} className="absolute right-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Detailed Bill Summary */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-dark mb-4 border-b border-gray-50 pb-3">ملخص الطلب</h2>
          <div className="space-y-3 mb-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>المجموع الفرعي ({cart.reduce((sum, item) => sum + item.quantity, 0)} عناصر)</span>
              <span>{subtotal} ج.م</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>رسوم التوصيل</span>
              <span>{deliveryFee} ج.م</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium bg-green-50/50 p-2 rounded-lg -mx-2">
                <span>الخصم</span>
                <span>- {discount} ج.م</span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="font-bold text-dark">الإجمالي المطلوب</span>
            <span className="font-black text-xl text-primary">{total} ج.م</span>
          </div>
        </div>

      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-30 pb-safe shadow-[0_-15px_30px_rgba(0,0,0,0.04)]">
        <button 
          onClick={handlePlaceOrder} 
          disabled={cart.length === 0}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 shadow-xl shadow-primary/30 group hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none"
        >
          <span className="text-lg">تأكيد الطلب بـ {total} ج.م</span>
        </button>
      </div>
    </div>
  );
}
