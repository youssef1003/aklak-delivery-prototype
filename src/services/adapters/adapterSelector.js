import { storageAdapter as localStorageAdapter } from './localStorageAdapter';
import { supabaseAdapter } from './supabaseAdapter';
import { supabase } from '../supabase/supabaseClient';

const dataSource = import.meta.env.VITE_DATA_SOURCE || 'localStorage';

// Helper to determine the active adapter
export const getActiveAdapter = () => {
  if (dataSource === 'supabase' && supabase !== null) {
    console.log('🔌 Using Supabase Adapter');
    return supabaseAdapter;
  }
  
  if (dataSource === 'supabase' && supabase === null) {
    console.warn('⚠️ Supabase selected but client is missing/invalid. Falling back to LocalStorage Adapter safely.');
  }

  // Default to localStorage
  return localStorageAdapter;
};

// Export the selected adapter instance to be used by the context
export const activeAdapter = getActiveAdapter();
