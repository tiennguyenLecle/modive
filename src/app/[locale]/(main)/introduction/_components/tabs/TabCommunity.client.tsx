'use client';

import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { Direction, Plus } from '@/assets/icons';
import { Spinner } from '@/components';
import { useDynamicPageSize } from '@/hooks/useDynamicPageSize';
import { useAuth } from '@/lib/authentication/auth-context';
import { CommentType } from '@/types/comment';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

import { useComments } from '../../_hooks/useComments';
import { CommentForm, CommentList } from '../Comment';
import Empty from '../Empty';
import ModalDeleteComment from '../modals/ModalDeleteComment';
import { useWork } from '../WorkProvider';

export default function TabCommunity() {
  const t = useTranslations('introduction.community');
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const workId = searchParams.get('workId') as string;
  const [sortAscending, setSortAscending] = useState(false);
  const router = useRouter();
  const { workDetail } = useWork();

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
    if (comments.length === 0) return;
    setSortAscending(!sortAscending);
  };

  return (
    <>
      {comments.length > 0 ? (
        <>
          <div className="flex h-40 w-full items-center border-b border-gray-90 bg-white px-24">
            <div
              className={cx(
                'flex items-center gap-4',
                comments.length > 0 ? 'cursor-pointer' : 'cursor-default'
              )}
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
            comments={comments}
            onLoadMore={loadMore}
            itemProps={{
              onLike: handleLike,
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
            className={cx(
              'min-h-0 flex-1 overflow-auto transition-opacity duration-300',
              isLoading && isValidating && 'opacity-50'
            )}
          />
        </>
      ) : isLoading && isValidating ? (
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Empty message={t('no_posts')} />
      )}
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
        workDetail={workDetail!}
      />
      <ModalDeleteComment
        ref={modalDeleteCommentRef}
        deleteComment={deleteComment}
      />
    </>
  );
}
