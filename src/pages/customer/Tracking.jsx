import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, MessageCircle, CheckCircle2, Clock, Map, Navigation, Star } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function Tracking() {
  const navigate = useNavigate();
  const { orders } = useDemo();
  
  // Get latest active order, or dummy if none
  const activeOrder = orders.length > 0 ? orders[0] : {
    id: 'ORD-10234',
    status: 'New',
    restaurantName: 'Heart Attack'
  };

  const statusMap = {
    'New': 0,
    'Accepted': 0,
    'Preparing': 1,
    'Ready for pickup': 1,
    'Picked up': 2,
    'On the way': 2,
    'Delivered': 3,
    'Completed': 3
  };

  const currentStep = statusMap[activeOrder.status] || 0;
  
  // Simulated ETA based on status
  const getETA = () => {
    if (currentStep === 3) return 'تم الوصول';
    if (currentStep === 2) return '10 دقائق';
    if (currentStep === 1) return '25 دقيقة';
    return '40 دقيقة';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-10">
      <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/customer/home')} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <h1 className="text-lg font-bold text-dark">تتبع الطلب</h1>
        </div>
        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">#{activeOrder.id}</span>
      </header>

      {/* Map Placeholder */}
      <div className="h-72 bg-gray-200 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="map" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-dark drop-shadow-md z-10">
          <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center mb-3 shadow-lg">
            <Navigation size={32} className="text-primary" />
          </div>
          <p className="font-bold text-lg">تتبع المندوب المباشر</p>
          <p className="text-sm font-medium opacity-80">سيتم تفعيله في النسخة النهائية</p>
        </div>
      </div>

      <main className="flex-1 p-4 -mt-10 relative z-10 space-y-4">
        
        {/* ETA Card */}
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-gray-500 text-sm font-medium mb-1">الوقت المتوقع للوصول</p>
            <p className="font-black text-3xl text-dark">{getETA()}</p>
          </div>
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center relative z-10">
            <Clock size={32} />
          </div>
          <div className="absolute -left-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
            <h2 className="font-bold text-dark text-lg">حالة الطلب</h2>
            <span className="text-sm bg-gray-100 text-dark px-3 py-1 rounded-full font-bold">{activeOrder.status}</span>
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-gray-200 before:to-gray-100">
            
            {/* Step 1 */}
            <div className={`relative flex items-start md:justify-normal md:odd:flex-row-reverse group ${currentStep >= 0 ? 'is-active' : ''}`}>
              <div className={`flex items-center justify-center w-9 h-9 rounded-full border-4 border-white shrink-0 shadow-sm relative z-10 ${currentStep >= 0 ? (currentStep === 0 ? 'bg-primary text-white shadow-primary/40 shadow-lg' : 'bg-success text-white') : 'bg-gray-200 text-gray-400'}`}>
                {currentStep > 0 ? <CheckCircle2 size={18} /> : <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>}
              </div>
              <div className={`w-[calc(100%-2.5rem)] px-4 mt-1 ${currentStep < 0 ? 'opacity-40' : ''}`}>
                <h3 className={`font-bold text-base ${currentStep === 0 ? 'text-primary' : 'text-dark'}`}>تم استلام الطلب</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">المطعم يقوم بمراجعة طلبك وتأكيده.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`relative flex items-start md:justify-normal md:odd:flex-row-reverse group ${currentStep >= 1 ? 'is-active' : ''}`}>
              <div className={`flex items-center justify-center w-9 h-9 rounded-full border-4 border-white shrink-0 shadow-sm relative z-10 ${currentStep >= 1 ? (currentStep === 1 ? 'bg-primary text-white shadow-primary/40 shadow-lg' : 'bg-success text-white') : 'bg-gray-200 text-gray-400'}`}>
                {currentStep > 1 ? <CheckCircle2 size={18} /> : <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>}
              </div>
              <div className={`w-[calc(100%-2.5rem)] px-4 mt-1 ${currentStep < 1 ? 'opacity-40' : ''}`}>
                <h3 className={`font-bold text-base ${currentStep === 1 ? 'text-primary' : 'text-dark'}`}>جاري التجهيز</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">الشيف يقوم بتحضير وجبتك الساخنة الآن.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`relative flex items-start md:justify-normal md:odd:flex-row-reverse group ${currentStep >= 2 ? 'is-active' : ''}`}>
              <div className={`flex items-center justify-center w-9 h-9 rounded-full border-4 border-white shrink-0 shadow-sm relative z-10 ${currentStep >= 2 ? (currentStep === 2 ? 'bg-primary text-white shadow-primary/40 shadow-lg' : 'bg-success text-white') : 'bg-gray-200 text-gray-400'}`}>
                {currentStep > 2 ? <CheckCircle2 size={18} /> : <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>}
              </div>
              <div className={`w-[calc(100%-2.5rem)] px-4 mt-1 ${currentStep < 2 ? 'opacity-40' : ''}`}>
                <h3 className={`font-bold text-base ${currentStep === 2 ? 'text-primary' : 'text-dark'}`}>في الطريق إليك</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">المندوب استلم الطلب وهو في طريقه إليك، يرجى تتبع الخريطة.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`relative flex items-start md:justify-normal md:odd:flex-row-reverse group ${currentStep >= 3 ? 'is-active' : ''}`}>
              <div className={`flex items-center justify-center w-9 h-9 rounded-full border-4 border-white shrink-0 shadow-sm relative z-10 ${currentStep >= 3 ? 'bg-success text-white shadow-success/40 shadow-lg' : 'bg-gray-200 text-gray-400'}`}>
                {currentStep >= 3 ? <CheckCircle2 size={18} /> : <div className="w-3 h-3 bg-white rounded-full"></div>}
              </div>
              <div className={`w-[calc(100%-2.5rem)] px-4 mt-1 ${currentStep < 3 ? 'opacity-40' : ''}`}>
                <h3 className={`font-bold text-base ${currentStep >= 3 ? 'text-success' : 'text-dark'}`}>تم التسليم</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">نتمنى لك وجبة شهية! لا تنسى تقييم المطعم والمندوب.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info - Only show if picked up */}
        {currentStep >= 2 && currentStep < 4 && (
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" alt="Driver" className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Star size={8} className="fill-white" /> 4.9
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5 font-medium">المندوب (كابتن)</p>
                <h2 className="font-bold text-dark text-sm">محمد عبدالله</h2>
                <p className="text-[10px] text-gray-400 mt-0.5">هونداي النترا • أ ب ج ١٢٣</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-gray-50 text-dark rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
                <MessageCircle size={18} />
              </button>
              <button className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors border border-green-100">
                <Phone size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Restaurant Info */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
               <img src={`https://ui-avatars.com/api/?name=${activeOrder.restaurantName || 'Restaurant'}&background=random`} alt="Restaurant" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5 font-medium">الطلب من</p>
              <h2 className="font-bold text-dark text-sm">{activeOrder.restaurantName || 'مطعم ديمو'}</h2>
              <button className="text-[10px] text-primary font-bold mt-1">عرض الفاتورة</button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-gray-50 text-dark rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
              <MessageCircle size={18} />
            </button>
            <button className="w-10 h-10 bg-gray-50 text-dark rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
              <Phone size={18} />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
