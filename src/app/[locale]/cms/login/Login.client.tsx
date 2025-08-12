'use client';

import { useMemo, useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useTranslations } from 'next-intl';

import { Logo } from '@/assets/icons';
import { useAuth } from '@/lib/authentication/auth-context';

export default function CmsLoginClient() {
  const t = useTranslations('cms.login');
  const { signInWithCredential } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const redirectPathAfterLogin = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('callbackUrl') || undefined;
  }, []);

  // Handle credential sign-in using Admin session cookie prefix
  async function onFinish(values: { email: string; password: string }) {
    setSubmitting(true);
    try {
      await signInWithCredential(
        values.email.trim(),
        values.password,
        redirectPathAfterLogin
      );
    } catch (err: any) {
      message.error(err?.message || t('error_generic'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <Logo />
      <h1 className="text-20 font-semibold">{t('title')}</h1>
      <div className="w-full max-w-360">
        <Form
          disabled={submitting}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label={t('email')}
            rules={[
              { required: true, message: t('email') },
              { type: 'email', message: t('email') },
            ]}
          >
            <Input placeholder={t('email')} size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('password')}
            rules={[{ required: true, message: t('password') }]}
          >
            <Input.Password placeholder={t('password')} size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
              size="large"
            >
              {t('submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
