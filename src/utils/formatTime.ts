import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import { getCookie } from './cookies';

type Mode = 'date' | 'time';

export const formatDateOrTime = (
  time: string,
  mode: Mode = 'date'
) => {
  const locale = getCookie('NEXT_LOCALE') ?? 'ko';
  if (!time) return '';

  const date = dayjs(time);
  if (!date.isValid()) return '';

  let formatStr = '';
  if (mode === 'date') {
    formatStr = locale === 'ko' ? 'YYYY년 M월 D일 dddd' : 'dddd, MMMM D, YYYY';
  } else if (mode === 'time') {
    if (locale === 'ko') {
        // h:mm A → 오전/오후 자동 + 12h format
        formatStr = 'A hh:mm';
      } else {
        formatStr = 'hh:mm A';
      }
  }
  return date.locale(locale).format(formatStr);
};

