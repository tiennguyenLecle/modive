'use client';

import { Avatar, Button, Dropdown, MenuProps, Space, Spin } from 'antd';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/auth-context';
import { ROUTES } from '@/utils/constants';

export function AuthActions() {
  const { status, session, signOut } = useAuth();
  const router = useRouter();

  if (status === 'loading') return <Spin />;

  const handleLogout = async () => {
    await signOut();
    router.push(ROUTES.HOME);
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
            <Avatar src={session?.user?.user_metadata?.avatar_url} />
            {session?.user?.user_metadata?.name || session?.user?.email}
          </Space>
        </a>
      </Dropdown>
    );
  }

  return <Button onClick={() => router.push('/login')}>Login</Button>;
}
