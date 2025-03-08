
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// TODO: Replace with environment variables before production
// These are temporary static credentials for development only
const supabaseUrl = 'https://your-actual-project-url.supabase.co';
const supabaseAnonKey = 'your-actual-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
