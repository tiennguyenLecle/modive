'use client';

import React, { ComponentProps, forwardRef } from 'react';
import VirtualList from 'rc-virtual-list';

import { CommentType } from '@/types/comment';
import { cx } from '@/utils/method';

import styles from './CommentList.module.scss';
import CommentItem from './Item';

type CommentListProps = ComponentProps<'div'> & {
  comments: CommentType[];
  onLoadMore: () => void;
  itemProps: {
    onLike: (commentId: string, currentLike: boolean) => void;
    onEdit: (commentId: string, newContent: string) => void;
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
        className={cx('flex flex-col gap-16', className)}
        {...props}
      >
        {comments?.length > 0 && (
          <VirtualList<CommentType>
            data={comments}
            itemKey="id"
            fullHeight={true}
            itemHeight={135}
            onScroll={onScroll}
            className={cx('min-h-0 flex-1', styles.virtualList)}
          >
            {comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLike={onLike}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </VirtualList>
        )}
      </div>
    );
  }
);

export default CommentList;
