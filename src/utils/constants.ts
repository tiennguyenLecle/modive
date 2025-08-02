/**
 * The cookie name for storing the user ID, potentially for legacy purposes
 * or anonymous tracking before a full session is established.
 */
export const COOKIE_USER_ID = 'modive.user_id';

/**
 * The name of the cookie used by our manual JWT implementation (jose).
 * Note: This might be deprecated in favor of NextAuth's session cookie.
 */
export const COOKIE_SESSION_NAME = 'modive.session';
