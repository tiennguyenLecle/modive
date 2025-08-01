import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import { chatApi, pipe, withValidation, type HandlerContext } from '@/lib/api';

// --- GET SESSIONS ---

const getQuerySchema = z.object({
  userId: z.string().nonempty(),
});
type GetQuery = z.infer<typeof getQuerySchema>;

async function getHandler(request: NextRequest, context: HandlerContext) {
  try {
    const { userId } = context.validatedQuery as GetQuery;
    // The handler is now just one line, delegating all logic to the client.
    const sessions = await chatApi.searchSessionsByUserId(userId);
    return NextResponse.json(sessions);
  } catch (error: any) {
    console.error(`[API /session] Failed to fetch sessions:`, error.message);
    return NextResponse.json(
      { error: { message: 'Failed to retrieve chat sessions.' } },
      { status: 502 }
    );
  }
}

export const GET = pipe(withValidation(getQuerySchema, { target: 'query' }))(
  getHandler
);

// --- CREATE A NEW SESSION ---

const createBodySchema = z.object({
  userId: z.string().nonempty(),
  initialMessage: z.string().nonempty(),
});
type CreateBody = z.infer<typeof createBodySchema>;

async function createHandler(request: NextRequest, context: HandlerContext) {
  try {
    const { userId, initialMessage } = context.validatedBody as CreateBody;
    // The handler is now just one line.
    const newSession = await chatApi.createSession(userId, initialMessage);
    return NextResponse.json(newSession, { status: 201 });
  } catch (error: any) {
    console.error(`[API /session] Failed to create session:`, error.message);
    return NextResponse.json(
      { error: { message: 'Failed to create chat session.' } },
      { status: 502 }
    );
  }
}

export const POST = pipe(withValidation(createBodySchema, { target: 'body' }))(
  createHandler
);
