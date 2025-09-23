import { Database } from './supabase';

export type CartItem = Database['public']['Tables']['cart_items']['Row'];

export type CartType = Database['public']['Tables']['carts']['Row'];
