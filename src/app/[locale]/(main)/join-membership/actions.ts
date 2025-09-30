'use server';

import { cookies } from 'next/headers';

import { getServerAuth } from '@/lib/authentication/server-auth';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { COOKIE } from '@/utils/constants';

export const isUniqueNickname = async (nickname: string) => {
  const supabase = createServerSupabase('user');
  const user = await getServerAuth();
  if (!user) {
    return false;
  }
  const { data, error } = await supabase.rpc('check_duplicate_user', {
    p_nickname: nickname,
    p_exclude_id: user.id,
  });

  return !data || !!error;
};

export const signUpData = async (values: {
  userId: string;
  name: string;
  phone: string;
  nickname: string;
  date_of_birth: string;
  metadata: {
    agree_service_terms_and_conditions: boolean;
    agree_privacy_policy: boolean;
    agree_third_party_personal_information_collection_and_use_agreement: boolean;
  };
}) => {
  const supabase = createServerSupabase('user');

  const { userId, ...submitData } = values;

  const { data: oldMetadata, error: oldMetadataError } = await supabase
    .from('users')
    .select('metadata')
    .eq('id', userId)
    .single();

  if (oldMetadataError) {
    throw oldMetadataError;
  }

  const { data, error } = await supabase
    .from('users')
    .update({
      ...submitData,
      metadata: { ...oldMetadata.metadata, ...values.metadata },
      is_profile_complete: true,
    })
    .eq('id', userId);

  if (error) throw error;

  cookies().delete(COOKIE.IS_PROFILE_COMPLETE);

  return data;
};
