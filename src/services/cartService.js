import { storageAdapter } from './adapters/localStorageAdapter';

class CartService {
  getCart() {
    return storageAdapter.getState().cart;
  }

  addToCart(restaurant, meal) {
    const state = storageAdapter.getState();
    const currentCart = state.cart;

    // Check if adding from different restaurant
    if (currentCart.length > 0 && currentCart[0].restaurantId !== restaurant.id) {
      const confirmReset = window.confirm("إضافة منتج من مطعم مختلف ستقوم بمسح السلة الحالية. هل تود الاستمرار؟");
      if (!confirmReset) return currentCart;
      
      const newCart = [{ ...meal, restaurantId: restaurant.id, restaurantName: restaurant.name, quantity: 1 }];
      storageAdapter.setState({ cart: newCart, promoCode: null });
      return newCart;
    }

    // Add or increment
    const existingItemIndex = currentCart.findIndex(item => item.id === meal.id);
    let newCart;
    if (existingItemIndex >= 0) {
      newCart = [...currentCart];
      newCart[existingItemIndex].quantity += 1;
    } else {
      newCart = [...currentCart, { ...meal, restaurantId: restaurant.id, restaurantName: restaurant.name, quantity: 1 }];
    }
    
    storageAdapter.setState({ cart: newCart });
    return newCart;
  }

  updateCartQuantity(mealId, delta) {
    const state = storageAdapter.getState();
    let newCart = state.cart.map(item => {
      if (item.id === mealId) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    storageAdapter.setState({ cart: newCart });
    return newCart;
  }

  clearCart() {
    storageAdapter.setState({ cart: [] });
    return [];
  }

  applyPromoCode(code) {
    if (code.toUpperCase() === 'AKLAK10') {
      const promo = { code: 'AKLAK10', discountPercent: 10 };
      storageAdapter.setState({ promoCode: promo });
      return promo;
    }
    return null;
  }

  clearPromoCode() {
    storageAdapter.setState({ promoCode: null });
  }

  getPromoCode() {
    return storageAdapter.getState().promoCode;
  }
}

export const cartService = new CartService();
