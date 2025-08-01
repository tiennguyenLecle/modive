import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError, type ZodIssue } from 'zod';

/**
 * A utility function to compose multiple Higher-Order Functions (HOFs).
 */
export function pipe(...functions: Function[]) {
  return function (initialValue: any) {
    return functions.reduce((composed, fn) => fn(composed), initialValue);
  };
}

/**
 * The context object passed between HOFs.
 */
export interface HandlerContext {
  validatedBody?: any;
  validatedQuery?: any;
  // F.E: session?: Session
}

/**
 * A type definition for our API route handlers.
 */
export type ApiHandler = (
  request: NextRequest,
  context: HandlerContext
) => Promise<NextResponse> | NextResponse;

type ValidationOptions = {
  target: 'body' | 'query';
};

/**
 * A versatile HOF for validating incoming request data (either body or query params)
 * against a Zod schema.
 *
 * If validation succeeds, the parsed data is attached to `context.validatedBody` or
 * `context.validatedQuery` based on the target.
 *
 * If validation fails, it returns a 400 response with detailed error messages.
 *
 * @param {z.ZodType<any, any>} schema - The Zod schema to validate against.
 * @param {ValidationOptions} [options={ target: 'body' }] - Configuration for the validation target.
 * @returns {Function} A HOF that can be used in the `pipe`.
 */
export function withValidation<T extends z.ZodType<any, any>>(
  schema: T,
  options: ValidationOptions = { target: 'body' }
) {
  return function (handler: ApiHandler): ApiHandler {
    return async (request: NextRequest, context: HandlerContext) => {
      try {
        let dataToValidate: any;
        if (options.target === 'query') {
          dataToValidate = Object.fromEntries(
            request.nextUrl.searchParams.entries()
          );
        } else {
          dataToValidate = await request.json();
        }

        const validatedData = schema.parse(dataToValidate);

        if (options.target === 'query') {
          context.validatedQuery = validatedData;
        } else {
          context.validatedBody = validatedData;
        }

        return handler(request, context);
      } catch (error) {
        if (error instanceof ZodError) {
          const formattedErrors = error.issues.map((err: ZodIssue) => ({
            path: err.path.join('.'),
            message: err.message,
          }));

          return NextResponse.json(
            {
              error: {
                message: `Validation failed for request ${options.target}.`,
                details: formattedErrors,
              },
            },
            { status: 400 }
          );
        }

        console.error(
          `An unexpected error occurred during ${options.target} validation:`,
          error
        );
        return NextResponse.json(
          { error: { message: 'An internal server error occurred.' } },
          { status: 500 }
        );
      }
    };
  };
}
