import { useMemo } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import useSWR from 'swr';

import { createBrowserSupabase } from '@/lib/supabase/factory';
import { fetchWorkDetail } from '@/lib/supabase/swr/work';
import { WorkType } from '@/types/work';

export const WORK_KEYS = {
  detail: (workId: string) => ['work', workId],
};

export function useWorkDetail(workId?: string, fallbackData?: WorkType) {
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  return useSWR(
    workId ? WORK_KEYS.detail(workId) : null,
    () => fetchWorkDetail(supabase, workId!),
    {
      fallbackData,
      revalidateOnMount: false,
    }
  );
}
