'use client';

import { ComponentProps, forwardRef } from 'react';
import { useTranslations } from 'next-intl';

import { Spinner, VirtualList } from '@/components';
import { cx } from '@/utils/method';

import { ExtendedEpisodeType } from '../../_actions/episode';
import Empty from '../Empty';
import { useEpisodeContext } from './EpisodeProvider';
import EpisodeItem from './Item';

const EpisodeList = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function EpisodeList({ className, ...props }, ref) {
    const t = useTranslations('introduction.episodes');
    const {
      episodes,
      episodeInfinite: {
        isValidating,
        isReachingEnd,
        isLoading,
        setSize,
        size,
      },
    } = useEpisodeContext();

    return (
      <div
        ref={ref}
        className={cx(
          'transition-opacity duration-300',
          isValidating && isLoading && 'opacity-50',
          className
        )}
        {...props}
      >
        {episodes.length > 0 ? (
          <VirtualList<ExtendedEpisodeType>
            data={episodes}
            itemKey="id"
            itemHeight={90}
            onScroll={event => {
              const target = event?.currentTarget as HTMLElement | undefined;
              if (!target) return;
              const threshold = 50; // px from bottom to trigger load more
              const remaining =
                target.scrollHeight - target.scrollTop - target.clientHeight;

              const isNearBottom = remaining < threshold;
              if (isNearBottom && !isReachingEnd && !isValidating) {
                setSize(size + 1);
              }
            }}
          >
            {episode => <EpisodeItem key={episode.id} episode={episode} />}
          </VirtualList>
        ) : isValidating && isLoading ? (
          <div className="flex h-full min-h-200 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Empty message={t('empty')} className="min-h-200" />
        )}
      </div>
    );
  }
);

export default EpisodeList;
