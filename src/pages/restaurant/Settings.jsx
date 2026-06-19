import { useState, useEffect } from 'react';
import { Save, Clock, MapPin, Settings as SettingsIcon } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { storageAdapter } from '../../services/adapters/localStorageAdapter';
import SectionHeader from '../../components/shared/SectionHeader';

export default function Settings() {
  const { restaurantSettings } = useDemo();
  const [settings, setSettings] = useState({
    isOpen: true,
    preparationTime: 15,
    minOrderValue: 50,
    deliveryFee: 15,
    address: 'الرياض، المملكة العربية السعودية'
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (restaurantSettings) {
      setSettings(prev => ({ ...prev, ...restaurantSettings }));
    }
  }, [restaurantSettings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    storageAdapter.setState({ restaurantSettings: settings });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <SectionHeader 
        title="إعدادات الفرع" 
        subtitle="تعديل حالة الفرع وأوقات العمل والتجهيز"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${settings.isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <SettingsIcon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-dark">حالة الفرع</h3>
              <p className="text-sm text-gray-500">تحكم في ظهور المطعم للعملاء</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name="isOpen" checked={settings.isOpen} onChange={handleChange} className="sr-only peer" />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-success"></div>
            <span className="mr-3 text-sm font-bold text-gray-900">{settings.isOpen ? 'مفتوح (يستقبل طلبات)' : 'مغلق (لا يستقبل طلبات)'}</span>
          </label>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="font-bold text-dark flex items-center gap-2 mb-4 border-b pb-2">
              <Clock size={18} className="text-primary" /> إعدادات التجهيز والتوصيل
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وقت التجهيز المتوقع (دقيقة)</label>
              <input 
                type="number" 
                name="preparationTime"
                value={settings.preparationTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none" 
              />
              <p className="text-xs text-gray-500 mt-1">يُستخدم لحساب وقت التوصيل للعميل.</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للطلب (ج.م)</label>
                <input 
                  type="number" 
                  name="minOrderValue"
                  value={settings.minOrderValue}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">رسوم التوصيل الافتراضية</label>
                <input 
                  type="number" 
                  name="deliveryFee"
                  value={settings.deliveryFee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-dark flex items-center gap-2 mb-4 border-b pb-2">
              <MapPin size={18} className="text-primary" /> معلومات الفرع
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الفرع</label>
              <textarea 
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows={3} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none resize-none"
              ></textarea>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm flex gap-2">
              <span className="font-bold">ملاحظة ديمو:</span>
              يتم حفظ هذه الإعدادات محلياً في متصفحك للتجربة فقط.
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            إلغاء التغييرات
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-primary/90 transition-colors">
            {isSaved ? 'تم الحفظ بنجاح!' : (
              <>
                <Save size={18} /> حفظ الإعدادات
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
