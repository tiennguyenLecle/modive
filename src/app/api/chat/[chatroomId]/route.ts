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

// --- Common definitions ---

// Schema to validate the `chatroomId` from the URL path
const paramsSchema = z.object({
  chatroomId: z.uuid({ message: 'Invalid chatroom ID format.' }),
});

const querySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().optional(),
  direction: z.enum(['before', 'after']).optional(),
});

type ChatRoomParams = z.infer<typeof paramsSchema>;

// Extend the context to make TypeScript aware of `validatedParams`
interface ChatRoomHandlerContext extends HandlerContext {
  validatedParams: ChatRoomParams;
}

// --- GET MESSAGES ---

async function getMessagesHandler(
  _request: NextRequest,
  context: ChatRoomHandlerContext
) {
  try {
    const { chatroomId } = context.validatedParams;
    const { cursor, limit, direction } = context.validatedQuery;

    console.log('NEXT API - receive query params', cursor, limit, direction);

    const messages = await ChatApi.getMessages(
      chatroomId,
      cursor,
      limit,
      direction
    );
    return NextResponse.json(messages);
  } catch (error: any) {
    console.log('NEXT API - catch chat error', error);

    return NextResponse.json(error);
    return NextResponse.json(
      { error: { message: 'Failed to retrieve chat messages.' } },
      { status: 502 }
    );
  }
}

// Validate the URL parameter before executing the handler
export const GET = pipe(
  // withAuth,
  withValidatedParams(paramsSchema),
  withValidatedQuery(querySchema)
)(getMessagesHandler);

// --- CREATE A NEW MESSAGE ---

const createMessageBodySchema = z.object({
  sessionId: z.string().nonempty(),
  text: z.string().nonempty(),
});
type CreateMessageBody = z.infer<typeof createMessageBodySchema>;

async function createMessageHandler(
  _request: NextRequest,
  context: ChatRoomHandlerContext
) {
  try {
    const { chatroomId } = context.validatedParams;
    const { sessionId, text } = context.validatedBody as CreateMessageBody;
    const { id: userId, user_metadata } = context.user!;
    const newMessage = await ChatApi.createMessage(
      sessionId,
      chatroomId,
      userId!,
      text,
      user_metadata.name || '',
      'male',
      '2000-01-01'
    );

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: 'Failed to create chat message.' } },
      { status: 502 }
    );
  }
}

// Chain multiple HOFs: first validate params, then validate body
export const POST = pipe(
  withAuth,
  withValidatedParams(paramsSchema),
  withValidatedBody(createMessageBodySchema)
)(createMessageHandler);
