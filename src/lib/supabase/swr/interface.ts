import { SupabaseClient } from '@supabase/supabase-js';

import { InterfaceType } from '@/types/interface';

export const INTERFACE_KEY = 'interface';

export async function fetchInterface(supabase: SupabaseClient) {
  const { data, error } = await supabase.rpc('get_latest_interface ');
  if (error) throw error;
  return data as InterfaceType;
}
