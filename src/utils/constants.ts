/**
 * The common prefix for all cookies set by the Supabase client.
 */
export const COOKIE_PREFIX_SB = 'modive.sb-auth_token';
/**
 * A separate cookie prefix for Admin sessions to isolate from user cookies.
 */
export const COOKIE_PREFIX_SB_ADMIN = 'modive.admin-auth_token';

export const STORAGE = {
  HIDE_GUIDE_TO_USE: 'hide_guide_to_use',
};

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  INTRODUCTION: '/introduction',
  CHAT: '/chat',
  GOODS: '/goods',
  MANAGEMENT: {
    INDEX: '/management',
    MY_INFORMATION: '/management/my-information',
    MY_CASH: '/management/my-cash',
    // MY_MONEY: '/management/my-money',
    // NOTI_SETTINGS: '/management/noti-settings',
    // ANNOUNCEMENT: '/management/announcement',
  },
  CMS: {
    INDEX: '/cms',
    LOGIN: '/cms/login',
    DATA_MANAGEMENT: {
      INDEX: '/cms/data-management',
      CONTENT: '/cms/data-management/content',
      GOODS: '/cms/data-management/goods',
      NOTIFICATIONS: '/cms/data-management/notifications',
      ANNOUNCEMENTS: {
        INDEX: '/cms/data-management/announcements',
        CREATE: '/cms/data-management/announcements/create',
        EDIT: '/cms/data-management/announcements/edit',
      },
      FAQ: '/cms/data-management/faq',
    },
    INTERFACE: '/cms/interface',
    USER_MANAGEMENT: '/cms/user-management',
  },
};

export const SOCIAL_PROVIDERS = {
  KAKAO: 'kakao',
  GOOGLE: 'google',
  APPLE: 'apple',
};
