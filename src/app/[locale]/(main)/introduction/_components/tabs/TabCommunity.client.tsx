'use client';

import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { Direction, Plus } from '@/assets/icons';
import { useDynamicPageSize } from '@/hooks/useDynamicPageSize';
import { useAuth } from '@/lib/authentication/auth-context';
import { CommentType } from '@/types/comment';
import { WorkType } from '@/types/work';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

import { useComments } from '../../_hooks/useComments';
import { CommentForm, CommentList } from '../Comment';
import ModalDeleteComment from '../modals/ModalDeleteComment';

type TabCommunityProps = {
  workDetail: WorkType;
};

export default function TabCommunity({ workDetail }: TabCommunityProps) {
  const t = useTranslations('introduction.community');
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const workId = searchParams.get('workId') as string;
  const [sortAscending, setSortAscending] = useState(false);
  const router = useRouter();

  const commentFormRef = useRef<React.ElementRef<typeof CommentForm>>(null);
  const commentListRef = useRef<HTMLDivElement>(null);
  const modalDeleteCommentRef =
    useRef<React.ElementRef<typeof ModalDeleteComment>>(null);

  const { recommendedPageSize } = useDynamicPageSize({
    containerRef: commentListRef,
    estimatedItemHeight: 80,
    minPageSize: 10,
    maxPageSize: 50,
  });

  const {
    comments,
    isValidating,
    isLoading,
    toggleLike,
    size,
    setSize,
    isReachingEnd,
    createComment,
    updateComment,
    deleteComment,
  } = useComments(workId, sortAscending, recommendedPageSize);

  const handleLike = (commentId: string, currentLike: boolean) => {
    if (!user?.id) {
      router.push(ROUTES.LOGIN);
      return;
    }
    toggleLike({ commentId, currentLike });
  };

  const handleEdit = (comment: CommentType) => {
    commentFormRef.current?.open(comment);
  };

  const handleDelete = (commentId: string) => {
    modalDeleteCommentRef.current?.open(commentId);
  };

  const loadMore = () => {
    if (!isValidating && !isReachingEnd) {
      setSize(size + 1);
    }
  };

  const handleChangeSort = () => {
    setSortAscending(!sortAscending);
  };

  return (
    <>
      <div className="flex h-full flex-col gap-16 px-8">
        <div className="flex h-40 w-full items-center border-b border-gray-90 px-16">
          <div
            className="flex cursor-pointer items-center gap-4"
            onClick={handleChangeSort}
          >
            <p>{sortAscending ? t('oldest') : t('latest')}</p>
            <Direction
              width={14}
              height={14}
              className={cx(
                'text-gray-00',
                sortAscending ? 'rotate-90' : '-rotate-90'
              )}
            />
          </div>
        </div>
        <CommentList
          ref={commentListRef}
          comments={comments || []}
          onLoadMore={loadMore}
          itemProps={{
            onLike: handleLike,
            onEdit: handleEdit,
            onDelete: handleDelete,
          }}
          className={cx(
            'min-h-0 flex-1 overflow-auto transition-opacity',
            isLoading && isValidating && 'opacity-50'
          )}
        />
      </div>

      <button
        onClick={() => {
          commentFormRef.current?.open();
        }}
        className="absolute bottom-16 right-16 flex h-40 w-40 items-center justify-center rounded-8 border border-secondary bg-white text-primary transition-all duration-300 hover:shadow-custom-1"
      >
        <Plus />
      </button>

      <CommentForm
        ref={commentFormRef}
        createComment={createComment}
        updateComment={updateComment}
        workDetail={workDetail}
      />
      <ModalDeleteComment
        ref={modalDeleteCommentRef}
        deleteComment={deleteComment}
      />
    </>
  );
}
