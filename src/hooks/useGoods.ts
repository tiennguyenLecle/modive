import { SupabaseClient } from '@supabase/supabase-js';
import useSWR from 'swr';

import {
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
