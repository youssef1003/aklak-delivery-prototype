import { APP_CONFIG } from '../config/appConfig';

export const formatCurrency = (amount, countryCode = 'EG') => {
  const currencySymbol = APP_CONFIG.CURRENCY[countryCode] || APP_CONFIG.CURRENCY['EG'];
  return `${amount} ${currencySymbol}`;
};

export const calculateOrderTotal = (cart, deliveryFee = APP_CONFIG.DELIVERY_FEE, promoCode = null) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoCode ? (subtotal * promoCode.discountPercent / 100) : 0;
  const total = subtotal - discount + deliveryFee;
  return { subtotal, discount, deliveryFee, total };
};
