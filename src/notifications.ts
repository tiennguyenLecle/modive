'use client';

import { createBrowserSupabase } from '@/lib/supabase/factory';

async function subscribeChatEvents(sub: any, supabase: any) {
  try {
    // Default values
    let userAgent = navigator?.userAgent || 'unknown';
    let browser = 'unknown';
    let platform = 'unknown';

    // Use User-Agent Client Hints if available
    if (userAgent) {
      const uaData: any = userAgent;

      // Browser brand/version info
      if (uaData.brands && uaData.brands.length) {
        browser = uaData.brands
          .map((b: any) => `${b.brand} ${b.version}`)
          .join(', ');
      }

      // Platform info (e.g., "macOS", "Windows", "Android")
      if (uaData.platform) {
        platform = uaData.platform;
      }
    }

    const { data, error } = await supabase.functions.invoke(
      'webhooks/subscribe-chat-events',
      {
        body: {
          // Required subscription info
          ...sub,
          // Optional data
          user_agent: userAgent,
          browser,
          platform,
        },
      }
    );

    return { data, error };
  } catch (err) {
    throw err;
  }
}

function urlB64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replaceAll('-', '+')
    .replaceAll('_', '/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(ch => ch.charCodeAt(0)));
}

async function backgroundRegisterSW() {
  if (!('serviceWorker' in navigator)) {
    console.warn('backgroundRegisterSW: Service Worker not supported');
    return null;
  }

  try {
    const reg = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    return reg;
  } catch (error) {
    console.error(
      'backgroundRegisterSW: Failed to register service worker',
      error
    );
    return null;
  }
}

async function getOrCreateSubscription(reg: any) {
  if (!('PushManager' in window)) return null;

  //const existing = await reg.pushManager.getSubscription();
  //if (existing) return existing.toJSON();

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission is not granted.');
    return null;
  }

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
    ),
  });

  return sub?.toJSON();
}

async function backgroundSubscribe(supabase: any) {
  try {
    const reg = await backgroundRegisterSW();
    if (!reg) {
      console.warn(
        'backgroundSubscribe: No service worker registration available'
      );
      return;
    }

    if (Notification.permission === 'granted') {
      const sub = await getOrCreateSubscription(reg);
      if (sub) {
        // Send subscription to server
        // [OPTION 1] Invoke edge function
        const { data: subscription, error: subscriptionError } =
          await subscribeChatEvents(sub, supabase);

        // [OTHER 2] Use supabase to upsert subscription to `web_push_subscriptions` table
        // const { data: subscription, subscriptionError } = await supabase
        //   .from('web_push_subscriptions')
        //   .upsert(sub, { onConflict: 'endpoint' });
        // if (subscriptionError || !subscription) {
        //   throw subscriptionError
        //     ? subscriptionError
        //     : new Error('Failed to upsert subscription');
        // }

        if (subscriptionError) {
          console.error('Push subscription error:', subscriptionError);
        }
      }
    } else {
      console.warn(
        'Notification permission is not granted. Current status:',
        Notification.permission
      );
    }
  } catch {
    console.error('Error subscribing to push notifications');
  }
}

async function requestNotificationPermission() {
  const supabase = createBrowserSupabase('user');
  try {
    if (!('Notification' in window)) {
      return { granted: false, error: 'Notifications not supported' };
    }

    if (Notification.permission === 'granted') {
      return { granted: true, permission: 'granted' };
    }

    if (Notification.permission === 'denied') {
      return { granted: false, permission: 'denied' };
    }

    // Request permission
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      // If permission is granted, try to subscribe to push notifications
      try {
        await backgroundSubscribe(supabase);
        return { granted: true, permission: 'granted' };
      } catch (error) {
        console.error('Error subscribing after permission granted:', error);
        return {
          granted: true,
          permission: 'granted',
          subscriptionError: error,
        };
      }
    } else {
      return { granted: false, permission };
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return { granted: false, error };
  }
}

function getNotificationPermissionStatus() {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export {
  backgroundRegisterSW,
  backgroundSubscribe,
  requestNotificationPermission,
  getNotificationPermissionStatus,
};
