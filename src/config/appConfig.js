// App configuration
export const APP_CONFIG = {
  USE_BACKEND: import.meta.env?.VITE_USE_BACKEND === 'true' || false,
  VERSION: '1.0.0',
  SCHEMA_VERSION: 1, // LocalStorage schema version
  CURRENCY: {
    EG: 'ج.م',
    SA: 'ر.س'
  },
  DELIVERY_FEE: 15,
  LOYALTY_POINTS_DIVISOR: 10, // 1 point per 10 currency units
};
