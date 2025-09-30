/**
 * The common prefix for all cookies set by the Supabase client.
 */
export const COOKIE_PREFIX_SB = 'modive.sb-auth_token';
/**
 * A separate cookie prefix for Admin sessions to isolate from user cookies.
 */
export const COOKIE_PREFIX_SB_ADMIN = 'modive.admin-auth_token';

export const COOKIE = {
  IS_PROFILE_COMPLETE: 'modive.is_profile_complete',
};

export const STORAGE = {
  HIDE_GUIDE_TO_USE: 'hide_guide_to_use',
  PAYMENT_SUCCESS_CALLBACK: 'payment_success_callback',
  EPISODES_PENDING_PAYMENT: 'episodes_pending_payment',
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
    MY_ORDER_INQUIRY: '/order-inquiry',
    // MY_MONEY: '/management/my-money',
    // NOTI_SETTINGS: '/management/noti-settings',
    // ANNOUNCEMENT: '/management/announcement',
  },
  JOIN_MEMBERSHIP: '/join-membership',
  ORDERING: '/ordering',
  SHOPPING_CART: '/shopping-cart',
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

export const APP_LINKS = {
  PRIVACY_POLICY:
    'https://comfortable-margin-430.notion.site/27a77f3875ab80edbe21cbd2467f7d1d',
  SERVICE_TERMS_AND_CONDITIONS:
    'https://comfortable-margin-430.notion.site/27677f3875ab8043b739e9592c06341a',
  CONSENT_COLLECTION_AND_USE_AGREEMENT:
    'https://comfortable-margin-430.notion.site/27a77f3875ab80b0a59bcf3145069d06',
};
