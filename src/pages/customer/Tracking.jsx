import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, MessageCircle, MapPin, CheckCircle2, Clock, Map } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function Tracking() {
  const navigate = useNavigate();
  const { orders } = useDemo();
  
  // Get latest order for tracking, or dummy if none
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
    'Delivered': 3
  };

  const currentStep = statusMap[activeOrder.status] || 0;
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/customer/home')} className="p-2 hover:bg-gray-50 rounded-full">
            <ChevronLeft size={24} className="text-dark" />
          </button>
          <h1 className="text-lg font-bold text-dark">تتبع الطلب</h1>
        </div>
        <span className="text-sm font-bold text-primary">#{activeOrder.id}</span>
      </header>

      {/* Map Placeholder */}
      <div className="h-64 bg-gray-200 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
          <Map size={48} className="mb-2 text-gray-400" />
          <p className="font-medium">خريطة التتبع المباشر</p>
          <p className="text-xs">سيتم تفعيلها في النسخة النهائية</p>
        </div>
        {/* Fake Map Route Line */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,90 Q40,40 90,10" fill="none" stroke="#FF6B00" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>

      <main className="flex-1 p-4 -mt-6 relative z-10 space-y-4">
        {/* ETA Card */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm mb-1">الوقت المتوقع للوصول</p>
            <p className="font-bold text-2xl text-dark">11:30 ص</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <Clock size={24} />
          </div>
        </div>

          {/* Timeline */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-dark mb-6">حالة الطلب: {activeOrder.status}</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {/* Step 1 */}
            <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${currentStep >= 0 ? 'is-active' : ''}`}>
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shrink-0 shadow-sm ${currentStep >= 0 ? (currentStep === 0 ? 'bg-primary text-white shadow-primary/30 animate-pulse' : 'bg-success text-white') : 'bg-gray-200 text-gray-400'}`}>
                {currentStep > 0 ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div className={`w-[calc(100%-2.5rem)] px-4 ${currentStep < 0 ? 'opacity-50' : ''}`}>
                <h3 className={`font-bold text-sm ${currentStep === 0 ? 'text-primary' : 'text-dark'}`}>تم استلام الطلب</h3>
                <p className="text-xs text-gray-500 mt-1">المطعم يقوم بمراجعة طلبك</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${currentStep >= 1 ? 'is-active' : ''}`}>
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shrink-0 shadow-sm ${currentStep >= 1 ? (currentStep === 1 ? 'bg-primary text-white shadow-primary/30 animate-pulse' : 'bg-success text-white') : 'bg-gray-200 text-gray-400'}`}>
                {currentStep > 1 ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div className={`w-[calc(100%-2.5rem)] px-4 ${currentStep < 1 ? 'opacity-50' : ''}`}>
                <h3 className={`font-bold text-sm ${currentStep === 1 ? 'text-primary' : 'text-dark'}`}>جاري التجهيز</h3>
                <p className="text-xs text-gray-500 mt-1">المطعم يقوم بتحضير طلبك الآن</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${currentStep >= 2 ? 'is-active' : ''}`}>
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shrink-0 shadow-sm ${currentStep >= 2 ? (currentStep === 2 ? 'bg-primary text-white shadow-primary/30 animate-pulse' : 'bg-success text-white') : 'bg-gray-200 text-gray-400'}`}>
                {currentStep > 2 ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div className={`w-[calc(100%-2.5rem)] px-4 ${currentStep < 2 ? 'opacity-50' : ''}`}>
                <h3 className={`font-bold text-sm ${currentStep === 2 ? 'text-primary' : 'text-dark'}`}>في الطريق إليك</h3>
                <p className="text-xs text-gray-500 mt-1">المندوب في طريقه لتسليم الطلب</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${currentStep >= 3 ? 'is-active' : ''}`}>
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shrink-0 shadow-sm ${currentStep >= 3 ? 'bg-success text-white' : 'bg-gray-200 text-gray-400'}`}>
                {currentStep >= 3 ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div className={`w-[calc(100%-2.5rem)] px-4 ${currentStep < 3 ? 'opacity-50' : ''}`}>
                <h3 className={`font-bold text-sm ${currentStep >= 3 ? 'text-success' : 'text-dark'}`}>تم التسليم</h3>
                <p className="text-xs text-gray-500 mt-1">بالهناء والشفاء</p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver/Restaurant Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://ui-avatars.com/api/?name=Heart+Attack&background=random" alt="Restaurant" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="text-xs text-gray-500 mb-1">المطعم</p>
              <h2 className="font-bold text-dark text-sm">{activeOrder.restaurantName || 'Heart Attack'}</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-gray-100 text-dark rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <MessageCircle size={18} />
            </button>
            <button className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors">
              <Phone size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
