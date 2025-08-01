import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError, type ZodIssue } from 'zod';

// --- Core Utilities ---

export function pipe(...functions: Function[]) {
  return function (initialValue: any) {
    return functions.reduce((composed, fn) => fn(composed), initialValue);
  };
}

export interface HandlerContext {
  params?: { [key: string]: string | string[] | undefined };
  validatedBody?: any;
  validatedQuery?: any;
  validatedParams?: any;
  // F.E: session?: Session
}

export type ApiHandler = (
  request: NextRequest,
  context: HandlerContext
) => Promise<NextResponse> | NextResponse;

// --- Specialized Validation HOFs ---

/**
 * Validates the request's URL path parameters against a Zod schema.
 * On success, attaches the data to `context.validatedParams`.
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
 * Validates the request's URL query parameters against a Zod schema.
 * On success, attaches the data to `context.validatedQuery`.
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
 * Validates the request's JSON body against a Zod schema.
 * On success, attaches the data to `context.validatedBody`.
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
