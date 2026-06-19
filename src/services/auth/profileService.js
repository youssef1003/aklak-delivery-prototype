import { supabase } from '../supabase/supabaseClient';
import { isSupabaseAuthEnabled } from './authModeSelector';

export const profileService = {
  /**
   * Fetches the user profile from the `users` table after login.
   * If not found, handles gracefully.
   */
  getUserProfile: async (userId) => {
    if (!isSupabaseAuthEnabled || !supabase) return { data: null, error: null };
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "Results contain 0 rows"
        console.error('profileService: Error fetching profile:', error);
      }
      return { data: data || null, error: error?.code !== 'PGRST116' ? error : null };
    } catch (err) {
      console.error('profileService: Exception fetching profile:', err);
      return { data: null, error: err };
    }
  },

  /**
   * Attempt to create a customer profile if the user just registered.
   */
  createCustomerProfile: async (userId, userData) => {
    if (!isSupabaseAuthEnabled || !supabase) return { data: null, error: null };
    try {
      // 1. Insert into users
      const { data: userRecord, error: userError } = await supabase
        .from('users')
        .insert({
          auth_id: userId,
          full_name: userData.name,
          phone: userData.phone,
          role: 'customer'
        })
        .select()
        .single();

      if (userError) throw userError;

      // 2. Insert into customers
      const { data: customerRecord, error: customerError } = await supabase
        .from('customers')
        .insert({
          user_id: userRecord.id,
          preferences: {}
        });

      if (customerError) {
        console.warn('profileService: Could not insert customer record (maybe RLS issue).', customerError);
      }

      return { data: userRecord, error: null };
    } catch (err) {
      console.error('profileService: Error creating customer profile:', err);
      return { data: null, error: err };
    }
  }
};
