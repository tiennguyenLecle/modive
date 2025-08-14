'use client';

import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';

import {
  Logo,
  SocialApple,
  SocialGoogle,
  SocialKakaoTalk,
} from '@/assets/icons';
import { useAuth } from '@/lib/authentication/auth-context';
import { cx } from '@/utils/method';

export default function LoginClient() {
  const t = useTranslations('login_page');
  const { signInWithProvider } = useAuth();

  return (
    <>
      <Logo />
      <p className="mb-32 text-14">{t('description')}</p>

      <div className="flex flex-col gap-20">
        <LoginButton
          className="bg-white text-black"
          icon={<SocialGoogle className="size-20" />}
          onClick={async () => {
            await signInWithProvider('google');
          }}
        >
          {t('login_with_google')}
        </LoginButton>
        <LoginButton
          className="bg-[#FEE500] text-black"
          icon={<SocialKakaoTalk className="size-20" />}
          onClick={async () => {
            await signInWithProvider('kakao');
          }}
        >
          {t('login_with_kakao')}
        </LoginButton>
        <LoginButton
          className="bg-black text-white"
          icon={<SocialApple className="size-20" />}
          onClick={async () => {
            await signInWithProvider('apple');
          }}
        >
          {t('login_with_apple')}
        </LoginButton>
      </div>
    </>
  );
}

function LoginButton({
  children,
  icon,
  className,
  ...props
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
} & ComponentProps<'button'>) {
  return (
    <button
      className={cx(
        'flex items-center gap-12 rounded-4 px-20 py-8 shadow-md transition-shadow duration-300 hover:shadow-xl',
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
