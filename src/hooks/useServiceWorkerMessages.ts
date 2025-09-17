import { useCallback, useEffect } from 'react';

type ServiceWorkerMessage = {
  type: 'NEW_MESSAGE';
  data: {
    event: string;
    message: {
      content: string;
    };
    chatroom_id: string;
  };
};

/**
 * Hook to listen for messages from the service worker
 * This allows the app to react to push notifications even when it's active
 */
export function useServiceWorkerMessages(
  onNewMessage?: (messageData: ServiceWorkerMessage['data']) => void
) {
  const handleMessage = useCallback(
    async (event: MessageEvent<ServiceWorkerMessage>) => {
      if (event.data?.type === 'NEW_MESSAGE') {
        onNewMessage?.(event.data.data);
      }
    },
    [onNewMessage]
  );

  useEffect(() => {
    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);
}
