/**
 * The common prefix for all cookies set by the Supabase client.
 */
export const COOKIE_PREFIX_SB = 'modive.sb-auth_token';
/**
 * A separate cookie prefix for Admin sessions to isolate from user cookies.
 */
export const COOKIE_PREFIX_SB_ADMIN = 'modive.admin-auth_token';

export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  GOODS: '/goods',
  MANAGEMENT: {
    INDEX: '/management',
    MY_INFORMATION: '/management/my-information',
    // MY_MONEY: '/management/my-money',
    // NOTI_SETTINGS: '/management/noti-settings',
    // ANNOUNCEMENT: '/management/announcement',
  },
  CMS: {
    INDEX: '/cms',
    DATA_MANAGEMENT: {
      INDEX: '/cms/data-management',
      CONTENT: '/cms/data-management/content',
      GOODS: '/cms/data-management/goods',
      NOTIFICATIONS: '/cms/data-management/notifications',
      FAQ: '/cms/data-management/faq',
    },
    INTERFACE: '/cms/interface',
    USER_MANAGEMENT: '/cms/user-management',
  },
};
