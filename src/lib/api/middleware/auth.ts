import { NextRequest, NextResponse } from 'next/server';

import {
  decodeJwtPayload,
  extractUserFromPayload,
  getSupabaseAccessTokenFromRequest,
  isJwtExpired,
} from '@/lib/auth-helpers';
import { getServerAuth } from '@/lib/server-auth';

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
    // Fast path: use cookie token to avoid a network call when possible
    const rawToken = getSupabaseAccessTokenFromRequest(request);
    const payload = rawToken ? decodeJwtPayload(rawToken) : null;
    const expired = isJwtExpired(payload);
    const userFromToken = !expired ? extractUserFromPayload(payload) : null;

    if (userFromToken) {
      context.session = { user: userFromToken } as any;
      return handler(request, context);
    }

    // Fallback: let server auth helper resolve session/user (will refresh cookies if needed)
    const { status, user } = await getServerAuth();
    if (status !== 'authenticated' || !user) {
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
    context.session = {
      user: { id: user.id, email: user.email },
    } as any;

    return handler(request, context);
  };
}
