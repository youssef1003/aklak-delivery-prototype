import { Search, User, Filter } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';

export default function Customers() {
  const customers = [
    { id: 'C001', name: 'سارة أحمد', phone: '01000000001', orders: 24, points: 450, status: 'نشط' },
    { id: 'C002', name: 'محمد علي', phone: '01000000002', orders: 3, points: 50, status: 'نشط' },
    { id: 'C003', name: 'عميل وهمي', phone: '01000000003', orders: 0, points: 0, status: 'موقوف' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="إدارة العملاء" 
        subtitle="متابعة بيانات العملاء ونقاط الولاء الخاصة بهم"
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="ابحث عن عميل..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 bg-white">
          <Filter size={16} /> تصفية
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50/80 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">العميل</th>
                <th className="px-6 py-4">رقم الهاتف</th>
                <th className="px-6 py-4">إجمالي الطلبات</th>
                <th className="px-6 py-4">نقاط الولاء</th>
                <th className="px-6 py-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4" dir="ltr">{customer.phone}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{customer.orders} طلب</td>
                  <td className="px-6 py-4 font-bold text-primary">{customer.points} نقطة</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      customer.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
