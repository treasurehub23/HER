import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Export the client exactly as it is so other files can import it and use it
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('🔌 [DATABASE]: Supabase client linked successfully.');