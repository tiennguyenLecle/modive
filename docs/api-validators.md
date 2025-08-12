# API Request Validators

This document explains how we validate request components (params, query, body) using Zod-based Higher-Order Functions (HOFs).

## Location

- Implementation: `src/lib/api/middleware/validators.ts`

## HOFs

- `withValidatedParams(schema)`
  - Source: `context.params` from Next.js dynamic segments.
  - Example: `api/chat/123` → `{ chatroomId: '123' }`
  - On success: attaches parsed object to `context.validatedParams`.

- `withValidatedQuery(schema)`
  - Source: `request.nextUrl.searchParams` converted into an object via `Object.fromEntries(...)` (last value wins for duplicates).
  - Example: `api/chat/123?limit=10&direction=after` → `{ limit: '10', direction: 'after' }`
  - On success: attaches parsed object to `context.validatedQuery`.
  - Tip: Use `z.coerce.number()` or `refine()` to convert and validate types.

- `withValidatedBody(schema)`
  - Source: `await request.json()` (expects valid JSON body).
  - Example: `api/chat/123` with body `{ message: 'Hello, world!' }` → `{ message: 'Hello, world!' }`
  - On success: attaches parsed object to `context.validatedBody`.
  - Note: do not call `request.json()` again in your handler (stream already consumed).

## Error Handling

All validator HOFs normalize `ZodError` to JSON responses with details:

```json
{
  "error": {
    "message": "Query validation failed.",
    "details": [
      { "path": "page", "message": "Expected number, received string" }
    ]
  }
}
```

## Example

```ts
import { z } from 'zod';

import {
  pipe,
  withValidatedBody,
  withValidatedParams,
  withValidatedQuery,
  type ApiHandler,
} from '@/lib/api/middleware/validators';

const paramsSchema = z.object({ postId: z.string().min(1) });
const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});
const bodySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

const getHandler: ApiHandler = async (_req, ctx) => {
  const { postId } = ctx.validatedParams;
  const { page } = ctx.validatedQuery;
  return new Response(JSON.stringify({ postId, page }), {
    headers: { 'content-type': 'application/json' },
  });
};

export const GET = pipe(
  withValidatedParams(paramsSchema),
  withValidatedQuery(querySchema)
)(getHandler);
```
