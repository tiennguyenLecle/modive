'use client';

import { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { useSession } from 'next-auth/react';

import { NextApi } from '@/lib/api';

// Define a more specific type for the expected data prop
interface ChatViewProps {
  data: { accessToken: string } | null;
}

export default function ChatView({ data }: ChatViewProps) {
  const [sessions, setSessions] = useState<any>();
  const { data: userSession, status } = useSession();

  useEffect(() => {
    const fetchSessions = async () => {
      // Only fetch sessions if we have a logged-in user
      if (status === 'authenticated') {
        try {
          const fetchedSessions = await NextApi.get('/api/session');
          setSessions(fetchedSessions);
        } catch (error) {
          console.error('Failed to fetch user sessions:', error);
          // Optionally, set an error state to show in the UI
        }
      }
    };

    fetchSessions();
  }, [status]); // Rerun effect when authentication status changes

  // Handle the loading state for the user session
  if (status === 'loading') {
    return <Spin tip="Loading session..." fullscreen />;
  }

  return (
    <div className="container min-h-0 overflow-auto p-4">
      <h2 className="text-22 font-semibold">User sessions</h2>
      <pre className="rounded mt-4 bg-gray-100 p-2">
        <code>{JSON.stringify(userSession, null, 2)}</code>
      </pre>

      <pre className="rounded mt-4 bg-gray-100 p-2">
        <code>{JSON.stringify(sessions, null, 2)}</code>
      </pre>
      {!data ? (
        <div className="container p-4">
          <Alert
            message="Connection Error"
            description="Could not connect to the chat service. Please try again later."
            type="error"
            showIcon
          />
        </div>
      ) : (
        <div>{JSON.stringify(data)}</div>
      )}
    </div>
  );
}
