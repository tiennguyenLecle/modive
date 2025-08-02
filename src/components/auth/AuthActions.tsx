'use client';

import { Avatar, Button, Dropdown, MenuProps, Space, Spin } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function AuthActions() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Spin />;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  if (status === 'authenticated') {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: 'My account',
        // onClick: () => router.push('/profile'), // Uncomment and point to your profile page
      },
      {
        key: '2',
        label: 'Logout',
        onClick: handleLogout,
        danger: true,
      },
    ];

    return (
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            <Avatar src={session.user?.image} />
            {session.user?.name || session.user?.email}
          </Space>
        </a>
      </Dropdown>
    );
  }

  return <Button onClick={() => router.push('/login')}>Login</Button>;
}
