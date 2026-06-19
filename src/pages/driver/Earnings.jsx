import { Wallet, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';
import EmptyState from '../../components/shared/EmptyState';
import DriverBottomNav from '../../components/shared/DriverBottomNav';
import { useDemo } from '../../context/DemoContext';

export default function Earnings() {
  const { orders } = useDemo();
  
  // Calculate demo driver earnings
  const completedDeliveries = orders.filter(o => o.status === 'Delivered');
  const totalDeliveriesCount = completedDeliveries.length;
  // Assume a fixed 20 EGP delivery fee + 5 EGP bonus for demo purposes
  const totalEarnings = completedDeliveries.reduce(() => 20 + 5, 0) * totalDeliveriesCount; 
  
  const weeklyTarget = 50;
  const progress = Math.min((totalDeliveriesCount / weeklyTarget) * 100, 100);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <div className="p-4 space-y-6 flex-1">
        <SectionHeader 
          title="المحفظة والأرباح" 
          subtitle="متابعة أرباح التوصيل والمكافآت"
        />

        {/* Main Balance Card */}
        <div className="bg-primary rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-white/10">
            <Wallet size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-primary-foreground/80 font-medium mb-2">الرصيد المتاح للسحب</p>
            <h2 className="text-4xl font-bold mb-4">{totalEarnings.toFixed(2)} <span className="text-xl">ج.م</span></h2>
            <button className="bg-white text-primary px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">
              سحب الأرباح
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> إحصائيات هذا الأسبوع
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-500">الرحلات المكتملة</span>
                <span className="font-bold text-gray-900 text-lg">{totalDeliveriesCount}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-500">أرباح التوصيل</span>
                <span className="font-bold text-gray-900">{(totalDeliveriesCount * 20).toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <span className="text-gray-500">البقشيش والمكافآت</span>
                <span className="font-bold text-success">{(totalDeliveriesCount * 5).toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-gray-900">الإجمالي</span>
                <span className="font-bold text-primary text-xl">{totalEarnings.toFixed(2)} ج.م</span>
              </div>
            </div>
          </div>

          {/* Bonus Progress Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">مكافأة الأسبوع</h3>
            <p className="text-gray-500 text-sm mb-6">أكمل {weeklyTarget} رحلة هذا الأسبوع واحصل على مكافأة 200 ج.م إضافية!</p>
            
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span className="text-primary">{totalDeliveriesCount} رحلة</span>
              <span className="text-gray-400">{weeklyTarget} رحلة</span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
              <div className="bg-primary h-3 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800 text-sm">
              <AlertCircle size={20} className="shrink-0" />
              <p>المكافآت تُضاف تلقائياً لرصيدك عند إتمام الهدف الأسبوعي وتُصرف مع الدورة المالية.</p>
            </div>
          </div>
        </div>
      </div>
      <DriverBottomNav />
    </div>
  );
}
