import { SupabaseClient } from '@supabase/supabase-js';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { useAuth } from '@/lib/authentication/auth-context';
import { addGoodLike, removeGoodLike } from '@/lib/supabase/swr/goodLike';
import {
  fetchGoodDetail,
  fetchWorkGoods,
  fetchWorksWithGoods,
  WorkWithGoodsType,
} from '@/lib/supabase/swr/goods';

export const useWorksWithGoods = (supabase: SupabaseClient) => {
  return useSWR<{
    data: WorkWithGoodsType[];
    count: number;
    offset: number;
    limit: number;
  }>(['works-with-goods'], () => fetchWorksWithGoods(supabase, 0, 100));
};

export const useWorkGoods = (supabase: SupabaseClient, workId: string) => {
  return useSWR<WorkWithGoodsType>(['work-goods', workId], () =>
    fetchWorkGoods(supabase, workId)
  );
};

export const useGoodDetail = (supabase: SupabaseClient, goodId: string) => {
  const { user } = useAuth();

  return useSWR(
    ['good-detail', goodId, user?.id],
    ([, goodId, userId]) =>
      fetchGoodDetail(supabase, goodId, userId).then(data => data),
    {
      revalidateOnFocus: false,
    }
  );
};

export const useGoodLike = (supabase: SupabaseClient, userId: string) =>
  useSWRMutation(
    ['good-like'],
    async (key, { arg }: { arg: { isLiked: boolean; goodId: string } }) => {
      if (arg.isLiked) {
        await removeGoodLike(supabase, arg.goodId, userId);
      } else {
        await addGoodLike(supabase, arg.goodId, userId);
      }
    }
  );
