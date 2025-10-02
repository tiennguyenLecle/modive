/**
 * Check if the current environment is KakaoTalk in-app browser
 */
export const isInKakaoInAppBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent || '';
  return /KAKAOTALK/i.test(userAgent);
};

/**
 * Open external browser from KakaoTalk in-app browser
 */
export const openExternalBrowser = (url?: string): void => {
  const targetUrl = url || window.location.href;
  const externalUrl = `kakaotalk://web/openExternal?url=${encodeURIComponent(
    targetUrl
  )}`;

  window.location.href = externalUrl;
};
