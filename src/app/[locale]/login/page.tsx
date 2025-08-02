'use client';

import { Button, Card, Flex, Typography } from 'antd';
import { signIn } from 'next-auth/react';

const { Title } = Typography;

export default function LoginPage() {
  return (
    <Flex align="center" justify="center" style={{ minHeight: '80vh' }}>
      <Card style={{ minWidth: 350, textAlign: 'center' }}>
        <Title level={3}>Login</Title>
        <p>Choose a login method to continue.</p>
        <Button
          type="primary"
          size="large"
          style={{ width: '100%' }}
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          Login with Google
        </Button>
      </Card>
    </Flex>
  );
}
