import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zwttxdbpxuwiqqymtpvk.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_0A6idqmSTF7oGUO9HbudtA_vJqZkPAj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
