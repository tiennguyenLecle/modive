import { notification } from 'antd';
import { useAtom } from 'jotai';
import useSWR from 'swr';

import { myCartAtom } from '@/atoms/goodsAtom';
import { useAuth } from '@/lib/authentication/auth-context';
import { CART_KEY, fetchMyCart } from '@/lib/supabase/swr/cart';

const useMyCart = () => {
  const [myCartValue, setMyCartValue] = useAtom(myCartAtom);
  const { user } = useAuth();

  useSWR(!!user ? CART_KEY.all : null, fetchMyCart, {
    revalidateOnFocus: false,
    onSuccess: data => {
      setMyCartValue(data);
    },
    onError: () => {
      notification.error({
        message: '장바구니 데이터를 불러오는데 실패했습니다.',
      });
      return null;
    },
  });

  return { myCartValue };
};

export default useMyCart;
