import { supabase } from '../supabase/supabaseClient';
import { isSupabaseAuthEnabled } from './authModeSelector';

/**
 * Service for real Supabase Authentication.
 * Only executes if VITE_AUTH_MODE permits it.
 */

export const supabaseAuthService = {
  
  getSession: async () => {
    if (!isSupabaseAuthEnabled || !supabase) {
      return { data: { session: null }, error: null };
    }
    try {
      const { data, error } = await supabase.auth.getSession();
      return { data, error };
    } catch (error) {
      console.error('Supabase Auth getSession error:', error);
      return { data: { session: null }, error };
    }
  },

  signInWithEmail: async (email, password) => {
    if (!isSupabaseAuthEnabled || !supabase) {
      return { data: null, error: { message: 'Real authentication is disabled.' } };
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  signUpCustomer: async ({ email, password, name, phone }) => {
    if (!isSupabaseAuthEnabled || !supabase) {
      return { data: null, error: { message: 'Registration is disabled.' } };
    }
    try {
      // 1. Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
            role: 'customer' // Custom claim or metadata
          }
        }
      });
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  signOut: async () => {
    if (!isSupabaseAuthEnabled || !supabase) {
      return { error: null };
    }
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  },

  getAuthStatus: () => {
    if (!isSupabaseAuthEnabled) return 'disabled by VITE_AUTH_MODE';
    if (!supabase) return 'disabled (no client)';
    return 'active';
  }

};
