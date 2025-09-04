'use server';

import { createServerSupabase } from '@/lib/supabase/factory.server';
import { MetadataType } from '@/types/metadata';
import { WorkType } from '@/types/work';

type FetchEpisodesParams = {
  // Pagination (from paginationSchema)
  page?: number; // Page number (default: 1)
  limit?: number; // Items per page (default: 10)
  sort?: Array<{ field: keyof EpisodeType; ascending: boolean }>;

  // Filtering options
  exclude_ids?: string[]; // Array of episode IDs to exclude
  ids?: string[]; // Array of episode IDs to include
  work_ids?: string[]; // Array of work IDs to filter episodes by work
  is_ordered_user_id?: string; // User ID to check if episode is ordered by this user
};

export type ExtendedEpisodeType = EpisodeType & {
  work: Pick<
    WorkType,
    'id' | 'tags' | 'title' | 'bundle_id' | 'universe_id' | 'thumbnail_key'
  >;
  is_ordered: boolean;
};

type FetchEpisodesResponse = {
  metadata: MetadataType;
  data: Array<ExtendedEpisodeType>;
};

export const fetchEpisodes = async (params: FetchEpisodesParams) => {
  const supabase = createServerSupabase('user');
  const { data, error } = await supabase.functions.invoke('/episodes/get', {
    body: params,
  });
  if (error) {
    throw error;
  }
  return data as FetchEpisodesResponse;
};

type FetchEpisodesContentParams = {
  episode_ids: string[];
};

type FetchEpisodesContentResponse = {
  data: Record<
    EpisodeType['id'],
    {
      error: string | null;
      path: string;
      signedURL: string;
      signedUrl: string;
    }
  >;
};

export const fetchEpisodesContent = async (
  params: FetchEpisodesContentParams
) => {
  console.log('fetch episodes params:', params);
  const supabase = createServerSupabase('user');
  const { data, error } = await supabase.functions.invoke(
    '/episodes/get-content-files',
    {
      body: params,
    }
  );
  if (error) {
    throw error;
  }
  return (data as FetchEpisodesContentResponse).data;
};

type OrderEpisodesParams = {
  episode_ids: string[];
};

export const orderEpisodes = async (params: OrderEpisodesParams) => {
  const supabase = createServerSupabase('user');
  const { data, error } = await supabase.functions.invoke('/orders/create', {
    body: {
      items: params.episode_ids.map(episodeId => ({
        item_type: 'episode',
        episode_id: episodeId,
        quantity: 1,
      })),
    },
  });
  if (error) {
    throw error;
  }
  return data;
};
