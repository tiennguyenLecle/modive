import { SupabaseClient } from '@supabase/supabase-js';

import { GoodPlusType } from '@/types/goods';
import { Database } from '@/types/supabase';

type GoodType = Database['public']['Tables']['goods']['Row'];
export type WorkType = Database['public']['Tables']['works']['Row'];
export type WorkWithGoodsType = {
  work_id: string;
  work_title: string;
  total_goods: number;
} & {
  goods: Array<GoodType & { is_liked: boolean }>;
};

export const fetchWorkGoods = async (
  supabase: SupabaseClient,
  workId: string
): Promise<WorkWithGoodsType> => {
  const { data, error } = await supabase
    .from('work_goods')
    .select('*')
    .eq('work_id', workId)
    .single();
  if (error) throw error;
  return data;
};

export const fetchWorksWithGoods = async (
  supabase: SupabaseClient,
  offset: number,
  limit: number = 10
): Promise<{
  data: WorkWithGoodsType[];
  count: number;
  offset: number;
  limit: number;
}> => {
  const { count, data, error } = await supabase
    .from('work_goods')
    .select('*', { count: 'exact' })
    .gt('total_goods', 0)
    .range(offset, offset + limit - 1);

  if (error) throw error;

  const works = (data as WorkWithGoodsType[]) ?? [];

  return { data: works, count: count || 0, offset: offset, limit: limit };
};

export const fetchGoodDetail = async (
  supabase: SupabaseClient<Database>,
  goodId: string,
  userId?: string
): Promise<GoodPlusType> => {
  const { data, error } = await supabase.rpc('get_good_details_by_id', {
    p_good_id: goodId,
    p_status: 'published',
  });

  if (error) throw error;

  return data as GoodPlusType;
};
