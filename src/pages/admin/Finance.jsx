import { TrendingUp, DollarSign, Download, PieChart } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';
import { useDemo } from '../../context/DemoContext';

export default function Finance() {
  const { orders } = useDemo();
  
  // Calculate platform totals
  const completedOrders = orders.filter(o => ['Completed', 'Delivered'].includes(o.status));
  const totalGMV = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const totalPlatformCommission = totalGMV * 0.15; // 15% platform cut
  const totalDriverPayouts = completedOrders.length * 20; // 20 EGP per delivery

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="التقارير المالية والعمولات" 
        subtitle="نظرة عامة على أداء المنصة المالي، إيرادات المطاعم، ومستحقات المناديب"
        action={{ label: 'تصدير CSV', icon: <Download size={16} />, onClick: () => alert('جاري التطوير') }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-1">إجمالي المبيعات (GMV)</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{totalGMV.toFixed(2)} <span className="text-lg">ج.م</span></h3>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <TrendingUp size={12} className="text-success" /> بناءً على {completedOrders.length} طلب مكتمل
          </p>
        </div>

        <div className="bg-primary text-white rounded-2xl p-6 shadow-lg">
          <p className="text-white/80 text-sm font-medium mb-1">أرباح المنصة (العمولة)</p>
          <h3 className="text-3xl font-bold mb-2">{totalPlatformCommission.toFixed(2)} <span className="text-lg">ج.م</span></h3>
          <p className="text-xs text-white/60">بمتوسط نسبة عمولة 15%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-1">إجمالي مستحقات المناديب</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{totalDriverPayouts.toFixed(2)} <span className="text-lg">ج.م</span></h3>
          <p className="text-xs text-gray-400">سيتم تصفيتها نهاية الأسبوع</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart size={18} className="text-primary" /> إعدادات العمولة الافتراضية
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نسبة عمولة المنصة (%)</label>
              <div className="flex gap-2">
                <input type="number" defaultValue={15} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary" />
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold">تحديث</button>
              </div>
              <p className="text-xs text-gray-500 mt-2">سيتم تطبيق هذه النسبة على المطاعم الجديدة المضافة للنظام.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign size={18} className="text-primary" /> طلبات السحب المعلقة
          </h4>
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">لا توجد طلبات سحب معلقة من المطاعم أو المناديب في الوقت الحالي.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
