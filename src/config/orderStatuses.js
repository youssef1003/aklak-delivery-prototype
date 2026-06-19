export const ORDER_STATUSES = {
  NEW: 'New',
  ACCEPTED: 'Accepted',
  PREPARING: 'Preparing',
  READY: 'Ready for pickup',
  ASSIGNED: 'Assigned to driver',
  PICKED_UP: 'Picked up',
  ON_THE_WAY: 'On the way',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded'
};

export const ORDER_STATUS_LABELS_AR = {
  [ORDER_STATUSES.NEW]: 'جديد',
  [ORDER_STATUSES.ACCEPTED]: 'مقبول',
  [ORDER_STATUSES.PREPARING]: 'جاري التجهيز',
  [ORDER_STATUSES.READY]: 'جاهز للاستلام',
  [ORDER_STATUSES.ASSIGNED]: 'تم التعيين لمندوب',
  [ORDER_STATUSES.PICKED_UP]: 'تم الاستلام',
  [ORDER_STATUSES.ON_THE_WAY]: 'في الطريق',
  [ORDER_STATUSES.DELIVERED]: 'تم التوصيل',
  [ORDER_STATUSES.CANCELLED]: 'ملغي',
  [ORDER_STATUSES.REFUNDED]: 'مسترجع'
};
