import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import {
  pipe,
  withValidatedBody,
  withValidatedParams,
  withValidatedQuery,
  type HandlerContext,
} from '@/lib/api';
import { withAuth } from '@/lib/api/middleware/auth';
import { ChatApi } from '@/lib/api/server';
import { createServerSupabase } from '@/lib/supabase/factory.server';

const createChatBodySchema = z.object({
  bundleId: z.string().nonempty(),
  characterId: z.string().nonempty(),
});
type CreateChatBody = z.infer<typeof createChatBodySchema>;

async function createChatHandler(
  _request: NextRequest,
  context: HandlerContext
) {
  try {
    const userId = context.user!.id;
    const { bundleId, characterId } = context.validatedBody as CreateChatBody;

    const supabase = createServerSupabase('user');

    const [{ data }, { botId, workId }] = await Promise.all([
      ChatApi.createSession(userId, bundleId),
      supabase
        .from('characters')
        .select('bot_id, work_id')
        .eq('id', characterId)
        .single()
        .then(res => {
          const { data, error } = res;
          if (error) throw error;
          return {
            botId: data.bot_id,
            workId: data.work_id,
          };
        }),
    ]);

    const sessionId = data.sessionId;
    const chatroomId =
      data.snapshot.state.chatroomStates[`${botId}-${userId}`].db.chatroomId;

    const createRes = await supabase
      .from('chat_rooms')
      .insert({
        session_id: sessionId,
        user_id: userId,
        room_id: chatroomId,
        character_id: characterId,
        work_id: workId,
      })
      .select('*')
      .single();

    return NextResponse.json(createRes.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export const POST = pipe(
  withAuth,
  withValidatedBody(createChatBodySchema)
)(createChatHandler);
