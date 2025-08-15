import type { SupabaseClient } from '@supabase/supabase-js';

import {
  AnnouncementRecord,
  AnnouncementStatus,
} from '@/types/announcement.types';

// SWR Keys
export const ANNOUNCEMENT_KEYS = {
  all: ['announcements'] as const,
  detail: (id: string) => ['announcement', id] as const,
};

export type AnnouncementsListQuery = {
  page?: number;
  pageSize?: number;
  status?: string;
};

export async function fetchAnnouncements(
  supabase: SupabaseClient,
  query: AnnouncementsListQuery = {}
) {
  const { status, page = 1, pageSize = 50 } = query;
  let request = supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });
  if (status) request = request.eq('status', status);
  if (page && pageSize) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    request = request.range(from, to);
  }
  const { data, error } = await request;
  if (error) throw error;
  return (data || []) as AnnouncementRecord[];
}

export async function fetchAnnouncementDetail(
  supabase: SupabaseClient,
  id: string
) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as AnnouncementRecord;
}

export type CreateAnnouncementPayload = {
  title: string;
  content?: string | null;
  publication_date?: string | null;
  expiration_date?: string | null;
  status: AnnouncementStatus;
};

export async function createAnnouncement(
  supabase: SupabaseClient,
  payload: CreateAnnouncementPayload
) {
  const { data, error } = await supabase
    .from('announcements')
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data as AnnouncementRecord;
}

export type UpdateAnnouncementPayload = {
  title?: string;
  content?: string | null;
  publication_date?: string | null;
  expiration_date?: string | null;
  status?: AnnouncementStatus;
};

export async function updateAnnouncement(
  supabase: SupabaseClient,
  id: string,
  payload: UpdateAnnouncementPayload
) {
  const { data, error } = await supabase
    .from('announcements')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as AnnouncementRecord;
}

export async function publishAnnouncement(
  supabase: SupabaseClient,
  id: string
) {
  return updateAnnouncement(supabase, id, {
    status: AnnouncementStatus.PUBLISHED,
  });
}
