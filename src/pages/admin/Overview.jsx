import { Users, Store, TrendingUp, DollarSign, Activity, AlertTriangle } from 'lucide-react';

export default function Overview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark">لوحة التحكم العامة</h1>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Store size={24} />
            </div>
            <span className="text-success text-sm font-bold flex items-center gap-1">
              <TrendingUp size={16} /> +5
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-1">المطاعم النشطة</p>
          <h3 className="text-2xl font-bold text-dark">128</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <span className="text-success text-sm font-bold flex items-center gap-1">
              <TrendingUp size={16} /> +120
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-1">العملاء النشطين</p>
          <h3 className="text-2xl font-bold text-dark">15,420</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <span className="text-success text-sm font-bold flex items-center gap-1">
              <TrendingUp size={16} /> +15%
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-1">إجمالي الإيرادات (اليوم)</p>
          <h3 className="text-2xl font-bold text-dark">142,500 ج.م</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <Activity size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">الطلبات الحالية</p>
          <h3 className="text-2xl font-bold text-dark">450</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-dark mb-6">الأداء الجغرافي</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-dark flex items-center gap-2">🇪🇬 مصر</span>
                <span className="text-sm text-gray-500">65% من الإيرادات</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>القاهرة (40%)</span>
                <span>الإسكندرية (15%)</span>
                <span>الجيزة (10%)</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-dark flex items-center gap-2">🇸🇦 السعودية</span>
                <span className="text-sm text-gray-500">35% من الإيرادات</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>الرياض (20%)</span>
                <span>جدة (10%)</span>
                <span>الدمام (5%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problematic Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-dark flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-500" /> طلبات تحتاج تدخل
            </h2>
            <button className="text-primary text-sm font-medium">عرض الكل</button>
          </div>
          <div className="space-y-3">
            <div className="p-3 border border-red-100 bg-red-50/50 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-dark mb-1">#ORD-10982</p>
                <p className="text-xs text-gray-500">تأخير في استلام المندوب (أكثر من 20 دقيقة)</p>
              </div>
              <button className="px-3 py-1.5 bg-white text-dark text-xs font-bold rounded-lg border border-gray-200 shadow-sm">التفاصيل</button>
            </div>
            <div className="p-3 border border-orange-100 bg-orange-50/50 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-dark mb-1">#ORD-10975</p>
                <p className="text-xs text-gray-500">شكوى من العميل (نقص في الطلب)</p>
              </div>
              <button className="px-3 py-1.5 bg-white text-dark text-xs font-bold rounded-lg border border-gray-200 shadow-sm">التفاصيل</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
