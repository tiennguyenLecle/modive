'use client';

import React, { ComponentProps, forwardRef } from 'react';
import { useTranslations } from 'next-intl';

import { VirtualList } from '@/components';
import { CommentType } from '@/types/comment';
import { cx } from '@/utils/method';

import Empty from '../Empty';
import CommentItem from './Item';

type CommentListProps = ComponentProps<'div'> & {
  comments: CommentType[];
  onLoadMore: () => void;
  itemProps: {
    onLike: (commentId: string, currentLike: boolean) => void;
    onEdit: (comment: CommentType) => void;
    onDelete: (commentId: string) => void;
  };
};

const CommentList = forwardRef<HTMLDivElement, CommentListProps>(
  function CommentList(
    {
      comments,
      onLoadMore,
      itemProps: { onLike, onEdit, onDelete },
      className,
      ...props
    },
    ref
  ) {
    const t = useTranslations('introduction.community');

    const onScroll = (e: any) => {
      const target = e?.currentTarget as HTMLElement | undefined;
      if (!target) return;
      const threshold = 50; // px from bottom to trigger load more
      const remaining =
        target.scrollHeight - target.scrollTop - target.clientHeight;
      const isNearBottom = remaining < threshold;
      if (isNearBottom) onLoadMore();
    };

    return (
      <div
        ref={ref}
        className={cx('flex min-h-0 flex-1 flex-col', className)}
        {...props}
      >
        {comments?.length > 0 ? (
          <VirtualList<CommentType>
            data={comments}
            itemKey="id"
            itemHeight={135}
            onScroll={onScroll}
            className="bg-white"
          >
            {comment => (
              <CommentItem
                comment={comment}
                onLike={onLike}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </VirtualList>
        ) : (
          <Empty message={t('no_posts')} />
        )}
      </div>
    );
  }
);

export default CommentList;
