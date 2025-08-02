import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import {
  pipe,
  withValidatedBody,
  withValidatedQuery,
  type HandlerContext,
} from '@/lib/api';
import { ChatApi } from '@/lib/api/server';
import { COOKIE_USER_ID } from '@/utils/constants';

// --- GET SESSIONS ---

async function getHandler(_request: NextRequest, context: HandlerContext) {
  try {
    const userId = cookies().get(COOKIE_USER_ID)?.value;
    console.log('userId', userId);
    if (!userId) {
      return NextResponse.json(
        { error: { message: 'Unauthorized' } },
        { status: 401 }
      );
    }

    const sessions = await ChatApi.searchSessionsByUserId(userId);
    return NextResponse.json(sessions);
  } catch (error: any) {
    console.error(`[API /session] Failed to fetch sessions:`, error.message);
    return NextResponse.json(
      { error: { message: 'Failed to retrieve chat sessions.' } },
      { status: 502 }
    );
  }
}

export const GET = getHandler;

// --- CREATE A NEW SESSION ---

const createBodySchema = z.object({
  userId: z.string().nonempty(),
  initialMessage: z.string().nonempty(),
});
type CreateBody = z.infer<typeof createBodySchema>;

async function createHandler(_request: NextRequest, context: HandlerContext) {
  try {
    const { userId, initialMessage } = context.validatedBody as CreateBody;
    const newSession = await ChatApi.createSession(userId, initialMessage);
    return NextResponse.json(newSession, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: 'Failed to create chat session.' } },
      { status: 502 }
    );
  }
}

// Use the specific HOF for body validation
export const POST = pipe(withValidatedBody(createBodySchema))(createHandler);
