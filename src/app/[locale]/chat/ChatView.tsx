'use client';

import { useEffect, useState } from 'react';

import { NextApi } from '@/lib/api';

export default function ChatView() {
  const [sessions, setSessions] = useState<any>();
  useEffect(() => {
    const fetchSessions = async () => {
      await NextApi.get('/api/session').then(setSessions);
    };

    fetchSessions();
  }, []);

  return (
    <div className="container min-h-0 overflow-auto">
      <h2 className="text-22 font-semibold">User sessions</h2>
      {JSON.stringify(sessions)}
    </div>
  );
}
