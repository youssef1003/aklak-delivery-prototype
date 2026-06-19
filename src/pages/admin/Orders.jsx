import { useDemo } from '../../context/DemoContext';
import { Clock, Eye } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';
import StatusBadge from '../../components/shared/StatusBadge';
import EmptyState from '../../components/shared/EmptyState';

export default function Orders() {
  const { orders } = useDemo();

  const getMappedStatus = (status) => {
    const map = {
      'New': 'new',
      'Accepted': 'accepted',
      'Preparing': 'preparing',
      'Ready for pickup': 'ready_for_pickup',
      'Picked up': 'picked_up',
      'On the way': 'on_the_way',
      'Delivered': 'delivered',
      'Completed': 'delivered',
      'Cancelled': 'cancelled'
    };
    return map[status] || 'new';
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="مراقبة الطلبات" 
        subtitle="عرض مباشر لجميع الطلبات في النظام (Global Monitoring)"
      />

      {(!orders || orders.length === 0) ? (
        <EmptyState 
          title="لا توجد طلبات نشطة" 
          message="لم يتم تسجيل أي طلبات في النظام حتى الآن."
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50/80 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">رقم الطلب</th>
                  <th className="px-6 py-4">العميل</th>
                  <th className="px-6 py-4">المطعم</th>
                  <th className="px-6 py-4">الوقت</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">الإجمالي</th>
                  <th className="px-6 py-4 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice().reverse().map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                    <td className="px-6 py-4">{order.customer?.name || 'عميل تجريبي'}</td>
                    <td className="px-6 py-4">{order.restaurant?.name || 'مطعم تجريبي'}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={getMappedStatus(order.status)} type="order" />
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">{order.total} ج.م</td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-1.5 text-gray-500 hover:text-primary bg-gray-50 hover:bg-primary/10 rounded transition-colors" title="عرض التفاصيل">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
