// Helper function to get locale from current location
function getLocaleFromLocation() {
  // Extract locale from current location pathname
  const pathname = location?.pathname;
  const localeMatch = pathname?.match(/^\/([a-z]{2})\//);

  // Return detected locale or fallback to 'ko' (default)
  return localeMatch && localeMatch.length > 1 ? localeMatch[1] : 'ko';
}

self.addEventListener('push', event => {
  const handlePushEvent = async () => {
    try {
      const eventData = event.data?.json() || {};

      const eventType = eventData.event;

      switch (eventType) {
        case 'message.created': {
          const title = 'New message!';
          const body = eventData?.message?.content || 'You have a new message';
          const locale = getLocaleFromLocation();
          const url = `${location.origin}/${locale}/chat/${eventData.chatroom_id}?sessionId=${eventData.metadata.session_id}`;
          const options = {
            body,
            data: { ...eventData, url },
            icon: '/favicon.ico',
            badge: '/favicon.ico',
          };

          clients.matchAll({ type: 'window' }).then(clientList => {
            if (clientList?.length > 0) {
              for (const client of clientList) {
                if (!client?.url?.includes(url)) {
                  client.postMessage({
                    type: 'NEW_MESSAGE',
                    data: { ...eventData, url },
                  });
                  return self.registration.showNotification(title, options);
                }
              }
            }
          });
        }

        default:
          return;
      }
    } catch (error) {
      console.error('Error handling push event:', error);
    }
  };

  event.waitUntil(handlePushEvent());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // // Check if there's already a window open with the same URL
      // for (const client of clientList) {
      //   if (client.url === url) {
      //     return client.focus();
      //   }
      // }
      // If no existing window, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Listen for messages from the main thread
self.addEventListener('message', event => {
  console.log('Service worker received message:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
