import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';

import { useAuth } from '@/lib/authentication/auth-context';
import { CommentsResponseType, CommentType } from '@/types/comment';

import {
  createCommentAction,
  deleteCommentAction,
  fetchComments,
  toggleCommentLikeAction,
  updateCommentAction,
} from '../_actions/comment';

export function useComments(
  workId: string,
  sortAscending: boolean = true,
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
    return [
      'comments',
      page,
      workId,
      sortAscending,
      pageSize,
      user?.id,
    ] as const;
  };

  const infiniteComments = useSWRInfinite(
    getKey,
    ([, page, workId, sortAscending, limit]) =>
      fetchComments({
        workId,
        page,
        sortAscending,
        limit,
        userId: user?.id,
      }),
    {
      revalidateAll: true,
      keepPreviousData: true,
    }
  );

  const comments: CommentType[] = useMemo(
    () =>
      infiniteComments.data
        ? infiniteComments.data.flatMap(page => page.data)
        : [],
    [infiniteComments]
  );

  const { data } = infiniteComments;
  const isReachingEnd =
    data &&
    data[data.length - 1] &&
    data[data.length - 1].metadata.currentPage >=
      data[data.length - 1].metadata.totalPages;

  const { trigger: toggleLike } = useSWRMutation(
    ['comments', workId],
    async (
      key,
      { arg }: { arg: { commentId: string; currentLike: boolean } }
    ) => {
      try {
        // Optimistic update
        infiniteComments.mutate(
          (current: CommentsResponseType[] | undefined) => {
            if (!current) return current;

            return current.map((segment: CommentsResponseType) => ({
              ...segment,
              data: segment.data.map((comment: CommentType) => {
                if (comment.id === arg.commentId) {
                  const newLikeState = !arg.currentLike;
                  return {
                    ...comment,
                    is_liked: newLikeState,
                    total_likes: comment.total_likes + (newLikeState ? 1 : -1),
                  };
                }
                return comment;
              }),
            }));
          },
          { revalidate: false }
        );

        await toggleCommentLikeAction(arg.commentId, arg.currentLike);
      } catch (error) {
        // Revert on error
        infiniteComments.mutate();
        throw error;
      }
    }
  );

  const createComment = useSWRMutation(
    ['comments', workId],
    async (_, { arg }: { arg: { content: string } }) => {
      try {
        // Create temporary comment for optimistic update
        const tempComment = {
          content: arg.content,
          user: {
            id: user?.id || '',
            name: user?.user_metadata?.name || user?.email || '',
          },
          total_likes: 0,
          is_liked: false,
          _loading: true,
        } as CommentType;

        // Optimistic update - add to the beginning or end based on sort order
        infiniteComments.mutate(
          (current: CommentsResponseType[] | undefined) => {
            if (!current || current.length === 0) return current;

            const updatedSegments = [...current];
            const targetSegmentIndex = sortAscending
              ? updatedSegments.length - 1
              : 0;

            if (updatedSegments[targetSegmentIndex]) {
              updatedSegments[targetSegmentIndex] = {
                ...updatedSegments[targetSegmentIndex],
                data: sortAscending
                  ? [...updatedSegments[targetSegmentIndex].data, tempComment]
                  : [tempComment, ...updatedSegments[targetSegmentIndex].data],
              };
            }

            return updatedSegments;
          },
          { revalidate: false }
        );

        const result = await createCommentAction(workId, arg.content);
      } catch (error) {
        throw error;
      } finally {
        // Replace temp comment with real comment (ID, timestamps, etc.)
        await infiniteComments.mutate();
      }
    }
  );

  const updateComment = useSWRMutation(
    ['comments'],
    async (_, { arg }: { arg: { comment: CommentType; content: string } }) => {
      try {
        // Optimistic update - update comment content immediately
        infiniteComments.mutate(
          (current: CommentsResponseType[] | undefined) => {
            if (!current) return current;

            console.log('current', current);

            return current.map((segment: CommentsResponseType) => ({
              ...segment,
              data: segment.data.map((comment: CommentType) => {
                if (comment.id === arg.comment.id) {
                  return {
                    ...comment,
                    content: arg.content,
                    _loading: true,
                  };
                }
                return comment;
              }),
            }));
          },
          { revalidate: false }
        );
        await updateCommentAction(arg.comment, arg.content);
      } catch (error) {
        throw error;
      } finally {
        // Revalidate to get the latest data from the server
        await infiniteComments.mutate();
      }
    }
  );

  const deleteComment = useSWRMutation(
    ['comments'],
    async (_, { arg }: { arg: { commentId: string } }) => {
      try {
        // Optimistic update - remove comment immediately
        infiniteComments.mutate(
          (current: CommentsResponseType[] | undefined) => {
            if (!current) return current;

            return current.map((segment: CommentsResponseType) => ({
              ...segment,
              data: segment.data.filter(
                (comment: CommentType) => comment.id !== arg.commentId
              ),
            }));
          },
          { revalidate: false }
        );

        await deleteCommentAction(arg.commentId);
      } catch (error) {
        throw error;
      } finally {
        // Revalidate to get the latest data from the server
        await infiniteComments.mutate();
      }
    }
  );

  return {
    ...infiniteComments,
    comments,
    toggleLike,
    createComment,
    updateComment,
    deleteComment,
    isReachingEnd,
  };
}
