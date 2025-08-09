import { NextRequest, NextResponse } from 'next/server';

import { getServerAuth } from '@/lib/authentication/server-auth';

import type { ApiHandler, HandlerContext } from './validators';

/**
 * A Higher-Order Function to protect API routes.
 * It checks for a valid user session using Supabase Auth.
 * If the user is not authenticated, it returns a 401 Unauthorized response.
 * If the user is authenticated, it attaches the user session to the context
 * and proceeds to the next handler.
 */
export function withAuth(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest, context: HandlerContext) => {
    // Authoritative path: resolve session/user via Supabase Auth server
    const user = await getServerAuth();
    if (!user) {
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
    context.user = user;

    return handler(request, context);
  };
}
