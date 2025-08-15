'use client';

import { useMemo } from 'react';
import { message } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { createBrowserSupabase } from '@/lib/supabase/factory';
import {
  ANNOUNCEMENT_KEYS,
  createAnnouncement,
  fetchAnnouncementDetail,
  fetchAnnouncements,
  publishAnnouncement,
  updateAnnouncement,
  type AnnouncementsListQuery,
  type CreateAnnouncementPayload,
  type UpdateAnnouncementPayload,
} from '@/lib/supabase/swr/announcement';
import type { AnnouncementRecord } from '@/types/announcement.types';
import { ROUTES } from '@/utils/constants';

export function useAnnouncements(
  query: AnnouncementsListQuery = {},
  fallbackData?: AnnouncementRecord[]
) {
  const supabase = useMemo(() => createBrowserSupabase('admin'), []);

  return useSWR(
    ANNOUNCEMENT_KEYS.all,
    () => fetchAnnouncements(supabase, query),
    {
      fallbackData,
      revalidateOnMount: false,
    }
  );
}

export function useAnnouncementDetail(
  id: string,
  fallbackData?: AnnouncementRecord
) {
  const supabase = useMemo(() => createBrowserSupabase('admin'), []);

  return useSWR(
    id ? ANNOUNCEMENT_KEYS.detail(id) : null,
    () => fetchAnnouncementDetail(supabase, id),
    {
      fallbackData,
      revalidateOnMount: false,
    }
  );
}

export function useAnnouncementMutations() {
  const t = useTranslations('cms.announcement.message');
  const router = useRouter();
  const supabase = useMemo(() => createBrowserSupabase('admin'), []);

  const createMutation = useSWRMutation(
    ANNOUNCEMENT_KEYS.all,
    async (key, { arg: payload }: { arg: CreateAnnouncementPayload }) => {
      return await createAnnouncement(supabase, payload);
    },
    {
      onSuccess: () => {
        message.success(t('created_success'));
        router.push(ROUTES.CMS.DATA_MANAGEMENT.ANNOUNCEMENTS.INDEX);
      },
      onError: (error: any) => {
        message.error(error.message || t('error_generic'));
      },
    }
  );

  const updateMutation = useSWRMutation(
    ANNOUNCEMENT_KEYS.all,
    async (
      key,
      { arg }: { arg: { id: string; payload: UpdateAnnouncementPayload } }
    ) => {
      return await updateAnnouncement(supabase, arg.id, arg.payload);
    },
    {
      onSuccess: () => {
        message.success(t('updated_success'));
        router.back();
      },
      onError: (error: any) => {
        message.error(error.message || t('error_generic'));
      },
    }
  );

  const publishMutation = useSWRMutation(
    ANNOUNCEMENT_KEYS.all,
    async (key, { arg: id }: { arg: string }) => {
      return await publishAnnouncement(supabase, id);
    },
    {
      onSuccess: () => {
        message.success(t('updated_success'));
      },
      onError: (error: any) => {
        message.error(error.message || t('error_generic'));
      },
    }
  );

  return {
    create: createMutation,
    update: updateMutation,
    publish: publishMutation,
  };
}

// Main hook that combines everything
export function useAnnouncement() {
  return {
    useList: useAnnouncements,
    useDetail: useAnnouncementDetail,
    useMutations: useAnnouncementMutations,
  };
}
