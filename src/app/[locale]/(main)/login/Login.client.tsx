'use client';

import { ComponentProps, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

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
  const { signInWithProvider, signInWithKakao } = useAuth();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const error =
      searchParams.get('error_description') || searchParams.get('error');
    if (error) {
      setErrorMessage(decodeURIComponent(error.replace(/\+/g, ' ')));
    }
  }, [searchParams]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Logo className="mb-24 mt-100 h-52 w-178" />
      </motion.div>

      <motion.p
        className="mb-100 text-14 text-white"
        style={{
          textShadow: '0 0 16px #FF627B',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        {t('description')}
      </motion.p>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md bg-red-100 text-sm text-red-700 mb-16 p-4 text-center"
        >
          {errorMessage}
        </motion.div>
      )}

      <div className="flex flex-col gap-16">
        <LoginButton
          className="bg-black text-white"
          icon={<SocialApple className="size-24" />}
          animationDelay={0.6}
          onClick={async () => {
            await signInWithProvider('apple', callbackUrl);
          }}
        >
          {t('login_with_apple')}
        </LoginButton>
        <LoginButton
          className="bg-[#FEE500] text-black"
          icon={<SocialKakaoTalk className="size-24" />}
          animationDelay={0.8}
          onClick={async () => {
            await signInWithKakao();
          }}
        >
          {t('login_with_kakao')}
        </LoginButton>
        <LoginButton
          className="border border-gray-70 bg-white text-black"
          icon={<SocialGoogle className="size-24" />}
          animationDelay={1.0}
          onClick={async () => {
            await signInWithProvider('google', callbackUrl);
          }}
        >
          {t('login_with_google')}
        </LoginButton>
      </div>
    </>
  );
}

function LoginButton({
  children,
  icon,
  className,
  animationDelay,
  ...props
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  animationDelay: number;
} & ComponentProps<'button'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: animationDelay, ease: 'easeOut' }}
    >
      <button
        className={cx(
          'flex min-w-292 items-center gap-24 rounded-m px-xxl py-xl text-16 font-medium transition-shadow duration-300 hover:shadow-xl',
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    </motion.div>
  );
}
