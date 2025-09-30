/**
 * Utility functions for Amplitude event tracking
 */

/**
 * Safely get location information
 * Returns empty object on server-side
 */
export const getLocationInfo = () => {
  if (typeof window === 'undefined') {
    return {
      url: '',
      pathname: '',
      hostname: '',
    };
  }

  try {
    const location = window.location;
    return {
      url: location.href || '',
      pathname: location.pathname || '',
      hostname: location.hostname || '',
    };
  } catch (error) {
    console.error('Failed to get location info:', error);
    return {
      url: '',
      pathname: '',
      hostname: '',
    };
  }
};

/**
 * Returns common location properties for Amplitude events
 */
export const getAmplitudeLocationProperties = () => {
  const { url, pathname, hostname } = getLocationInfo();
  return {
    '[Amplitude] Page Location': url,
    '[Amplitude] Page Path': pathname,
    '[Amplitude] Page Domain': hostname,
  };
};
