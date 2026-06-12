import { Users, Store, DollarSign, Activity, AlertTriangle, HeadphonesIcon } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import StatCard from '../../components/admin/StatCard';

export default function Overview() {
  const { orders } = useDemo();
  const activeOrders = orders.filter(o => ['New', 'Accepted', 'Preparing', 'Ready for pickup', 'Picked up', 'On the way'].includes(o.status));
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-dark tracking-tight">لوحة التحكم العامة</h1>
        <div className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-gray-500 shadow-sm border border-gray-100">
          تحديث مباشر
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="المطاعم النشطة" 
          value="128" 
          icon={<Store size={28} />} 
          trend="up" 
          trendValue="+5" 
          colorClass="bg-blue-600" 
        />
        <StatCard 
          title="العملاء النشطين" 
          value="15,420" 
          icon={<Users size={28} />} 
          trend="up" 
          trendValue="+12%" 
          colorClass="bg-purple-600" 
        />
        <StatCard 
          title="إجمالي الإيرادات (اليوم)" 
          value={`${revenue.toLocaleString()} ج.م`} 
          icon={<DollarSign size={28} />} 
          trend="up" 
          trendValue="+15%" 
          colorClass="bg-green-600" 
        />
        <StatCard 
          title="الطلبات الحالية" 
          value={activeOrders.length.toString()} 
          icon={<Activity size={28} />} 
          trend="down" 
          trendValue="-2" 
          colorClass="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographic Performance */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-dark">الأداء الجغرافي</h2>
            <button className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors">تقرير مفصل</button>
          </div>
          
          <div className="space-y-8">
            <div className="relative">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇪🇬</span>
                  <span className="font-bold text-lg text-dark">مصر</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-dark block">65%</span>
                  <span className="text-xs text-gray-500 font-medium">من إجمالي الإيرادات</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-3 font-medium">
                <span className="bg-gray-50 px-3 py-1 rounded-md">القاهرة (40%)</span>
                <span className="bg-gray-50 px-3 py-1 rounded-md">الإسكندرية (15%)</span>
                <span className="bg-gray-50 px-3 py-1 rounded-md">الجيزة (10%)</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇸🇦</span>
                  <span className="font-bold text-lg text-dark">السعودية</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-dark block">35%</span>
                  <span className="text-xs text-gray-500 font-medium">من إجمالي الإيرادات</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: '35%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-3 font-medium">
                <span className="bg-gray-50 px-3 py-1 rounded-md">الرياض (20%)</span>
                <span className="bg-gray-50 px-3 py-1 rounded-md">جدة (10%)</span>
                <span className="bg-gray-50 px-3 py-1 rounded-md">الدمام (5%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="space-y-6 lg:col-span-1">
          {/* Problematic Orders */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-dark flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500" /> طلبات معلقة
              </h2>
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-red-100 bg-red-50/50 rounded-2xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-black text-dark">#ORD-10982</p>
                  <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-md">عاجل</span>
                </div>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">تأخير في استلام المندوب (أكثر من 20 دقيقة)</p>
                <button className="w-full py-2 bg-white text-dark text-xs font-bold rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">متابعة الطلب</button>
              </div>
            </div>
          </div>

          {/* Support Tickets */}
          <div className="bg-dark rounded-3xl shadow-lg shadow-black/10 p-6 text-white relative overflow-hidden">
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-center mb-5 relative z-10">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <HeadphonesIcon size={20} className="text-primary" /> تذاكر الدعم
              </h2>
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg">3 جديدة</span>
            </div>
            <div className="space-y-3 relative z-10">
              <div className="p-3 bg-white/10 border border-white/10 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm mb-0.5">شكوى تأخير</p>
                  <p className="text-[10px] text-gray-400">العميل: أحمد محمود</p>
                </div>
                <button className="px-3 py-1.5 bg-white text-dark text-[10px] font-bold rounded-lg hover:bg-gray-100 transition-colors">رد</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
