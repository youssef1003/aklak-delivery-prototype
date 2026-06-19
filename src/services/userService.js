import { storageAdapter } from './adapters/localStorageAdapter';

class UserService {
  getUser() {
    return storageAdapter.getState().user;
  }

  getLocation() {
    return storageAdapter.getState().location;
  }

  setLocation(newLocation) {
    storageAdapter.setState({ location: newLocation });
    return newLocation;
  }

  getFavorites() {
    return storageAdapter.getState().favorites;
  }

  toggleFavorite(type, id) {
    const state = storageAdapter.getState();
    const currentFavorites = { ...state.favorites };
    
    if (type === 'restaurant') {
      if (currentFavorites.restaurants.includes(id)) {
        currentFavorites.restaurants = currentFavorites.restaurants.filter(rId => rId !== id);
      } else {
        currentFavorites.restaurants.push(id);
      }
    } else if (type === 'meal') {
      if (currentFavorites.meals.includes(id)) {
        currentFavorites.meals = currentFavorites.meals.filter(mId => mId !== id);
      } else {
        currentFavorites.meals.push(id);
      }
    }

    storageAdapter.setState({ favorites: currentFavorites });
    return currentFavorites;
  }
}

export const userService = new UserService();
