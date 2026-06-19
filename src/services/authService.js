import { storageAdapter } from './adapters/localStorageAdapter';

const MOCK_USERS = {
  'admin@aklak.demo': {
    id: 'admin-uuid-1',
    email: 'admin@aklak.demo',
    name: 'المدير العام',
    role: 'admin',
    permissions: ['all']
  },
  'customer@aklak.demo': {
    id: 'customer-uuid-2',
    email: 'customer@aklak.demo',
    name: 'أحمد العميل',
    role: 'customer',
    phone: '+966 50 123 4567',
    address: 'الرياض، العليا',
    points: 150
  },
  'driver@aklak.demo': {
    id: 'driver-uuid-3',
    email: 'driver@aklak.demo',
    name: 'سائق التوصيل',
    role: 'driver',
    phone: '+966 50 987 6543',
    vehicle_type: 'Motorcycle',
    availability: 'online',
    earnings: 250.00
  },
  'restaurant@aklak.demo': {
    id: 'restaurant-uuid-4',
    email: 'restaurant@aklak.demo',
    name: 'مدير المطعم',
    role: 'restaurant',
    restaurant_name: 'البيك',
    branch: 'فرع الرياض الرئيسي',
    staff_role: 'manager'
  }
};

class AuthService {
  getAuth() {
    return storageAdapter.getState().auth || { isAuthenticated: false, currentUser: null, currentRole: null };
  }

  login(email, password) {
    if (password !== '123456') {
      return { success: false, error: 'كلمة المرور غير صحيحة (استخدم 123456)' };
    }

    const user = MOCK_USERS[email.toLowerCase()];
    if (!user) {
      return { success: false, error: 'البريد الإلكتروني غير موجود في الديمو' };
    }

    const authState = {
      isAuthenticated: true,
      currentUser: user,
      currentRole: user.role,
      provider: 'demo'
    };

    storageAdapter.setState({ auth: authState });
    return { success: true, user };
  }

  // Used by the local Supabase Pilot to inject real user state
  supabaseLoginSuccess(user, role) {
    const authState = {
      isAuthenticated: true,
      currentUser: { ...user, role: role || 'customer' },
      currentRole: role || 'customer',
      provider: 'supabase'
    };
    storageAdapter.setState({ auth: authState });
  }

  logout() {
    storageAdapter.setState({
      auth: { isAuthenticated: false, currentUser: null, currentRole: null, provider: null }
    });
  }
}

export const authService = new AuthService();
