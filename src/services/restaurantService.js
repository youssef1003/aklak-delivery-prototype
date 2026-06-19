import { orderService } from './orderService';

class RestaurantService {
  getOrders(restaurantId) {
    return orderService.getRestaurantOrders(restaurantId);
  }
  
  updateOrderStatus(orderId, status) {
    return orderService.updateOrderStatus(orderId, status);
  }
}

export const restaurantService = new RestaurantService();
