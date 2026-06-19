/**
 * Determines the current authentication mode based on the environment variable VITE_AUTH_MODE.
 * Supported modes: 'demo', 'supabase', 'hybrid'
 * Default: 'demo'
 */

const getAuthMode = () => {
  const mode = import.meta.env.VITE_AUTH_MODE;
  if (!mode) return 'demo';

  const validModes = ['demo', 'supabase', 'hybrid'];
  if (validModes.includes(mode)) {
    // Safety check: if mode is supabase or hybrid, we technically need Supabase keys.
    // However, we shouldn't crash if they are missing, the services should handle it gracefully.
    return mode;
  }
  
  console.warn(`Invalid VITE_AUTH_MODE "${mode}" detected. Falling back to "demo".`);
  return 'demo';
};

export const currentAuthMode = getAuthMode();

export const isDemoAuthEnabled = currentAuthMode === 'demo' || currentAuthMode === 'hybrid';
export const isSupabaseAuthEnabled = currentAuthMode === 'supabase' || currentAuthMode === 'hybrid';
