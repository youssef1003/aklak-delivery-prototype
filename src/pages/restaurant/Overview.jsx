import { TrendingUp, ShoppingBag, Clock, Star, DollarSign } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import StatCard from '../../components/admin/StatCard'; // Reuse StatCard for consistency

export default function Overview() {
  const { orders } = useDemo();
  
  const todayOrders = orders; // Simplified for demo
  const revenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

  const getStatusText = (status) => {
    const map = {
      'New': 'جديد',
      'Accepted': 'تم القبول',
      'Preparing': 'جاري التجهيز',
      'Ready for pickup': 'في انتظار المندوب',
      'Picked up': 'في الطريق',
      'On the way': 'في الطريق',
      'Delivered': 'مكتمل',
      'Completed': 'مكتمل'
    };
    return map[status] || status;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-dark tracking-tight">نظرة عامة على المطعم</h1>
        <div className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-gray-500 shadow-sm border border-gray-100">
          تحديث مباشر
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="طلبات اليوم" 
          value={todayOrders.length.toString()} 
          icon={<ShoppingBag size={28} />} 
          trend="up" 
          trendValue="+12%" 
          colorClass="bg-primary" 
        />
        <StatCard 
          title="إيرادات اليوم" 
          value={`${revenue.toLocaleString()} ج.م`} 
          icon={<DollarSign size={28} />} 
          trend="up" 
          trendValue="+8%" 
          colorClass="bg-green-600" 
        />
        <StatCard 
          title="متوسط وقت التحضير" 
          value="18 دقيقة" 
          icon={<Clock size={28} />} 
          colorClass="bg-blue-600" 
        />
        <StatCard 
          title="تقييم المطعم" 
          value="4.8 / 5.0" 
          icon={<Star size={28} className="fill-white" />} 
          colorClass="bg-yellow-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Orders Widget */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-dark">الطلبات النشطة</h2>
            <button className="text-primary text-sm font-bold bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-gray-500 bg-gray-50/50">
                <tr>
                  <th className="py-4 px-4 font-bold rounded-r-xl">رقم الطلب</th>
                  <th className="py-4 px-4 font-bold">العميل</th>
                  <th className="py-4 px-4 font-bold">الوقت</th>
                  <th className="py-4 px-4 font-bold">القيمة</th>
                  <th className="py-4 px-4 font-bold rounded-l-xl">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-black text-dark">#{order.id}</td>
                    <td className="py-4 px-4 font-medium">{order.customer.name}</td>
                    <td className="py-4 px-4 text-gray-500 font-medium">{new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="py-4 px-4 font-black text-primary">{order.total} ج.م</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        ['Completed', 'Delivered'].includes(order.status) ? 'bg-green-100 text-green-700' :
                        order.status === 'Ready for pickup' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Sellers Widget */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-dark mb-6">الأكثر مبيعاً اليوم</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <img src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60" alt="Item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-dark mb-1 group-hover:text-primary transition-colors">وجبة هارت أتاك</h4>
                <p className="text-xs text-gray-500 font-medium">45 طلب</p>
              </div>
              <div className="text-primary font-black text-sm bg-primary/5 px-3 py-1.5 rounded-lg">8,100 ج.م</div>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60" alt="Item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-dark mb-1 group-hover:text-primary transition-colors">برجر دجاج كلاسيك</h4>
                <p className="text-xs text-gray-500 font-medium">32 طلب</p>
              </div>
              <div className="text-primary font-black text-sm bg-primary/5 px-3 py-1.5 rounded-lg">3,840 ج.م</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
