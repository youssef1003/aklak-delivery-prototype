import { useState } from 'react';
import { Search, Filter, Car, CheckCircle, XCircle } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';
import StatusBadge from '../../components/shared/StatusBadge';

export default function Drivers() {
  const [drivers, setDrivers] = useState([
    { id: 'D001', name: 'يوسف العتيبي', phone: '01011112222', vehicle: 'دراجة نارية', status: 'active', deliveries: 145, rating: 4.8 },
    { id: 'D002', name: 'أحمد محمود', phone: '01122223333', vehicle: 'سيارة', status: 'pending', deliveries: 0, rating: 0 },
    { id: 'D003', name: 'محمود سعد', phone: '01233334444', vehicle: 'دراجة نارية', status: 'suspended', deliveries: 89, rating: 3.2 },
  ]);

  const toggleStatus = (id, currentStatus) => {
    setDrivers(drivers.map(d => {
      if (d.id === id) {
        return { ...d, status: currentStatus === 'active' ? 'suspended' : 'active' };
      }
      return d;
    }));
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="إدارة المندوبين" 
        subtitle="مراجعة واعتماد المناديب الجدد ومتابعة أدائهم"
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="ابحث عن مندوب أو رقم هاتف..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 bg-white">
          <Filter size={16} /> تصفية بالحالة
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50/80 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">المندوب</th>
                <th className="px-6 py-4">رقم الهاتف</th>
                <th className="px-6 py-4">المركبة</th>
                <th className="px-6 py-4">الرحلات (التقييم)</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Car size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{driver.name}</p>
                        <p className="text-xs text-gray-500">{driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900" dir="ltr">{driver.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {driver.vehicle}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{driver.deliveries} رحلة</p>
                    {driver.rating > 0 && <p className="text-xs text-yellow-600">⭐ {driver.rating}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={driver.status} type="driver" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {driver.status === 'pending' ? (
                        <button 
                          onClick={() => toggleStatus(driver.id, 'suspended')}
                          className="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg font-medium transition-colors text-xs flex items-center gap-1"
                        >
                          <CheckCircle size={14} /> اعتماد
                        </button>
                      ) : (
                        <button 
                          onClick={() => toggleStatus(driver.id, driver.status)}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-xs flex items-center gap-1 ${
                            driver.status === 'active' 
                              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                        >
                          {driver.status === 'active' ? (
                            <><XCircle size={14} /> إيقاف</>
                          ) : (
                            <><CheckCircle size={14} /> تفعيل</>
                          )}
                        </button>
                      )}
                    </div>
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
