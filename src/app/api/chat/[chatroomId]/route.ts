import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import { chatApi, pipe, withValidation, type HandlerContext } from '@/lib/api';

interface ChatRoomHandlerContext extends HandlerContext {
  params: {
    chatroomId: string;
  };
}

// --- GET MESSAGES ---

async function getMessagesHandler(
  request: NextRequest,
  context: ChatRoomHandlerContext
) {
  try {
    const { chatroomId } = context.params;
    const messages = await chatApi.getMessages(chatroomId);
    return NextResponse.json(messages);
  } catch (error: any) {
    console.error(
      `[API /chat/${context.params.chatroomId}] Failed to fetch messages:`,
      error.message
    );
    return NextResponse.json(
      { error: { message: 'Failed to retrieve chat messages.' } },
      { status: 502 }
    );
  }
}

export const GET = getMessagesHandler;

// --- CREATE A NEW MESSAGE ---

const createMessageBodySchema = z.object({
  senderId: z.string().nonempty(),
  text: z.string().nonempty(),
});
type CreateMessageBody = z.infer<typeof createMessageBodySchema>;

async function createMessageHandler(
  request: NextRequest,
  context: ChatRoomHandlerContext
) {
  try {
    const { chatroomId } = context.params;
    const { senderId, text } = context.validatedBody as CreateMessageBody;
    const newMessage = await chatApi.createMessage(chatroomId, senderId, text);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error(
      `[API /chat/${context.params.chatroomId}] Failed to create message:`,
      error.message
    );
    return NextResponse.json(
      { error: { message: 'Failed to create chat message.' } },
      { status: 502 }
    );
  }
}

export const POST = pipe(
  withValidation(createMessageBodySchema, { target: 'body' })
)(createMessageHandler);
