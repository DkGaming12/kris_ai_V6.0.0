import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create client if valid URL is provided
let supabase;

try {
  if (supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey && supabaseAnonKey.length > 10) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    // Dummy client with safe fallback
    supabase = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase belum dikonfigurasi.' } }),
        signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase belum dikonfigurasi.' } }),
        signOut: () => Promise.resolve({}),
        updateUser: () => Promise.resolve({ data: null, error: null }),
      }
    };
  }
} catch (err) {
  console.warn('[supabaseClient] Gagal inisialisasi Supabase:', err.message);
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: err.message } }),
      signUp: () => Promise.resolve({ data: null, error: { message: err.message } }),
      signOut: () => Promise.resolve({}),
      updateUser: () => Promise.resolve({ data: null, error: null }),
    }
  };
}

export { supabase };
