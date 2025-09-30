'use client';

import { useEffect, useMemo } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

import { createBrowserSupabase } from '@/lib/supabase/factory';

const AmplitudeSetup = () => {
  const API_KEY = '6e31172ebc637e8aa9e4b73c3d84ca06';
  const supabase = useMemo(() => createBrowserSupabase('user'), []);

  // Initialize Amplitude
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Check for development environment (localhost)
    const isDevelopment =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.includes('192.168');

    // Initialize after DOM is fully loaded
    const initAmplitude = () => {
      try {
        amplitude.add(sessionReplayPlugin());
        amplitude.init(API_KEY, {
          minIdLength: 1,
          // Minimize autocapture in development environment
          defaultTracking: isDevelopment
            ? {
                sessions: true,
                pageViews: false,
                formInteractions: false,
                fileDownloads: false,
              }
            : {
                attribution: true,
                pageViews: true,
                sessions: true,
                formInteractions: true,
                fileDownloads: true,
              },
        });

        // Log successful initialization in development
        if (isDevelopment) {
          console.log('Amplitude initialized in development mode');
        }
      } catch (error) {
        console.error('Amplitude initialization failed:', error);
      }
    };

    // Initialize after page is fully loaded
    if (document.readyState === 'complete') {
      initAmplitude();
    } else {
      window.addEventListener('load', initAmplitude);
      return () => window.removeEventListener('load', initAmplitude);
    }
  }, []);

  // Set and reset user ID
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        amplitude.setUserId(session.user.id);
      } else {
        amplitude.setUserId(undefined);
        amplitude.reset();
      }
    });

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id) {
        // On login: set user ID
        amplitude.setUserId(session.user.id);
      } else {
        // On logout: reset user ID
        amplitude.setUserId(undefined);
        amplitude.reset();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return <></>;
};

export default AmplitudeSetup;
