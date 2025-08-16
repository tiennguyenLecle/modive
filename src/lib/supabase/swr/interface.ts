import { SupabaseClient } from '@supabase/supabase-js';

import { InterfaceType } from '@/types/interface';

export const INTERFACE_KEY = 'interface';

export async function fetchInterface(supabase: SupabaseClient) {
  const { data, error } = await supabase.functions.invoke(
    'interfaces/get-latest'
  );
  if (error) throw error;
  return data as InterfaceType;
}
