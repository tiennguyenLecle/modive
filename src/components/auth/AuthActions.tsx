'use client';

import { Avatar, Button, Dropdown, MenuProps, Space, Spin } from 'antd';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/authentication/auth-context';
import { ROUTES } from '@/utils/constants';

export function AuthActions() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) return <Spin />;

  const handleLogout = async () => {
    await signOut();
    router.push(ROUTES.HOME);
  };

  if (user) {
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
            <Avatar src={user?.user_metadata?.avatar_url} />
            {user?.user_metadata?.name || user?.email}
          </Space>
        </a>
      </Dropdown>
    );
  }

  return <Button onClick={() => router.push('/login')}>Login</Button>;
}
