import { Database } from './supabase';

export type CoinPackageType =
  Database['public']['Tables']['coin_packages']['Row'];
