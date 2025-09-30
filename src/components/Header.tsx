'use client';

import { ComponentProps, useCallback, useEffect, useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import {
  Alarm,
  ArrowRight,
  Cart,
  Cash,
  LogoMoit,
  Search,
} from '@/assets/icons';
import { myCartAtom } from '@/atoms/goodsAtom';
import { messageCountAtom, roomListAtom } from '@/atoms/messagesAtom';
import { Badge } from '@/components';
import { useServiceWorkerMessages } from '@/hooks/useServiceWorkerMessages';
import { useMeExtraData } from '@/hooks/useUser';
import { useAuth } from '@/lib/authentication/auth-context';
import { Link } from '@/lib/navigation';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import {
  getRoomDetail,
  updateChatroomField,
} from '@/lib/supabase/swr/chatroom';
import { updateNewMsgCountUser } from '@/lib/supabase/swr/users';
import { ROUTES } from '@/utils/constants';
import { cx, filterMessageConditions } from '@/utils/method';

type HomeHeaderProps = ComponentProps<'header'> & {
  className?: string;
  pageTitle?: string;
  showSearchIcon?: boolean;
  showAlarmIcon?: boolean;
  showCashIcon?: boolean;
  showCartIcon?: boolean;
  showLogoText?: boolean;
  showBackButton?: boolean;
  onClickBackButton?: () => void;
};

const Header = ({
  className,
  pageTitle,
  showSearchIcon,
  showAlarmIcon,
  showCashIcon,
  showCartIcon,
  showLogoText,
  showBackButton,
  onClickBackButton,
  ...rest
}: HomeHeaderProps) => {
  const router = useRouter();
  const t = useTranslations('header.alert_sign_up');
  const { user, checkAvailableUser } = useAuth();
  const { data: userData } = useMeExtraData(!!user, user?.id || '');
  const [messageCount, setMessageCount] = useAtom(messageCountAtom);
  const [roomsAtom, setRoomsAtom] = useAtom(roomListAtom);
  const myCartValue = useAtomValue(myCartAtom);
  const supabase = createBrowserSupabase('user');

  // Handle new message from service worker - update user metadata and room metadata
  const handleNewMessage = async (data: any) => {
    // If user is on the same page, return
    if (window?.location?.href === data.url) {
      return;
    }

    // If message is invisible, return
    if (
      filterMessageConditions(
        data?.message?.content,
        data?.message?.id,
        new Set(),
        data?.message?.metadata?.invisible || false
      )
    ) {
      return;
    }

    const currentCount = messageCount || userData?.metadata?.new_msg_count;
    const newCount = currentCount + 1;

    // Set new message count in user metadata - show in header Alarm Icon
    updateNewMsgCountUser(supabase, user?.id as string, newCount);
    setMessageCount(newCount);

    // Set info - update room metadata - show in room list
    const detail = await getRoomDetail(supabase, data.chatroom_id as string);

    const updatedItem = {
      metadata: {
        new_msg_count: detail?.metadata?.new_msg_count + 1 || 1,
      },
      last_accessed_at: data?.message?.created_at,
      last_message: data?.message?.content,
    };

    updateChatroomField(data.chatroom_id as string, supabase, updatedItem);
    setRoomsAtom(
      roomsAtom.map(room =>
        room.room_id === data.chatroom_id ? { ...room, ...updatedItem } : room
      )
    );
  };

  useServiceWorkerMessages(handleNewMessage);
  // Handle new message from service worker - update user metadata and room metadata

  useEffect(() => {
    setMessageCount(userData?.metadata?.new_msg_count || 0);
  }, [userData, user]);

  const titlePaddingX = useMemo(() => {
    const paddingRight =
      [showSearchIcon, showAlarmIcon, showCashIcon, showCartIcon].filter(
        Boolean
      ).length * 32;

    const paddingLeft = showLogoText ? 80 : 0 + (showBackButton ? 24 : 0);

    if (paddingLeft === 0 || paddingLeft < paddingRight) {
      return [paddingRight, paddingRight];
    } else {
      return [paddingLeft, paddingLeft];
    }
  }, [
    showSearchIcon,
    showAlarmIcon,
    showCashIcon,
    showCartIcon,
    showLogoText,
    showBackButton,
  ]);

  const totalCartItem = useMemo(
    () => myCartValue?.items?.length || 0,
    [myCartValue]
  );

  const checkDirectable = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!user) {
        event.stopPropagation();
        event.preventDefault();
        checkAvailableUser({
          description: t('login_to_use'),
        });
      }
    },
    [user, checkAvailableUser, t]
  );

  return (
    <header
      className={cx(
        'relative flex min-h-56 w-full items-center justify-center bg-white px-16',
        className
      )}
      {...rest}
    >
      <div className="absolute left-16 flex cursor-pointer items-center gap-12">
        {showBackButton && (
          <ArrowRight
            className="size-24 rotate-180 cursor-pointer text-gray-00 transition-colors hover:bg-gray-90"
            onClick={() => {
              if (onClickBackButton) {
                onClickBackButton();
              } else {
                router.back();
              }
            }}
          />
        )}
        {showLogoText && (
          <Link href={ROUTES.HOME}>
            <LogoMoit className="h-24 text-primary" />
          </Link>
        )}
      </div>

      {pageTitle && (
        <h2
          className="line-clamp-1 min-w-0 flex-1 text-center text-16 font-semibold text-gray-00"
          title={pageTitle}
          style={{
            paddingLeft: titlePaddingX[0],
            paddingRight: titlePaddingX[1],
          }}
        >
          {pageTitle}
        </h2>
      )}

      {(showSearchIcon || showAlarmIcon || showCashIcon || showCartIcon) && (
        <div className="absolute right-16 flex items-center gap-12">
          {showSearchIcon && (
            <Link href="#">
              <Search width={24} height={24} />
            </Link>
          )}
          {showAlarmIcon && (
            <Link href="#" className="h-24" onClick={checkDirectable}>
              <Badge.Wrapper count={messageCount || 0} showZero>
                <Alarm width={24} height={24} className="text-gray-00" />
              </Badge.Wrapper>
            </Link>
          )}
          {showCashIcon && (
            <Link href={ROUTES.MANAGEMENT.MY_CASH} onClick={checkDirectable}>
              <Cash width={24} height={24} />
            </Link>
          )}
          {showCartIcon && (
            <Link
              href={ROUTES.SHOPPING_CART}
              onClick={checkDirectable}
              className="h-24"
            >
              <Badge.Wrapper count={totalCartItem}>
                <Cart width={24} height={24} className="text-gray-00" />
              </Badge.Wrapper>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
