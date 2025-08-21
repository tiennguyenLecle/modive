'use server';

import { revalidatePath } from 'next/cache';

import { createServerSupabase } from '@/lib/supabase/factory.server';

export async function pinChatRoomAction(chatroomId: string, isPinned: boolean) {
  const supabase = createServerSupabase('user');

  const { data, error } = await supabase
    .from('chat_rooms')
    .update({ is_pinned: !isPinned, pinned_at: !isPinned ? new Date() : null })
    .eq('id', chatroomId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/chat');
  return data;
}

export async function deleteChatRoomAction(chatroomId: string) {
  const supabase = createServerSupabase('user');
  const { error } = await supabase
    .from('chat_rooms')
    .delete()
    .eq('id', chatroomId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/chat');
}
