import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth'; // Import the auth config from src/lib/auth.ts

import type { ApiHandler, HandlerContext } from './validators';

/**
 * An HOF to protect API routes using NextAuth.js.
 * It verifies the session. If valid, it attaches the user session to the
 * context. If not, it returns a 401 Unauthorized error.
 */
export function withAuth(handler: ApiHandler) {
  return async function (request: NextRequest, context: HandlerContext) {
    const session = await auth(); // Get the session on the server

    if (!session || !session.user) {
      return NextResponse.json(
        { error: { message: 'Unauthorized: You must be logged in.' } },
        { status: 401 }
      );
    }

    // Attach the user session to the context for the next handler
    context.user = session.user;

    return handler(request, context);
  };
}
