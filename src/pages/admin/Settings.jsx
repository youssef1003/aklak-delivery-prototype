import { useState } from 'react';
import { Settings as SettingsIcon, Globe, Map, ShieldAlert, Save, Database, CheckCircle2, Info } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';

export default function Settings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    demoModeActive: true,
    defaultDeliveryFee: 15,
    minOrderAmount: 30,
    activeCountries: ['مصر', 'السعودية']
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <SectionHeader 
        title="إعدادات النظام" 
        subtitle="التحكم في المتغيرات العامة وقواعد المنصة"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Important Warning */}
        <div className="bg-amber-50 border-b border-amber-200 p-4 flex gap-3">
          <ShieldAlert size={24} className="text-amber-600 shrink-0" />
          <div>
            <h4 className="font-bold text-amber-900 mb-1">تنبيه وضع الديمو</h4>
            <p className="text-amber-800 text-sm">هذه الإعدادات محفوظة حالياً في متصفحك (localStorage). سيتم تفعيل الربط مع Supabase في المراحل القادمة.</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* General Controls */}
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <SettingsIcon size={18} className="text-primary" /> إعدادات عامة
            </h4>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-700 text-sm">وضع الصيانة</p>
                <p className="text-xs text-gray-500">إيقاف استقبال الطلبات في التطبيق</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={settings.maintenanceMode} onChange={() => {}} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-700 text-sm">وضع الديمو (Demo Mode)</p>
                <p className="text-xs text-gray-500">تفعيل الشارات التحذيرية</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={settings.demoModeActive} onChange={() => {}} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Pricing Rules */}
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Globe size={18} className="text-primary" /> القواعد المالية الافتراضية
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رسوم التوصيل الافتراضية (ج.م)</label>
              <input type="number" value={settings.defaultDeliveryFee} readOnly className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 outline-none cursor-not-allowed" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى لقيمة الطلب (ج.م)</label>
              <input type="number" value={settings.minOrderAmount} readOnly className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 outline-none cursor-not-allowed" />
            </div>
          </div>

          {/* Location Settings */}
          <div className="space-y-6 md:col-span-2">
            <h4 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Map size={18} className="text-primary" /> مناطق العمل
            </h4>
            
            <div className="flex gap-2">
              {settings.activeCountries.map((country, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                  {country}
                </span>
              ))}
              <button className="px-3 py-1 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
                + إضافة دولة
              </button>
            </div>
          </div>
          
          {/* Backend & Data Source Settings */}
          <div className="space-y-6 md:col-span-2 mt-4 pt-6 border-t border-gray-100">
            <h4 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Database size={18} className="text-primary" /> حالة قاعدة البيانات والخادم الخلفي
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">مصدر البيانات (DATA_SOURCE)</p>
                <p className="font-bold text-gray-900">{import.meta.env.VITE_DATA_SOURCE || 'localStorage'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">رابط Supabase (URL)</p>
                <p className="font-bold text-gray-900">{import.meta.env.VITE_SUPABASE_URL ? 'تمت الإضافة ✅' : 'مفقود ❌'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">حالة العميل (Client)</p>
                <p className="font-bold text-gray-900">
                  {(import.meta.env.VITE_DATA_SOURCE === 'supabase' && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) 
                    ? 'متصل' 
                    : 'غير متصل (Local Fallback)'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">وضع الديمو (Context)</p>
                <p className="font-bold text-success flex items-center gap-1">نشط <CheckCircle2 size={14} /></p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex gap-3 text-blue-800 text-sm">
              <Info size={20} className="shrink-0" />
              <p>يتم حالياً الانتقال التدريجي نحو Supabase. واجهة العميل والمطعم والمندوب تعمل على الـ LocalStorage الافتراضي لضمان استقرار العرض التجريبي.</p>
            </div>

            {/* Diagnostic Test Panel */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <p className="font-bold text-gray-800 text-sm">اختبار الاتصال بالقراءة فقط (Read-Only Pilot)</p>
                <button 
                  onClick={async () => {
                    setSettings(s => ({...s, testLoading: true, testResult: null}));
                    try {
                      const { supabaseAdapter } = await import('../../services/adapters/supabaseAdapter');
                      const restaurants = await supabaseAdapter.getRestaurants();
                      const items = await supabaseAdapter.getMenuItems();
                      setSettings(s => ({
                        ...s, 
                        testLoading: false, 
                        testResult: `نجاح! تم جلب ${restaurants.length} مطعم و ${items.length} صنف من Supabase.`
                      }));
                    } catch (err) {
                      setSettings(s => ({
                        ...s, 
                        testLoading: false, 
                        testResult: 'فشل الاتصال: يرجى التأكد من المفاتيح.'
                      }));
                    }
                  }}
                  disabled={settings.testLoading || import.meta.env.VITE_DATA_SOURCE !== 'supabase'}
                  className="px-4 py-1.5 bg-gray-800 text-white text-xs rounded shadow hover:bg-gray-700 disabled:opacity-50"
                >
                  {settings.testLoading ? 'جاري الفحص...' : 'بدء الفحص السريع'}
                </button>
              </div>
              {settings.testResult && (
                <div className="p-3 bg-white border border-gray-200 rounded text-sm text-gray-700 font-medium">
                  {settings.testResult}
                </div>
              )}
              {import.meta.env.VITE_DATA_SOURCE !== 'supabase' && !settings.testResult && (
                <p className="text-xs text-gray-500">يتطلب الفحص تغيير VITE_DATA_SOURCE إلى supabase أولاً.</p>
              )}
            </div>

          </div>

          
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-primary/90 transition-colors opacity-50 cursor-not-allowed">
            <Save size={18} /> حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}
