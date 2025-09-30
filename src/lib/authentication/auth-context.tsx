'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { User } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';

import { Info } from '@/assets/icons';
import { Button, Modal } from '@/components';
import { type Role } from '@/lib/authentication/auth.types';
import { usePathname, useRouter } from '@/lib/navigation';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import {
  backgroundRegisterSW,
  backgroundSubscribe,
  requestNotificationPermission,
} from '@/notifications';
import { ROUTES } from '@/utils/constants';

type AuthContextValue = {
  user: User | null;
  signInWithProvider: (
    provider: 'google' | string,
    redirectTo: string | null
  ) => Promise<void>;
  signInWithCredential: (
    email: string,
    password: string,
    redirectTo?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithKakao: () => Promise<void>;
  checkAvailableUser: (props?: {
    description?: string;
    loginDirection?: string;
  }) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
  role: Role;
};

export function AuthProvider({ children, role }: AuthProviderProps) {
  const router = useRouter();
  const supabase = useMemo(() => createBrowserSupabase(role), [role]);
  const [user, setUser] = useState<User | null>(null);
  const modalCheckUserRef = useRef<ModalCheckUserRef>(null);

  useEffect(() => {
    let isActive = true;
    async function init() {
      const { data, error } = await supabase.auth.getSession();
      if (!isActive) return;
      if (error || !data.session) {
        setUser(null);
      } else {
        setUser(data.session.user);
      }
    }
    init();
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!newSession) {
          setUser(null);
        } else {
          setUser(newSession.user);
        }
      }
    );
    return () => {
      isActive = false;
      sub.subscription?.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!user) return;

    const handleLoad = () => {
      requestNotificationPermission();
      // Run service worker registration immediately instead of waiting for idle
      backgroundRegisterSW()
        .then(reg => {
          if (reg) {
            backgroundSubscribe(supabase);
          }
        })
        .catch(error => {
          console.error('Providers: Service worker registration failed', error);
        });
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      // Page is already loaded, run immediately
      handleLoad();
    } else {
      // Page is still loading, wait for the load event
      window.addEventListener('load', handleLoad);

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, [user, supabase]);

  const signInWithProvider = async (
    provider: 'google' | string,
    redirectTo?: string | null
  ) => {
    const defaultRedirectPath =
      role === 'admin' ? ROUTES.CMS.DATA_MANAGEMENT.CONTENT : ROUTES.HOME;

    const redirect = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/${role}/callback?redirect=${encodeURIComponent(redirectTo || defaultRedirectPath)}`;

    await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: { redirectTo: redirect },
    });
  };

  const signInWithKakao = async () => {
    const redirect = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/${role}/kakao-callback`;
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redirect}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  const signInWithCredential = async (
    email: string,
    password: string,
    redirectTo?: string
  ) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    const redirectPath =
      redirectTo ||
      (role === 'admin' ? ROUTES.CMS.DATA_MANAGEMENT.CONTENT : ROUTES.HOME);
    router.push(redirectPath);
  };

  const signOut = async () => {
    await supabase.auth.signOut().then(() => {
      router.push(role === 'admin' ? ROUTES.CMS.LOGIN : ROUTES.HOME);
      // Hard redirect to ensure router cache is cleared and server sees updated cookies
      router.refresh();
    });
  };

  const checkAvailableUser = (props?: {
    description?: string;
    loginDirection?: string;
  }) => modalCheckUserRef.current!.open(props);

  const value: AuthContextValue = {
    user,
    signInWithProvider,
    signInWithCredential,
    signOut,
    signInWithKakao,
    checkAvailableUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ModalCheckUser ref={modalCheckUserRef} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

type ModalCheckUserRef = {
  open: (props?: {
    description?: string;
    loginDirection?: string;
  }) => Promise<boolean>;
  close: () => void;
};

const ModalCheckUser = forwardRef<ModalCheckUserRef>((_, ref) => {
  const t = useTranslations('modal_check_user');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [loginDirection, setLoginDirection] = useState<string | undefined>(
    undefined
  );

  const promiseActions = useRef<{
    resolve: (value: boolean) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const closeHandler = (reason?: any) => {
    promiseActions.current?.reject(reason);
    setIsOpen(false);
    setDescription(undefined);
    setLoginDirection(undefined);
  };

  useImperativeHandle(ref, () => ({
    open: props => {
      if (props?.description) {
        setDescription(props.description);
      }
      if (props?.loginDirection) {
        setLoginDirection(props.loginDirection);
      }
      if (user) {
        return Promise.resolve(true);
      } else {
        setIsOpen(true);
        return new Promise<boolean>((resolve, reject) => {
          promiseActions.current = { resolve, reject };
        });
      }
    },
    close: () => closeHandler('User closed the modal'),
  }));

  return (
    <Modal
      open={isOpen}
      header={
        <div className="space-x-4">
          <Info className="inline-block size-18 text-primary" />
          <span>{t('alarm')}</span>
        </div>
      }
      onCancel={() => closeHandler('User closed the modal')}
      footer={
        <div className="flex gap-8">
          <Button
            variant="secondary"
            onClick={() => {
              closeHandler('User closed the modal');
            }}
          >
            {t('non_member_search')}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              closeHandler('User confirmed to login');
              const returnUrl = loginDirection || pathname;
              router.push(
                `${ROUTES.LOGIN}?returnUrl=${encodeURIComponent(returnUrl)}`
              );
            }}
          >
            {t('join_the_membership')}
          </Button>
        </div>
      }
      zIndex={100}
    >
      <div className="px-16 text-center">
        {/* {description} */} {t('description')}
      </div>
    </Modal>
  );
});

ModalCheckUser.displayName = 'ModalCheckUser';
