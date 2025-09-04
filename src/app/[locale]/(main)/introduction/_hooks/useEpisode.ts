import { useMemo } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';

import { useAuth } from '@/lib/authentication/auth-context';
import { CommentsResponseType } from '@/types/comment';

import {
  fetchEpisodes,
  fetchEpisodesContent,
  orderEpisodes,
} from '../_actions/episode';

export function useEpisodes(
  workId: string,
  sort: Array<{ field: keyof EpisodeType; ascending: boolean }> = [
    { field: 'created_at', ascending: false },
  ],
  pageSize: number = 10
) {
  const { user } = useAuth();

  const getKey = (
    pageIndex: number,
    previousPageData: CommentsResponseType | null
  ) => {
    if (
      (previousPageData &&
        previousPageData.metadata.currentPage >=
          previousPageData.metadata.totalPages) ||
      !user?.id
    )
      return null;
    const page = pageIndex + 1;
    return ['episodes', page, workId, sort, pageSize, user?.id] as const;
  };

  const infiniteEpisodes = useSWRInfinite(
    getKey,
    ([, page, workId, sort, limit]) =>
      fetchEpisodes({
        work_ids: [workId],
        page,
        sort,
        limit,
        is_ordered_user_id: user!.id,
      }),
    {
      revalidateAll: true,
      keepPreviousData: true,
    }
  );

  const episodes = useMemo(
    () =>
      infiniteEpisodes.data
        ? infiniteEpisodes.data.flatMap(page => page.data)
        : [],
    [infiniteEpisodes]
  );

  const { data } = infiniteEpisodes;
  const isReachingEnd =
    data &&
    data[data.length - 1] &&
    data[data.length - 1].metadata.currentPage >=
      data[data.length - 1].metadata.totalPages;

  return {
    ...infiniteEpisodes,
    episodes,
    isReachingEnd,
  };
}

export function useOrderEpisodes() {
  return useSWRMutation(['orderEpisodes'], (url, { arg }: { arg: any }) =>
    orderEpisodes(arg)
  );
}

export function useEpisodeContent(shouldFetch: boolean, episodeIds: string[]) {
  return useSWR(shouldFetch ? ['episodeContent', episodeIds] : null, () =>
    fetchEpisodesContent({ episode_ids: episodeIds }).then(async data => {
      const entries = await Promise.all(
        Object.entries(data).map(async ([key, value]) => {
          if (value.error) {
            return [key, { ...value, content: null }];
          }

          const signedUrl = value.signedUrl;

          const content = await fetch(signedUrl).then(res => res.text());
          return [key, { ...value, content }];
        })
      );

      return Object.fromEntries(entries);
    })
  );
}
