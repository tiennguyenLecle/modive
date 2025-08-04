import { BaseApiClient } from '../classes/base';

/**
 * Internal API client for calling our own Next.js API routes (BFF pattern).
 * Safe to use in both Client and Server Components.
 *
 * @example
 * // In client components
 * const data = await NextApi.get('/api/users');
 *
 * // In server components (less optimal, prefer direct server APIs)
 * const data = await NextApi.get('/api/users');
 */
export const NextApi = new BaseApiClient('');
