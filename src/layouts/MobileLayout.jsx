import { Outlet } from 'react-router-dom';

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-8">
      {/* Mobile-sized container with phone-like frame on desktop */}
      <div className="w-full h-screen md:h-[850px] max-w-[400px] bg-white relative md:rounded-[40px] md:shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden md:border-[8px] border-gray-900">
        {/* Dynamic Island / Notch Placeholder (only visible on md) */}
        <div className="hidden md:block absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-50"></div>
        
        <div className="flex-1 overflow-y-auto hide-scrollbar relative z-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
