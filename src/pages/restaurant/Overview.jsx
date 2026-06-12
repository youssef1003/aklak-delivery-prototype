import { TrendingUp, ShoppingBag, Clock, Star, DollarSign } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark">نظرة عامة</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <ShoppingBag size={24} />
            </div>
            <span className="text-success text-sm font-bold flex items-center gap-1">
              <TrendingUp size={16} /> +12%
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-1">طلبات اليوم</p>
          <h3 className="text-2xl font-bold text-dark">{todayOrders.length}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <span className="text-success text-sm font-bold flex items-center gap-1">
              <TrendingUp size={16} /> +8%
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-1">إيرادات اليوم</p>
          <h3 className="text-2xl font-bold text-dark">{revenue} ج.م</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Clock size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">متوسط وقت التحضير</p>
          <h3 className="text-2xl font-bold text-dark">18 دقيقة</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
              <Star size={24} className="fill-yellow-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">تقييم المطعم</p>
          <h3 className="text-2xl font-bold text-dark">4.8 / 5.0</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Orders Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-dark">الطلبات النشطة</h2>
            <button className="text-primary text-sm font-medium">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-gray-500 bg-gray-50 border-y border-gray-100">
                <tr>
                  <th className="py-3 px-4 font-medium">رقم الطلب</th>
                  <th className="py-3 px-4 font-medium">العميل</th>
                  <th className="py-3 px-4 font-medium">الوقت</th>
                  <th className="py-3 px-4 font-medium">القيمة</th>
                  <th className="py-3 px-4 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-4 px-4 font-bold">#{order.id}</td>
                    <td className="py-4 px-4">{order.customer.name}</td>
                    <td className="py-4 px-4 text-gray-500">{new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="py-4 px-4 font-bold text-primary">{order.total} ج.م</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-dark mb-6">الأكثر مبيعاً اليوم</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60" alt="Item" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-dark">وجبة هارت أتاك</h4>
                <p className="text-xs text-gray-500">45 طلب</p>
              </div>
              <div className="text-primary font-bold text-sm">8,100 ج.م</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60" alt="Item" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-dark">برجر دجاج كلاسيك</h4>
                <p className="text-xs text-gray-500">32 طلب</p>
              </div>
              <div className="text-primary font-bold text-sm">3,840 ج.م</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
