'use client';

import { useEffect } from 'react';

import { NextApi } from '@/lib/api';

export default function ChatView() {
  useEffect(() => {
    const fetchSessions = async () => {
      const response = await NextApi.get('/api/session?userId=123');

      console.log(response);
    };

    fetchSessions();
  }, []);

  return <></>;
}
