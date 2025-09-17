import { SupabaseClient } from '@supabase/supabase-js';

import { UserType } from '@/types/user';

export type UsersListQuery = {
  page?: number;
  pageSize?: number;
  membershipType?: string;
};

export async function fetchUsers(
  supabase: SupabaseClient,
  query: UsersListQuery = {}
) {
  const { page = 1, pageSize = 10 } = query;
  const request = supabase
    .from('users')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (page && pageSize) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    request.range(from, to);
  }
  const { data, error, count } = await request;
  if (error) throw error;
  return { data: data || ([] as UserType[]), count: count! };
}

export async function fetchUserDetail(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as UserType;
}

export async function fetchMeExtraData(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data as UserType;
}

export async function updateNewMsgCountUser(
  supabase: SupabaseClient,
  id: string,
  new_msg_count: number
) {
  const { data, error } = await supabase
    .from('users')
    .update({
      metadata: {
        new_msg_count: new_msg_count,
      },
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as UserType;
}
