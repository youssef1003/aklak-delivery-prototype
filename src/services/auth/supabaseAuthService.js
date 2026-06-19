import { supabase } from '../supabase/supabaseClient';

/**
 * Skeleton service for real Supabase Authentication.
 * Currently disabled by default. All methods return safe fallbacks.
 */

export const supabaseAuthService = {
  
  getSession: async () => {
    console.warn('supabaseAuthService: getSession called but real auth is not active yet.');
    if (!supabase) return { data: { session: null }, error: null };
    return { data: { session: null }, error: null };
  },

  signInWithEmail: async (email, password) => {
    console.warn('supabaseAuthService: signInWithEmail is disabled.');
    return { data: null, error: { message: 'Real authentication is currently disabled.' } };
  },

  signUpCustomer: async (email, password, userData) => {
    console.warn('supabaseAuthService: signUpCustomer is disabled.');
    return { data: null, error: { message: 'Registration is currently disabled.' } };
  },

  signOut: async () => {
    console.warn('supabaseAuthService: signOut called.');
    if (!supabase) return { error: null };
    return { error: null };
  },

  getCurrentUserProfile: async (userId) => {
    console.warn('supabaseAuthService: getCurrentUserProfile is disabled.');
    return { data: null, error: null };
  },

  getAuthStatus: () => {
    if (!supabase) return 'disabled (no client)';
    return 'initialized (auth features pending)';
  }

};
