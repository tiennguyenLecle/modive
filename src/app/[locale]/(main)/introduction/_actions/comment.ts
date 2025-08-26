'use server';

import { revalidatePath } from 'next/cache';

import { getServerAuth } from '@/lib/authentication/server-auth';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { CommentsResponseType, CommentType } from '@/types/comment';

export async function createCommentAction(workId: string, content: string) {
  const supabase = createServerSupabase('user');
  const user = await getServerAuth();

  if (!user) throw new Error('Authentication required');

  const { data, error } = await supabase
    .from('comments')
    .insert({ work_id: workId, content, user_id: user.id })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/introduction'); // Revalidate the page to show the new comment
  return data;
}

export async function updateCommentAction(
  comment: Pick<CommentType, 'id' | 'content'>
) {
  const supabase = createServerSupabase('user');
  const user = await getServerAuth();

  if (!user) throw new Error('Authentication required');

  const { data, error } = await supabase
    .from('comments')
    .update({ content: comment.content })
    .match({ id: comment.id, user_id: user.id }) // Ensure user can only update their own comments
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/introduction');
  return data;
}

export async function deleteCommentAction(commentId: string) {
  const supabase = createServerSupabase('user');
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Authentication required');

  const { error } = await supabase
    .from('comments')
    .delete()
    .match({ id: commentId, user_id: user.id });

  if (error) throw new Error(error.message);

  revalidatePath('/introduction');
}

export async function toggleCommentLikeAction(
  commentId: string,
  currentLike: boolean
) {
  const supabase = createServerSupabase('user');

  const user = await getServerAuth();

  if (!user) throw new Error('Authentication required');

  if (currentLike) {
    // User has liked, so dislike
    const { error } = await supabase
      .from('comment_likes')
      .delete()
      .match({ comment_id: commentId, user_id: user.id });

    if (error) throw new Error(error.message);
  } else {
    // Not liked yet, so like
    const { error } = await supabase
      .from('comment_likes')
      .insert({ comment_id: commentId, user_id: user.id });

    if (error) throw new Error(error.message);
  }

  revalidatePath('/introduction');
}

type FetchCommentsQuery = {
  userId?: string;
  workId: string;
  sortAscending: boolean;
  page?: number;
  limit?: number;
};

export const fetchComments = async ({
  userId,
  workId,
  page,
  sortAscending,
  limit = 10,
}: FetchCommentsQuery) => {
  const supabase = createServerSupabase('user');

  const { data, error } = await supabase.functions.invoke('comments/get', {
    body: {
      is_liked_user_id: userId, // id of user to check `is_liked`
      page,
      limit,
      sort: [{ field: 'created_at', ascending: sortAscending }],
      work_id: workId,
    },
  });

  if (error) throw error;
  return data as CommentsResponseType;
};
