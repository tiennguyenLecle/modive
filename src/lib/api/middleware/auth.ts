import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth'; // Import the auth config from src/lib/auth.ts

import type { ApiHandler, HandlerContext } from './validators';

/**
 * A Higher-Order Function to protect API routes.
 * It checks for a valid user session using `next-auth`.
 * If the user is not authenticated, it returns a 401 Unauthorized response.
 * If the user is authenticated, it attaches the user session to the context
 * and proceeds to the next handler.
 *
 * @param handler The API handler to protect.
 * @returns A new API handler with authentication check.
 */
export function withAuth(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest, context: HandlerContext) => {
    const session = await auth(); // Use next-auth's auth() function

    if (!session || !session.user) {
      return NextResponse.json(
        {
          error: {
            message:
              'Unauthorized: You must be logged in to access this resource.',
          },
        },
        { status: 401 }
      );
    }

    // Attach user session to the context for downstream handlers
    context.session = session;

    return handler(request, context);
  };
}
