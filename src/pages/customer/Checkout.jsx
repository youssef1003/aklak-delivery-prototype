import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, CreditCard, Banknote, Wallet, Edit3, ArrowLeft } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, promoCode, placeOrder, location } = useDemo();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoCode ? (subtotal * promoCode.discountPercent / 100) : 0;
  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    // Mock customer info based on location
    const customer = {
      name: 'أحمد محمود',
      phone: '01012345678',
      address: `15 شارع التحرير، الدقي، ${location.city}، ${location.country === 'EG' ? 'مصر' : 'السعودية'}`
    };

    placeOrder(customer, paymentMethod);
    navigate('/customer/tracking');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full">
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
            <button className="text-primary text-sm font-medium flex items-center gap-1">
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
              <p className="text-dark text-xs font-medium mt-2">رقم الهاتف: 01012345678</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-lg font-bold text-dark mb-3">طريقة الدفع</h2>
          <div className="space-y-3">
            <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => setPaymentMethod('cash')}>
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

            <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => setPaymentMethod('card')}>
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

            <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => setPaymentMethod('wallet')}>
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

        {/* Bill Summary Minimized */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm mb-1">الإجمالي المطلوب</p>
            <p className="font-bold text-xl text-primary">{total} ج.م</p>
          </div>
          <button onClick={() => navigate(-1)} className="text-primary text-sm font-medium underline">مراجعة الطلب</button>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-20 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handlePlaceOrder} 
          disabled={cart.length === 0}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-primary/30 group hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <span>تأكيد الطلب</span>
        </button>
      </div>
    </div>
  );
}
