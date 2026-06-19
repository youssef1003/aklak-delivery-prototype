import { APP_CONFIG } from '../config/appConfig';

export const migrateStateIfNeeded = (state) => {
  // If no state or no version, it's a legacy or clean state
  if (!state || typeof state !== 'object') {
    return {
      cart: [],
      orders: [],
      location: { country: 'SA', city: 'Riyadh' },
      promoCode: null,
      user: { name: 'أحمد محمد', phone: '+20 123 456 7890', points: 0 },
      favorites: { restaurants: [], meals: [] },
      _version: APP_CONFIG.SCHEMA_VERSION
    };
  }

  // If state exists but lacks version or is an older version
  let migratedState = { ...state };
  if (!migratedState._version || migratedState._version < APP_CONFIG.SCHEMA_VERSION) {
    console.log(`Migrating state from version ${migratedState._version || 0} to ${APP_CONFIG.SCHEMA_VERSION}`);
    
    // Ensure all base structures exist
    migratedState.cart = migratedState.cart || [];
    migratedState.orders = migratedState.orders || [];
    migratedState.location = migratedState.location || { country: 'SA', city: 'Riyadh' };
    migratedState.promoCode = migratedState.promoCode || null;
    migratedState.user = migratedState.user || { name: 'أحمد محمد', phone: '+20 123 456 7890', points: 0 };
    migratedState.favorites = migratedState.favorites || { restaurants: [], meals: [] };

    // Migrate orders to ensure required fields
    if (Array.isArray(migratedState.orders)) {
      migratedState.orders = migratedState.orders.map(order => ({
        ...order,
        pointsAwarded: order.pointsAwarded || false,
      }));
    }

    migratedState._version = APP_CONFIG.SCHEMA_VERSION;
  }

  return migratedState;
};
