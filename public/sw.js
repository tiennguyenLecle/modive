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

          // Try to get clients with a small delay to ensure they're registered
          const handleClients = async () => {
            try {
              // First try immediately
              let clientList = await clients.matchAll({ type: 'window' });

              // If no clients found, wait a bit and try again
              if (clientList.length === 0) {
                await new Promise(resolve => setTimeout(resolve, 200));
                clientList = await clients.matchAll({ type: 'window' });
              }

              // Always wait a bit more to ensure all clients are registered
              if (clientList.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 50));
                clientList = await clients.matchAll({ type: 'window' });
              }

              let messageSent = false;

              if (clientList?.length > 0) {
                let hasActiveTab = false;

                for (const client of clientList) {
                  // Check if this client is exactly the same URL (same tab)
                  if (client.url === url) {
                    hasActiveTab = true;
                    break;
                  }

                  // Check if both are in the same chatroom (extract chatroomId)
                  const targetChatroomMatch = url.match(/\/chat\/([a-f0-9-]+)/);
                  const clientChatroomMatch =
                    client.url.match(/\/chat\/([a-f0-9-]+)/);

                  if (targetChatroomMatch && clientChatroomMatch) {
                    const targetChatroomId = targetChatroomMatch[1];
                    const clientChatroomId = clientChatroomMatch[1];

                    if (targetChatroomId === clientChatroomId) {
                      hasActiveTab = true;
                      break;
                    }
                  }
                }

                // Only send postMessage and show notification if user is NOT on the target tab
                if (!hasActiveTab) {
                  for (const client of clientList) {
                    client.postMessage({
                      type: 'NEW_MESSAGE',
                      data: { ...eventData, url },
                    });
                    messageSent = true;
                  }

                  return self.registration.showNotification(title, options);
                } else {
                  return Promise.resolve();
                }
              }

              // If no clients found, show notification
              return self.registration.showNotification(title, options);
            } catch (error) {
              return self.registration.showNotification(title, options);
            }
          };

          handleClients();
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
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Service Worker activation
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Service Worker installation - v2.0
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Force update Service Worker
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'FORCE_UPDATE') {
    self.skipWaiting();
  }
});
