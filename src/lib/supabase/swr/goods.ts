import { SupabaseClient } from '@supabase/supabase-js';

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
): Promise<GoodType & { is_liked: boolean }> => {
  const goodPromise = supabase
    .from('goods')
    .select('*')
    .eq('id', goodId)
    .is('deleted_at', null)
    .single();

  const likePromise = userId
    ? supabase
        .from('good_likes')
        .select('*')
        .eq('user_id', userId)
        .eq('good_id', goodId)
        .limit(1)
    : Promise.resolve({ data: [], error: null });

  const [goodResult, likeResult] = await Promise.all([
    goodPromise,
    likePromise,
  ]);

  const { data: good, error: goodError } = goodResult;
  if (goodError) throw goodError;

  const { data: likeRows, error: likeError } = likeResult;
  if (likeError) throw likeError;

  const isLiked = (likeRows?.length ?? 0) > 0;

  return { ...(good as GoodType), is_liked: isLiked };
};
