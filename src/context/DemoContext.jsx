import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageAdapter } from '../services/adapters/localStorageAdapter';
import { cartService } from '../services/cartService';
import { orderService } from '../services/orderService';
import { userService } from '../services/userService';
import { authService } from '../services/authService';

const DemoContext = createContext();

export const useDemo = () => useContext(DemoContext);

export const DemoProvider = ({ children }) => {
  const [appState, setAppState] = useState(() => storageAdapter.getState());

  useEffect(() => {
    const unsubscribe = storageAdapter.subscribe((newState) => {
      setAppState({ ...newState });
    });
    return () => unsubscribe();
  }, []);

  // Expose exactly the same interface as before, but mapped to services
  const contextValue = {
    auth: appState.auth || { isAuthenticated: false, currentUser: null, currentRole: null },
    cart: appState.cart,
    orders: appState.orders,
    location: appState.location,
    promoCode: appState.promoCode,
    user: appState.user,
    favorites: appState.favorites,
    adminData: appState.adminData || { restaurantsQueue: [], supportTickets: [], systemSettings: {} },
    driverProfile: appState.driverProfile || { isOnline: false, earningsHistory: [] },
    restaurantSettings: appState.restaurantSettings || { isOpen: true, preparationTime: 15 },
    restaurantMenu: appState.restaurantMenu || [],

    login: (email, password) => authService.login(email, password),
    logout: () => authService.logout(),

    setLocation: (newLoc) => userService.setLocation(newLoc),
    
    addToCart: (product, restaurant, quantity = 1) => cartService.addToCart(product, restaurant, quantity),
    updateCartQuantity: (productId, newQuantity) => cartService.updateCartQuantity(productId, newQuantity),
    clearCart: () => cartService.clearCart(),
    applyPromoCode: (code) => cartService.applyPromoCode(code),
    clearPromoCode: () => cartService.clearPromoCode(),
    
    placeOrder: (customerDetails, paymentMethod) => {
      const newOrder = orderService.placeOrder(appState.cart, customerDetails, paymentMethod, appState.promoCode);
      if (newOrder) {
        cartService.clearCart();
        cartService.clearPromoCode();
        return newOrder.id;
      }
      return null;
    },
    
    updateOrderStatus: (orderId, newStatus) => orderService.updateOrderStatus(orderId, newStatus),
    toggleFavorite: (id, type) => userService.toggleFavorite(type, id),
    
    getCustomerOrders: () => orderService.getCustomerOrders(),
    getRestaurantOrders: (restaurantId) => orderService.getRestaurantOrders(restaurantId),
    getDriverAvailableOrders: () => orderService.getDriverAvailableOrders(),
    
    resetDemoData: () => {
      storageAdapter.resetState();
      window.location.href = '/';
    }
  };

  return (
    <DemoContext.Provider value={contextValue}>
      {children}
    </DemoContext.Provider>
  );
};
