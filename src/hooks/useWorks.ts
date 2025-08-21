import { useMemo } from 'react';
import useSWR from 'swr';

import { createBrowserSupabase } from '@/lib/supabase/factory';
import { fetchAllWorks } from '@/lib/supabase/swr/work';

export const SWR_KEY = 'works';

export const useWorks = ({
  shouldFetch = true,
}: { shouldFetch?: boolean } = {}) => {
  const supabase = useMemo(() => createBrowserSupabase('user'), []);

  const { data, error, isLoading } = useSWR(shouldFetch ? SWR_KEY : null, () =>
    fetchAllWorks(supabase, ['id', 'title'])
  );

  return {
    data,
    error,
    isLoading,
  };
};
