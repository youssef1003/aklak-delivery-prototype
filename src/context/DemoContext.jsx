import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoContext = createContext();

export const useDemo = () => useContext(DemoContext);

export const DemoProvider = ({ children }) => {
  // Try to load from localStorage first
  const loadState = (key, defaultVal) => {
    try {
      const saved = localStorage.getItem(`aklak_demo_${key}`);
      return saved ? JSON.parse(saved) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  };

  const [cart, setCart] = useState(() => loadState('cart', []));
  const [orders, setOrders] = useState(() => loadState('orders', []));
  const [location, setLocation] = useState(() => loadState('location', { country: 'SA', city: 'Riyadh' }));
  const [promoCode, setPromoCode] = useState(() => loadState('promoCode', null));

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('aklak_demo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aklak_demo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aklak_demo_location', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('aklak_demo_promoCode', JSON.stringify(promoCode));
  }, [promoCode]);

  // Cart Functions
  const addToCart = (product, restaurant, quantity = 1) => {
    setCart(prev => {
      // Prevent adding from different restaurants
      if (prev.length > 0 && prev[0].restaurantId !== restaurant.id) {
        if (!window.confirm("سلة المشتريات تحتوي على عناصر من مطعم آخر. هل تريد مسح السلة وإضافة هذا العنصر؟")) {
          return prev;
        }
        return [{ ...product, quantity, restaurantId: restaurant.id, restaurantName: restaurant.name }];
      }

      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, restaurantId: restaurant.id, restaurantName: restaurant.name }];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const clearCart = () => setCart([]);

  const applyPromoCode = (code) => {
    if (code.toUpperCase() === 'AKLAK10') {
      setPromoCode({ code: 'AKLAK10', discountPercent: 10 });
      return true;
    }
    return false;
  };

  const clearPromoCode = () => setPromoCode(null);

  // Order Functions
  const placeOrder = (customerDetails, paymentMethod) => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = promoCode ? (subtotal * promoCode.discountPercent / 100) : 0;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      restaurantId: cart[0].restaurantId,
      restaurantName: cart[0].restaurantName,
      customer: customerDetails,
      items: [...cart],
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
      status: 'New' // New, Accepted, Preparing, Ready, Picked up, On the way, Delivered
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    clearPromoCode();
    return newOrder.id;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const getCustomerOrders = () => orders;
  const getRestaurantOrders = (restaurantId) => orders.filter(o => o.restaurantId === restaurantId);
  const getDriverAvailableOrders = () => orders.filter(o => o.status === 'Ready');

  return (
    <DemoContext.Provider value={{
      cart,
      orders,
      location,
      promoCode,
      setLocation,
      addToCart,
      updateCartQuantity,
      clearCart,
      applyPromoCode,
      clearPromoCode,
      placeOrder,
      updateOrderStatus,
      getCustomerOrders,
      getRestaurantOrders,
      getDriverAvailableOrders
    }}>
      {children}
    </DemoContext.Provider>
  );
};
