import { useDemo } from '../../context/DemoContext';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';
import EmptyState from '../../components/shared/EmptyState';
import DriverBottomNav from '../../components/shared/DriverBottomNav';

export default function History() {
  const { orders } = useDemo();
  
  // Filter only completed deliveries for this demo driver
  const completedDeliveries = orders.filter(o => o.status === 'Delivered').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <div className="p-4 space-y-6 flex-1">
        <SectionHeader 
          title="سجل الرحلات" 
          subtitle="جميع الطلبات التي قمت بتوصيلها بنجاح"
        />

        {completedDeliveries.length === 0 ? (
          <EmptyState 
            title="لا يوجد سجل رحلات" 
            message="لم تقم بتوصيل أي طلبات حتى الآن. ابدأ في استقبال الطلبات لزيادة أرباحك!"
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {completedDeliveries.map((order, idx) => (
              <div key={order.id || idx} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">طلب #{order.id}</h4>
                      <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock size={12} /> {new Date(order.createdAt).toLocaleString('ar-EG')}
                      </span>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-primary text-lg">25.00 ج.م</span>
                    <p className="text-xs text-gray-500">أرباح الرحلة</p>
                  </div>
                </div>

                <div className="flex gap-6 mt-4 pt-4 border-t border-gray-50 relative">
                  <div className="absolute top-8 bottom-4 right-2 w-0.5 bg-gray-200"></div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500 mt-1"></div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">نقطة الاستلام</p>
                        <p className="font-medium text-sm text-gray-900 flex items-center gap-1">
                          <MapPin size={14} className="text-blue-500" /> {order.restaurant?.name || 'المطعم'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-4 h-4 rounded-full bg-green-100 border-2 border-success mt-1"></div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">نقطة التسليم</p>
                        <p className="font-medium text-sm text-gray-900 flex items-center gap-1">
                          <MapPin size={14} className="text-success" /> {order.customer?.name || 'العميل'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DriverBottomNav />
    </div>
  );
}
