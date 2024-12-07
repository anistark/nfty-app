import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hxkmouenhjfqgnzovhuo.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4a21vdWVuaGpmcWduem92aHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjM0OTEsImV4cCI6MjA0OTEzOTQ5MX0.OLqNADngFpKWFWdBwF8Y6Jzp_8ysg30oImPo-JfBQcE";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);