// hooks/use-server-action.ts
import { useState, useTransition } from 'react';

type ServerAction<T> = (
  ...args: any[]
) => Promise<
  { success: true; data: T } | { success: false; error: string | any }
>;

export function useServerAction<T>(action: ServerAction<T>) {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = async (...args: Parameters<typeof action>): Promise<T> => {
    setError(null);

    return new Promise((resolve, reject) => {
      startTransition(async () => {
        try {
          const result = await action(...args);
          if (result.success) {
            setData(result.data);
            resolve(result.data);
          } else {
            const errorMessage =
              typeof result.error === 'string'
                ? result.error
                : result.error?.message || 'An error occurred';
            setError(errorMessage);
            reject(new Error(errorMessage));
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'An error occurred';
          console.error(errorMessage);
          setError(errorMessage);
          reject(err);
        }
      });
    });
  };

  return {
    execute,
    isPending,
    data,
    error,
  };
}
