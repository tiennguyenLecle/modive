import 'server-only';
import type { Locale } from '@/types/locale';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  kr: () => import('@/dictionaries/kr.json').then(module => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (locale === 'kr') {
    return dictionaries.kr();
  }
  return dictionaries.en();
};
