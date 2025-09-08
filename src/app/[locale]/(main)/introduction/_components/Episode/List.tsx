'use client';

import { ComponentProps, forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import VirtualList from 'rc-virtual-list';

import { Spinner } from '@/components';
import { cx } from '@/utils/method';

import { ExtendedEpisodeType } from '../../_actions/episode';
import Empty from '../Empty';
import styles from './Episode.module.scss';
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
          'flex min-h-0 flex-1 flex-col transition-opacity duration-300',
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
            className={cx('min-h-0 flex-1', styles.episodeList)}
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
        ) : isValidating && isReachingEnd ? (
          <div className="flex h-full items-center justify-center bg-gray-90 px-16 text-center text-14 font-semibold text-gray-60">
            <Spinner />
          </div>
        ) : (
          <Empty message={t('empty')} />
        )}
      </div>
    );
  }
);

export default EpisodeList;
