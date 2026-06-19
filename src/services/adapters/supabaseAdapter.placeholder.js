// This is a placeholder for the future Supabase adapter.
// It is not currently active and does not import any real backend SDK.

export class SupabaseAdapterPlaceholder {
  constructor() {
    console.log('Supabase Adapter Placeholder initialized. Backend not connected.');
  }

  async getState() {
    return null;
  }

  async setState(updates) {
    return null;
  }
}
