import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, type NextResponse } from 'next/server';

import { COOKIE_PREFIX_SB, COOKIE_PREFIX_SB_ADMIN } from '@/utils/constants';

function adaptCookies(request: NextRequest, response: NextResponse) {
  return {
    get(name: string) {
      return request.cookies.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
      request.cookies.set({ name, value, ...options });
      response.cookies.set({ name, value, ...options });
    },
    remove(name: string, options: CookieOptions) {
      request.cookies.set({ name, value: '', ...options });
      response.cookies.set({ name, value: '', ...options });
    },
  };
}

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: COOKIE_PREFIX_SB,
      },
      cookies: adaptCookies(request, response),
    }
  );

  await supabase.auth.getUser();

  return response;
}

export async function updateAdminSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: COOKIE_PREFIX_SB_ADMIN,
      },
      cookies: adaptCookies(request, response),
    }
  );

  await supabase.auth.getUser();

  return response;
}
