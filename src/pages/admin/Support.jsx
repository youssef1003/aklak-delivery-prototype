import { LifeBuoy, Filter } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';
import StatusBadge from '../../components/shared/StatusBadge';

export default function Support() {
  const tickets = [
    { id: 'T-1001', subject: 'الطلب متأخر جداً', user: 'سارة أحمد', role: 'عميل', status: 'open', priority: 'عالي', date: '2026-06-19 14:30' },
    { id: 'T-1002', subject: 'مشكلة في صرف الأرباح', user: 'يوسف العتيبي', role: 'مندوب', status: 'in_progress', priority: 'متوسط', date: '2026-06-18 09:15' },
    { id: 'T-1003', subject: 'تعديل قائمة الطعام', user: 'برجر كينج', role: 'مطعم', status: 'resolved', priority: 'منخفض', date: '2026-06-15 11:00' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="تذاكر الدعم الفني" 
        subtitle="معالجة شكاوى العملاء والمطاعم والمناديب"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm">الكل (3)</button>
            <button className="px-4 py-2 bg-red-50 border border-red-100 rounded-lg text-sm font-medium text-red-700">مفتوحة (1)</button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50">
            <Filter size={14} /> تصفية
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {tickets.map(ticket => (
            <div key={ticket.id} className="p-4 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  ticket.status === 'open' ? 'bg-red-100 text-red-600' :
                  ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  <LifeBuoy size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{ticket.id}</span>
                    <span className="text-sm font-bold text-gray-900">{ticket.subject}</span>
                  </div>
                  <p className="text-sm text-gray-500">من: <span className="font-medium text-gray-700">{ticket.user}</span> ({ticket.role})</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="text-left hidden md:block">
                  <p className="text-gray-500 text-xs">الأولوية</p>
                  <p className={`font-bold ${ticket.priority === 'عالي' ? 'text-red-600' : 'text-gray-700'}`}>{ticket.priority}</p>
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-gray-500 text-xs">التاريخ</p>
                  <p className="font-medium text-gray-700" dir="ltr">{ticket.date}</p>
                </div>
                <StatusBadge status={ticket.status} type="ticket" />
                <button className="px-4 py-1.5 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-white bg-gray-50 transition-colors">
                  فتح التذكرة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
