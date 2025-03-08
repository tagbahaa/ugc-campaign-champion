
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// For development purposes, we'll use mock data instead of trying to connect to Supabase
// In production, replace these with actual environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dtuyoxjtauhggpezkpkn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dXlveGp0YXVoZ2dwZXprcGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNTI5NjUsImV4cCI6MjA1NjkyODk2NX0.8Wzh9jyQXOxR7cUj-RJeS6VuHbAE9giXZBP4xeDODy8';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
