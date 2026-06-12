import React, { useState } from 'react';

const DemoBadge = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="fixed bottom-4 left-4 z-50 bg-amber-500 text-white px-3 py-1.5 rounded-full shadow-lg font-bold text-xs cursor-pointer hover:bg-amber-600 transition-colors flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        وضع تجريبي
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl relative" dir="rtl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-2">عن الوضع التجريبي</h3>
            <ul className="space-y-3 text-sm text-gray-600 mt-4">
              <li className="flex gap-2">
                <span className="text-amber-500">✓</span>
                البيانات تُحفظ محلياً (Local Storage) لأغراض العرض فقط.
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500">✓</span>
                لا توجد مدفوعات حقيقية أو ارتباط ببوابات دفع.
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500">✓</span>
                لا يوجد تتبع حقيقي عبر الـ GPS.
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500">✓</span>
                الطلبات وهمية ولا يتم إرسالها لأي مطعم حقيقي.
              </li>
            </ul>
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              حسناً، فهمت
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoBadge;
