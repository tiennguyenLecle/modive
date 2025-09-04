'use client';

import { useMemo } from 'react';
import useSWR from 'swr';

import { USER_KEYS } from '@/app/[locale]/cms/user-management/UsersManagementTable.client';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import {
  fetchMeExtraData,
  fetchUserDetail,
  fetchUsers,
  UsersListQuery,
} from '@/lib/supabase/swr/users';
import { UserType } from '@/types/user';

export function useUser(
  query: UsersListQuery = {},
  fallbackData?: { data: UserType[]; count: number },
  key?: any[]
) {
  const supabase = useMemo(() => createBrowserSupabase('admin'), []);

  const swrKey = key ? ['users', ...key] : USER_KEYS.all;
  return useSWR(swrKey, () => fetchUsers(supabase, query), {
    fallbackData,
    revalidateOnMount: false,
  });
}

export function useUserDetail(id: string, fallbackData?: UserType) {
  const supabase = useMemo(() => createBrowserSupabase('admin'), []);
  return useSWR(USER_KEYS.detail(id), () => fetchUserDetail(supabase, id), {
    fallbackData,
    revalidateOnMount: false,
  });
}

export function useMeExtraData(shouldFetch: boolean, userId: UserType['id']) {
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  return useSWR(shouldFetch ? 'me' : null, () =>
    fetchMeExtraData(supabase, userId)
  );
}
