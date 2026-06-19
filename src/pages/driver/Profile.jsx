import { useState, useEffect } from 'react';
import { User, Car, ShieldCheck, MapPin } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { storageAdapter } from '../../services/adapters/localStorageAdapter';
import SectionHeader from '../../components/shared/SectionHeader';
import DriverBottomNav from '../../components/shared/DriverBottomNav';

export default function Profile() {
  const { driverProfile, auth } = useDemo();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (driverProfile) {
      setIsOnline(driverProfile.isOnline || false);
    }
  }, [driverProfile]);

  const handleToggleOnline = (e) => {
    const newState = e.target.checked;
    setIsOnline(newState);
    storageAdapter.setState({ 
      driverProfile: { ...driverProfile, isOnline: newState } 
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <div className="p-6 space-y-6 max-w-3xl flex-1">
        <SectionHeader 
          title="الملف الشخصي" 
          subtitle="إدارة حالتك وتفاصيل المركبة"
        />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Online Toggle Card */}
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">حالة العمل</h3>
              <p className="text-gray-500 text-sm">قم بتشغيل حالتك لاستقبال الطلبات الجديدة</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isOnline} 
                onChange={handleToggleOnline} 
                className="sr-only peer" 
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-success"></div>
              <span className={`mr-3 text-sm font-bold ${isOnline ? 'text-success' : 'text-gray-500'}`}>
                {isOnline ? 'متصل (جاهز)' : 'غير متصل'}
              </span>
            </label>
          </div>

          {/* Profile Info */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <User size={18} className="text-primary" /> البيانات الشخصية
              </h4>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">الاسم الكامل</p>
                <p className="font-medium text-gray-900">{auth?.currentUser?.name || 'كابتن تجريبي'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">البريد الإلكتروني</p>
                <p className="font-medium text-gray-900" dir="ltr">{auth?.currentUser?.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">رقم الهاتف</p>
                <p className="font-medium text-gray-900" dir="ltr">+20 100 123 4567</p>
              </div>

              <div className="bg-green-50 text-green-700 p-3 rounded-xl flex items-center gap-2 text-sm mt-4">
                <ShieldCheck size={18} /> تم التحقق من الهوية
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <Car size={18} className="text-primary" /> تفاصيل المركبة
              </h4>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">نوع المركبة</p>
                <p className="font-medium text-gray-900">دراجة نارية (موتوسيكل)</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">رقم اللوحة</p>
                <p className="font-medium text-gray-900 bg-gray-100 inline-block px-3 py-1 rounded">أ ب ت 1234</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">منطقة العمل المفضلة</p>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <MapPin size={16} className="text-gray-400" /> مدينة نصر، القاهرة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DriverBottomNav />
    </div>
  );
}
