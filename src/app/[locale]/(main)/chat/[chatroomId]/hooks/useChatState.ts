import { useCallback, useState } from 'react';

/**
 * Hook for managing chat state including errors and retry logic
 */
export const useChatState = () => {
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const setErrorWithRetry = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const retryOperation = useCallback(
    async (
      operation: () => Promise<any>,
      operationName: string = 'Operation'
    ) => {
      setIsRetrying(true);
      clearError();

      try {
        const result = await operation();
        setIsRetrying(false);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : `${operationName} failed`;
        setErrorWithRetry(errorMessage);
        setIsRetrying(false);
        throw err;
      }
    },
    [clearError, setErrorWithRetry]
  );

  return {
    error,
    isRetrying,
    clearError,
    setErrorWithRetry,
    retryOperation,
  };
};

/**
 * Hook for managing message loading states
 */
export const useMessageLoadingState = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  const startLoadingMore = useCallback(() => {
    setIsLoadingMore(true);
  }, []);

  const stopLoadingMore = useCallback(() => {
    setIsLoadingMore(false);
  }, []);

  const setNoMoreMessages = useCallback(() => {
    setHasMoreMessages(false);
  }, []);

  const resetLoadingState = useCallback(() => {
    setIsLoadingMore(false);
    setHasMoreMessages(true);
  }, []);

  return {
    isLoadingMore,
    hasMoreMessages,
    startLoadingMore,
    stopLoadingMore,
    setNoMoreMessages,
    resetLoadingState,
  };
};
