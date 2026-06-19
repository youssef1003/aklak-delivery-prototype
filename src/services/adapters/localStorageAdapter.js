import { migrateStateIfNeeded } from '../../utils/storageVersioning';

const STORAGE_KEY = 'aklak_demo_state';

class LocalStorageAdapter {
  constructor() {
    this.state = this._loadState();
  }

  _loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return migrateStateIfNeeded(parsed);
    } catch (e) {
      console.warn('Failed to parse local storage, resetting to default', e);
      return migrateStateIfNeeded(null);
    }
  }

  _saveState(newState) {
    this.state = newState;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners = this.listeners || [];
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    if (this.listeners) {
      this.listeners.forEach(l => l(this.state));
    }
  }

  getState() {
    return this.state;
  }

  setState(updates) {
    const newState = { ...this.state, ...updates };
    this._saveState(newState);
    return newState;
  }

  resetState() {
    localStorage.removeItem(STORAGE_KEY);
    // Legacy cleanup
    localStorage.removeItem('aklak_demo_cart');
    localStorage.removeItem('aklak_demo_orders');
    localStorage.removeItem('aklak_demo_location');
    localStorage.removeItem('aklak_demo_promoCode');
    localStorage.removeItem('aklak_demo_user');
    localStorage.removeItem('aklak_demo_favorites');
    
    this.state = migrateStateIfNeeded(null);
    this.notifyListeners();
    return this.state;
  }
}

// Export a singleton instance
export const storageAdapter = new LocalStorageAdapter();
