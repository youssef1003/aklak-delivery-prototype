import { useState } from 'react';
import { Search, Filter, CheckCircle2, Clock, Check } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function Orders() {
  const { orders, updateOrderStatus } = useDemo();
  const [activeTab, setActiveTab] = useState('active');

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') return ['Preparing', 'Accepted', 'Ready for pickup'].includes(order.status);
    if (activeTab === 'new') return order.status === 'New';
    if (activeTab === 'completed') return ['Completed', 'Delivered'].includes(order.status);
    return true;
  });

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-dark">إدارة الطلبات</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="ابحث برقم الطلب..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Filter size={16} /> تصفية
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'new', label: `جديد (${orders.filter(o => o.status === 'New').length})` },
          { id: 'active', label: `نشط (${orders.filter(o => ['Preparing', 'Accepted', 'Ready for pickup'].includes(o.status)).length})` },
          { id: 'completed', label: 'مكتمل' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-dark'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <span className="font-bold text-dark">{order.id}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                ['Completed', 'Delivered'].includes(order.status) ? 'bg-green-100 text-green-700' :
                order.status === 'Ready for pickup' ? 'bg-yellow-100 text-yellow-700' :
                order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
              }`}>
                {getStatusText(order.status)}
              </span>
            </div>
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">العميل</p>
                  <p className="font-bold text-sm text-dark">{order.customer.name}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">الوقت</p>
                  <p className="font-medium text-sm text-dark flex items-center gap-1 justify-end">
                    <Clock size={14} className="text-primary" /> {new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">الأصناف ({order.items.length})</p>
                <ul className="text-sm text-dark space-y-1 mb-4">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between gap-2">
                      <span><span className="text-gray-400">•</span> {item.name}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                <span className="text-gray-500 text-sm">الإجمالي</span>
                <span className="font-bold text-primary text-lg">{order.total} ج.م</span>
              </div>
            </div>
            
            {/* Action Buttons based on status */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
              {order.status === 'New' && (
                <button onClick={() => updateOrderStatus(order.id, 'Preparing')} className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                  قبول الطلب والتجهيز
                </button>
              )}
              {order.status === 'Accepted' && (
                <button onClick={() => updateOrderStatus(order.id, 'Preparing')} className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                  بدء التجهيز
                </button>
              )}
              {order.status === 'Preparing' && (
                <button onClick={() => updateOrderStatus(order.id, 'Ready for pickup')} className="flex-1 bg-success text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-success/90 transition-colors">
                  <CheckCircle2 size={16} /> جاهز للاستلام
                </button>
              )}
              {['Ready for pickup', 'Picked up', 'On the way'].includes(order.status) && (
                <button disabled className="flex-1 bg-gray-200 text-gray-500 py-2 rounded-lg text-sm font-bold cursor-not-allowed">
                  في الطريق مع المندوب...
                </button>
              )}
              {['Completed', 'Delivered'].includes(order.status) && (
                <button className="flex-1 bg-white border border-gray-200 text-dark py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                  <Check size={16} className="text-success" /> تم التوصيل
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
