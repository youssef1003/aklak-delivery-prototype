import { useState } from 'react';
import { Plus, Tag, Calendar, Edit2, Trash2 } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';
import EmptyState from '../../components/shared/EmptyState';

export default function Offers() {
  // Hardcoded mock data for offers
  const [offers, setOffers] = useState([
    { id: 1, code: 'AKLAK10', discount: '10%', type: 'percentage', status: 'active', expiry: '2026-12-31', usageLimit: 100, used: 45 },
    { id: 2, code: 'FREEDELIVERY', discount: 'توصيل مجاني', type: 'free_delivery', status: 'active', expiry: '2026-07-01', usageLimit: 50, used: 12 },
    { id: 3, code: 'WELCOME50', discount: '50 ج.م', type: 'fixed', status: 'expired', expiry: '2025-12-31', usageLimit: 500, used: 500 }
  ]);

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="العروض والخصومات" 
        subtitle="إنشاء وإدارة كوبونات الخصم والعروض الترويجية"
        action={{ label: 'إنشاء عرض جديد', icon: <Plus size={16} />, onClick: () => alert('جاري التطوير في هذا الديمو') }}
      />

      {offers.length === 0 ? (
        <EmptyState 
          title="لا توجد عروض" 
          message="قم بإنشاء عرض ترويجي جديد لجذب المزيد من العملاء."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-full h-1 ${offer.status === 'active' ? 'bg-success' : 'bg-gray-300'}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${offer.status === 'active' ? 'bg-green-50 text-success' : 'bg-gray-50 text-gray-400'}`}>
                    <Tag size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-lg" dir="ltr">{offer.code}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${offer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {offer.status === 'active' ? 'نشط' : 'منتهي'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                  <button className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">قيمة الخصم</span>
                  <span className="font-bold text-dark">{offer.discount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الاستخدام</span>
                  <span className="font-medium text-dark">{offer.used} / {offer.usageLimit}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-500">ينتهي في</span>
                  <span className="font-medium text-gray-700 flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(offer.expiry).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(offer.used / offer.usageLimit) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
