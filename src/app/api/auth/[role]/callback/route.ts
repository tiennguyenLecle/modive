import { type CookieOptions } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import {
  pipe,
  withValidatedParams,
  withValidatedQuery,
} from '@/lib/api/middleware/validators';
import { createServerSupabase } from '@/lib/supabase/factory.server';

const paramsSchema = z.object({ role: z.enum(['user', 'admin']) });
const querySchema = z.object({
  code: z.string().min(1),
  redirect: z
    .string()
    .optional()
    .transform(v => (v && v.startsWith('/') && !v.startsWith('//') ? v : '/')),
});

async function handler(request: NextRequest, context: any) {
  const { role } = context.validatedParams as z.infer<typeof paramsSchema>;
  const { code, redirect } = context.validatedQuery as z.infer<
    typeof querySchema
  >;

  const response = NextResponse.redirect(
    new URL(redirect, process.env.NEXT_PUBLIC_BASE_URL!)
  );

  const supabase = createServerSupabase(role, {
    get(name: string) {
      return request.cookies.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
      response.cookies.set({ name, value, ...options });
    },
  });

  try {
    await supabase.auth.exchangeCodeForSession(code);
  } catch {}

  return response;
}

export const GET = pipe(
  withValidatedParams(paramsSchema),
  withValidatedQuery(querySchema)
)(handler as any);
