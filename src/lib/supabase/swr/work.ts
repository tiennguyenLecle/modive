import { SupabaseClient } from '@supabase/supabase-js';

import { CharacterType } from '@/types/character';
import { WorkType } from '@/types/work';

export const fetchWorkDetail = async (
  supabase: SupabaseClient,
  workId: string
) => {
  const { data, error } = await supabase.functions.invoke('works/get-by-id', {
    body: {
      id: workId,
    },
  });

  if (error) throw error;
  return data.data as WorkType;
};

export const fetchWorkCharacters = async (
  supabase: SupabaseClient,
  workId: string
) => {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('work_id', workId);
  if (error) throw error;
  return data as CharacterType[];
};
