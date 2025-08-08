import type { NextRequest } from 'next/server';

export type SupabaseTokenPayload = {
  sub?: string;
  email?: string;
  exp?: number;
  [key: string]: unknown;
};

export function getSupabaseAccessTokenFromRequest(
  request: NextRequest
): string | null {
  // Default cookie names set by @supabase/ssr
  return (
    request.cookies.get('sb-access-token')?.value ||
    request.cookies.get('sb:token')?.value ||
    null
  );
}

export function decodeJwtPayload(token: string): SupabaseTokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );
    const json = Buffer.from(padded, 'base64').toString('utf8');
    return JSON.parse(json) as SupabaseTokenPayload;
  } catch {
    return null;
  }
}

export function isJwtExpired(payload: SupabaseTokenPayload | null): boolean {
  if (!payload?.exp) return true;
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowInSeconds;
}

export function extractUserFromPayload(payload: SupabaseTokenPayload | null) {
  if (!payload?.sub) return null;
  return {
    id: payload.sub,
    email: (payload as any).email as string | undefined,
  };
}
