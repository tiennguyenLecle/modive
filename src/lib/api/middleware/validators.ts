import { User } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError, type ZodIssue } from 'zod';

// --- Core Utilities ---

export function pipe(...functions: Function[]) {
  return function (initialValue: any) {
    return functions.reduce((composed, fn) => fn(composed), initialValue);
  };
}

// Align with Supabase `auth.users` minimal shape used in our app.
// Note: Keep fields optional to avoid breaking handlers that only set a subset.

export interface HandlerContext {
  params?: { [key: string]: string | string[] | undefined };
  user?: User;
  validatedBody?: any;
  validatedQuery?: any;
  validatedParams?: any;
}

export type ApiHandler = (
  request: NextRequest,
  context: HandlerContext
) => Promise<NextResponse> | NextResponse;

// --- Specialized Validation HOFs ---

/**
 * HOF: Validate URL path parameters by  Zod.
 *
 * - Source: `context.params` from Next.js App Router dynamic segments
 * - Example: `api/chat/123` → `{ chatroomId: '123' }`
 * - On success, attaches parsed data to `context.validatedParams`.
 * - Typical use: validate IDs, slugs from URL path.
 */
export function withValidatedParams<T extends z.ZodType<any, any>>(schema: T) {
  return function (handler: ApiHandler): ApiHandler {
    return async (request: NextRequest, context: HandlerContext) => {
      try {
        // The dynamic route parameters are in `context.params`
        const paramsToValidate = context.params ?? {};

        context.validatedParams = schema.parse(paramsToValidate);
        return handler(request, context);
      } catch (error) {
        return handleZodError(error, 'Path');
      }
    };
  };
}

/**
 * HOF: Validate URL query parameters by Zod.
 *
 * - Source: `request.nextUrl.searchParams` converted to object via `Object.fromEntries(...)` (last value for duplicate keys).
 * - Example: `api/chat/123?limit=10&direction=after` → `{ limit: '10', direction: 'after' }`
 * - On success, attaches parsed data to `context.validatedQuery`.
 * - Typical use: validate pagination, filtering, etc.
 * - Tip: Use `z.coerce.number()` or refinements to convert string query values to the desired types.
 */
export function withValidatedQuery<T extends z.ZodType<any, any>>(schema: T) {
  return function (handler: ApiHandler): ApiHandler {
    return async (request: NextRequest, context: HandlerContext) => {
      try {
        const query = Object.fromEntries(
          request.nextUrl.searchParams.entries()
        );
        context.validatedQuery = schema.parse(query);
        return handler(request, context);
      } catch (error) {
        return handleZodError(error, 'Query');
      }
    };
  };
}

/**
 * HOF: Validate JSON body of request by Zod.
 *
 * - Source: `await request.json()` (expects a valid JSON body).
 * - Example: `api/chat/123` with body `{ message: 'Hello, world!' }` → `{ message: 'Hello, world!' }`
 * - On success, attaches parsed data to `context.validatedBody`.
 * - Note: The request body stream is consumed here; do not call `request.json()` again in the handler.
 */
export function withValidatedBody<T extends z.ZodType<any, any>>(schema: T) {
  return function (handler: ApiHandler): ApiHandler {
    return async (request: NextRequest, context: HandlerContext) => {
      try {
        const body = await request.json();
        context.validatedBody = schema.parse(body);
        return handler(request, context);
      } catch (error) {
        // Handle cases where body is not valid JSON
        if (error instanceof SyntaxError) {
          return NextResponse.json(
            { error: { message: 'Invalid JSON body.' } },
            { status: 400 }
          );
        }
        return handleZodError(error, 'Body');
      }
    };
  };
}

// --- Error Handling Utility ---

function handleZodError(error: unknown, target: 'Path' | 'Query' | 'Body') {
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((err: ZodIssue) => ({
      path: err.path.join('.'),
      message: err.message,
    }));

    return NextResponse.json(
      {
        error: {
          message: `${target} validation failed.`,
          details: formattedErrors,
        },
      },
      { status: 400 }
    );
  }

  console.error(
    `An unexpected error occurred during ${target} validation:`,
    error
  );
  return NextResponse.json(
    { error: { message: 'An internal server error occurred.' } },
    { status: 500 }
  );
}
