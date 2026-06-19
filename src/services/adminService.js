import { orderService } from './orderService';

class AdminService {
  getAllOrders() {
    return orderService.getOrders();
  }
}

export const adminService = new AdminService();
