import React from 'react';

const StatusBadge = ({ status, type = 'order' }) => {
  const getStyles = () => {
    if (type === 'order') {
      switch (status) {
        case 'new': return 'bg-blue-100 text-blue-800';
        case 'accepted':
        case 'preparing': return 'bg-yellow-100 text-yellow-800';
        case 'ready_for_pickup': return 'bg-orange-100 text-orange-800';
        case 'picked_up':
        case 'on_the_way': return 'bg-purple-100 text-purple-800';
        case 'delivered': return 'bg-green-100 text-green-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
    
    if (type === 'driver' || type === 'restaurant') {
      switch (status) {
        case 'online':
        case 'open':
        case 'active':
        case 'approved': return 'bg-green-100 text-green-800';
        case 'offline':
        case 'closed':
        case 'inactive': return 'bg-gray-100 text-gray-800';
        case 'busy': return 'bg-orange-100 text-orange-800';
        case 'suspended': return 'bg-red-100 text-red-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }

    if (type === 'ticket') {
      switch (status) {
        case 'open': return 'bg-red-100 text-red-800';
        case 'in_progress': return 'bg-yellow-100 text-yellow-800';
        case 'resolved': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }

    return 'bg-gray-100 text-gray-800';
  };

  const getLabel = () => {
    const labels = {
      new: 'جديد',
      accepted: 'مقبول',
      preparing: 'قيد التجهيز',
      ready_for_pickup: 'جاهز للاستلام',
      picked_up: 'تم الاستلام',
      on_the_way: 'في الطريق',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي',
      online: 'متصل',
      offline: 'غير متصل',
      open: 'مفتوح',
      closed: 'مغلق',
      busy: 'مزدحم',
      active: 'نشط',
      inactive: 'غير نشط',
      approved: 'مقبول',
      suspended: 'موقوف',
      pending: 'قيد المراجعة',
      in_progress: 'جاري العمل',
      resolved: 'محلولة'
    };
    return labels[status] || status;
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStyles()}`}>
      {getLabel()}
    </span>
  );
};

export default StatusBadge;
