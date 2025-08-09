'use client';

import { AuthActions } from '@/components/auth/AuthActions';
import { useAuth } from '@/lib/authentication/auth-context';

export default function ViewSession() {
  const { user } = useAuth();

  console.log('user', user);
  return (
    <div>
      <AuthActions />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
