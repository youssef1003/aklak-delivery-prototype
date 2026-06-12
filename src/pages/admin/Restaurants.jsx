import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Star } from 'lucide-react';
import { MOCK_RESTAURANTS } from '../../data/mockData';

export default function Restaurants() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-dark">إدارة المطاعم</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="ابحث عن مطعم..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm shadow-primary/30 hover:bg-primary/90 transition-colors">
            <Plus size={16} /> إضافة مطعم
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-gray-500 bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 font-medium">المطعم</th>
                <th className="py-4 px-6 font-medium">الموقع</th>
                <th className="py-4 px-6 font-medium">التقييم</th>
                <th className="py-4 px-6 font-medium">حالة التشغيل</th>
                <th className="py-4 px-6 font-medium">العمولة</th>
                <th className="py-4 px-6 font-medium text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RESTAURANTS.map(restaurant => (
                <tr key={restaurant.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={restaurant.image} alt={restaurant.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-dark">{restaurant.name}</p>
                        <p className="text-xs text-gray-500">{restaurant.tags.join(' • ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-dark font-medium">{restaurant.city}</p>
                    <p className="text-xs text-gray-500">{restaurant.country}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1 font-bold text-dark">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" /> {restaurant.rating}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">نشط</span>
                  </td>
                  <td className="py-4 px-6 font-medium">12%</td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-gray-400 hover:text-dark transition-colors p-1">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>إظهار 1 إلى 6 من 128 مطعم</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>السابق</button>
            <button className="px-3 py-1 border border-primary bg-primary text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">التالي</button>
          </div>
        </div>
      </div>
    </div>
  );
}
