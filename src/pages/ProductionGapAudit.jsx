import React from 'react';
import { useDemo } from '../context/DemoContext';
import { CheckCircle, Circle, AlertTriangle } from 'lucide-react';

const AuditSection = ({ title, items }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4 border-b pb-2">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          {item.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />}
          {item.status === 'pending' && <Circle className="h-5 w-5 text-gray-300 mt-0.5 ml-2 flex-shrink-0" />}
          {item.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 ml-2 flex-shrink-0" />}
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const ProductionGapAudit = () => {
  const { auth } = useDemo();
  
  if (!auth.isAuthenticated || auth.currentRole !== 'admin') {
    return <div className="p-8 text-center text-red-500">غير مصرح لك بالوصول. هذا التقرير مخصص لمدير النظام فقط.</div>;
  }

  const customerAudit = [
    { name: 'Onboarding Flow', desc: 'Welcome screens, location permission request', status: 'pending' },
    { name: 'Location Pinning', desc: 'Map picker for exact delivery address', status: 'pending' },
    { name: 'Cart & Checkout', desc: 'Current flows work, needs real payment gateway', status: 'warning' },
    { name: 'Live Tracking', desc: 'Needs real GPS integration with Driver app', status: 'warning' },
    { name: 'Order History', desc: 'Currently functional via mock', status: 'done' },
    { name: 'Favorites & Loyalty', desc: 'Currently functional via mock', status: 'done' }
  ];

  const driverAudit = [
    { name: 'Go Online/Offline', desc: 'Toggle availability status', status: 'done' },
    { name: 'Available Orders Map', desc: 'Show orders near the driver', status: 'warning' },
    { name: 'Active Delivery Steps', desc: 'Navigate to restaurant -> Navigate to customer', status: 'warning' },
    { name: 'Earnings Summary', desc: 'Weekly/Daily earnings breakdown', status: 'done' },
    { name: 'Driver Profile', desc: 'Vehicle details, ratings', status: 'done' }
  ];

  const restaurantAudit = [
    { name: 'Live Incoming Orders', desc: 'Push notifications and sound alerts', status: 'warning' },
    { name: 'Menu Management', desc: 'Enable/disable items based on stock', status: 'done' },
    { name: 'Branch Status', desc: 'Open/close branch manually', status: 'done' },
    { name: 'Promotional Offers', desc: 'Create and manage discount codes', status: 'done' },
    { name: 'Daily Reports', desc: 'Sales and popular items', status: 'done' },
    { name: 'Staff Management', desc: 'Add/remove branch staff', status: 'done' }
  ];

  const adminAudit = [
    { name: 'Restaurant Approval', desc: 'Approve new restaurant registrations', status: 'done' },
    { name: 'Suspensions', desc: 'Suspend customers or drivers', status: 'done' },
    { name: 'System Monitoring', desc: 'View all active orders globally', status: 'done' },
    { name: 'Support Tickets', desc: 'Handle customer complaints', status: 'done' },
    { name: 'System Settings', desc: 'Global commission rates and cities', status: 'done' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-extrabold mb-2">تدقيق الفجوات الإنتاجية (Production Gap Audit)</h1>
        <p className="text-gray-600 mb-8">
          هذا التقرير يوضح الميزات المتبقية لتحويل التطبيق من نموذج تجريبي (Demo) إلى منصة إنتاجية حقيقية (Production).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AuditSection title="تطبيق العميل" items={customerAudit} />
          <AuditSection title="تطبيق المندوب" items={driverAudit} />
          <AuditSection title="لوحة تحكم المطعم" items={restaurantAudit} />
          <AuditSection title="لوحة تحكم الإدارة" items={adminAudit} />
        </div>
      </div>
    </div>
  );
};

export default ProductionGapAudit;
