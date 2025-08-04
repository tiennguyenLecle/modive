import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import {
  pipe,
  withValidatedBody,
  withValidatedParams,
  type HandlerContext,
} from '@/lib/api';
import { withAuth } from '@/lib/api/middleware/auth';
import { ChatApi } from '@/lib/api/server';

// --- Common definitions ---

// Schema to validate the `chatroomId` from the URL path
const paramsSchema = z.object({
  chatroomId: z.uuid({ message: 'Invalid chatroom ID format.' }),
  cursor: z.string().optional(),
  limit: z.number().optional(),
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
    const { chatroomId, cursor, limit, direction } = context.validatedParams;
    const messages = await ChatApi.getMessages(
      chatroomId,
      cursor,
      limit,
      direction
    );
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: 'Failed to retrieve chat messages.' } },
      { status: 502 }
    );
  }
}

// Validate the URL parameter before executing the handler
export const GET = pipe(withValidatedParams(paramsSchema))(getMessagesHandler);

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
    const { id: userId, name: userName } = context.session?.user!;
    const newMessage = await ChatApi.createMessage(
      sessionId,
      chatroomId,
      userId!,
      text,
      userName!,
      'male',
      '2000-01-01'
    );

    console.log('newMessage', newMessage);
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
