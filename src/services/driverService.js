import { orderService } from './orderService';

class DriverService {
  getAvailableOrders() {
    return orderService.getDriverAvailableOrders();
  }

  updateOrderStatus(orderId, status) {
    return orderService.updateOrderStatus(orderId, status);
  }
}

export const driverService = new DriverService();
