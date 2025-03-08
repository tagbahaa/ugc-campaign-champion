
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// For development purposes, we'll use mock data instead of trying to connect to Supabase
// In production, replace these with actual environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
