import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';
import { useDemo } from '../../context/DemoContext';

export default function Payouts() {
  const { orders } = useDemo();
  
  // Calculate demo financials based on current completed orders
  const completedOrders = orders.filter(o => ['Completed', 'Delivered'].includes(o.status));
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const commissionRate = 0.15; // 15% demo commission
  const totalCommission = totalRevenue * commissionRate;
  const netPayout = totalRevenue - totalCommission;

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="الأرباح والتحويلات" 
        subtitle="متابعة المبيعات، العمولات، والمبالغ المستحقة للفرع"
        action={{ label: 'تحميل التقرير', icon: <Download size={16} />, onClick: () => alert('جاري التطوير في هذا الديمو') }}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
          <p className="text-gray-500 text-sm font-medium mb-1">إجمالي المبيعات (GMV)</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{totalRevenue.toFixed(2)} <span className="text-lg">ج.م</span></h3>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <TrendingUp size={12} className="text-success" /> من {completedOrders.length} طلبات مكتملة
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
          <p className="text-gray-500 text-sm font-medium mb-1">عمولة منصة أكلك (15%)</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{totalCommission.toFixed(2)} <span className="text-lg">ج.م</span></h3>
          <p className="text-xs text-gray-400 text-red-500">مخصومة من الإجمالي</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-success"></div>
          <p className="text-gray-500 text-sm font-medium mb-1">الأرباح المستحقة</p>
          <h3 className="text-3xl font-bold text-success mb-2">{netPayout.toFixed(2)} <span className="text-lg text-gray-900">ج.م</span></h3>
          <button className="mt-2 text-sm font-bold text-primary hover:underline">طلب تحويل بنكي</button>
        </div>
      </div>

      {/* Payout History Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">سجل التحويلات السابقة</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <Calendar size={14} /> آخر 30 يوم
          </div>
        </div>
        
        <div className="p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
            <DollarSign size={32} />
          </div>
          <h4 className="text-gray-900 font-bold mb-1">لا توجد تحويلات سابقة</h4>
          <p className="text-gray-500 text-sm">سيتم عرض جميع الدفعات المحولة لحسابك البنكي هنا.</p>
        </div>
      </div>
    </div>
  );
}
