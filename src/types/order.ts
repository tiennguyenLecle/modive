import { Database } from './supabase';

export type OrderType = Database['public']['Tables']['orders']['Row'];
