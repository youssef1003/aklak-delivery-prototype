import { storageAdapter } from './adapters/localStorageAdapter';
import { calculateOrderTotal } from '../utils/formatters';
import { ORDER_STATUSES } from '../config/orderStatuses';
import { APP_CONFIG } from '../config/appConfig';

class OrderService {
  getOrders() {
    return storageAdapter.getState().orders;
  }

  placeOrder(cart, customerDetails, paymentMethod, promoCode) {
    if (!cart || cart.length === 0) return null;

    const { subtotal, discount, deliveryFee, total } = calculateOrderTotal(cart, APP_CONFIG.DELIVERY_FEE, promoCode);

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
      status: ORDER_STATUSES.NEW,
      pointsAwarded: false
    };

    const state = storageAdapter.getState();
    storageAdapter.setState({
      orders: [newOrder, ...state.orders]
    });

    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const state = storageAdapter.getState();
    let pointsToAward = 0;
    
    const newOrders = state.orders.map(o => {
      if (o.id === orderId) {
        const updatedOrder = { ...o, status: newStatus };
        
        // Award points if delivered and not already awarded
        if (newStatus === ORDER_STATUSES.DELIVERED && !o.pointsAwarded) {
          updatedOrder.pointsAwarded = true;
          pointsToAward = Math.floor(o.total / APP_CONFIG.LOYALTY_POINTS_DIVISOR);
        }
        
        return updatedOrder;
      }
      return o;
    });

    let updates = { orders: newOrders };

    if (pointsToAward > 0) {
      const user = state.user;
      updates.user = { ...user, points: (user.points || 0) + pointsToAward };
    }

    storageAdapter.setState(updates);
    return newOrders;
  }

  getCustomerOrders() {
    return this.getOrders();
  }

  getRestaurantOrders(restaurantId) {
    return this.getOrders().filter(o => o.restaurantId === restaurantId);
  }

  getDriverAvailableOrders() {
    return this.getOrders().filter(o => o.status === ORDER_STATUSES.READY);
  }
}

export const orderService = new OrderService();
