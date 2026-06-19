import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const dataSource = import.meta.env.VITE_DATA_SOURCE || 'localStorage';

let supabase = null;

if (dataSource === 'supabase') {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase mode is enabled (VITE_DATA_SOURCE=supabase) but URL or ANON_KEY is missing. Supabase client will not be initialized.');
  } else {
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey);
      console.log('✅ Supabase client initialized successfully.');
    } catch (error) {
      console.error('❌ Failed to initialize Supabase client:', error);
    }
  }
} else {
  console.log('ℹ️ Running in localStorage mode. Supabase is disabled.');
}

export { supabase };
