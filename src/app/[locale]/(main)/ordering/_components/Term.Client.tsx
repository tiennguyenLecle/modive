'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { isTermCheckedAtom } from '@/atoms/goodsAtom';
import { Checkbox } from '@/components';

type TermProps = {
  className?: string;
};

export default function Term({ className = '' }: TermProps) {
  const t = useTranslations('ordering');
  const [isCheckedList, setIsCheckedList] = useState([true, true, true]);
  const [, setIsTermChecked] = useAtom(isTermCheckedAtom);

  useEffect(() => {
    if (isCheckedList.every(isChecked => isChecked)) {
      setIsTermChecked(true);
    } else {
      setIsTermChecked(false);
    }
  }, [isCheckedList]);

  return (
    <div className={`flex flex-col gap-16 bg-white ${className}`}>
      <h1 className="text-14 font-semibold text-gray-00">{t('term')}</h1>
      <ul className="mb-32 flex flex-col gap-12 text-12 font-normal text-gray-00">
        <li className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-8">
            <Checkbox
              checked={isCheckedList[0]}
              onChange={e =>
                setIsCheckedList([
                  e.target.checked,
                  isCheckedList[1],
                  isCheckedList[2],
                ])
              }
            />
            {t('term_1')}
          </div>
          <Link
            className="underline"
            target="_blank"
            href="https://comfortable-margin-430.notion.site/27a77f3875ab80b0a59bcf3145069d06?pvs=74"
          >
            {t('look')}
          </Link>
        </li>
        <li className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-8">
            <Checkbox
              checked={isCheckedList[1]}
              onChange={e =>
                setIsCheckedList([
                  isCheckedList[0],
                  e.target.checked,
                  isCheckedList[2],
                ])
              }
            />
            {t('term_2')}
          </div>
          <Link
            className="underline"
            target="_blank"
            href="https://comfortable-margin-430.notion.site/3-27d77f3875ab805f8e4ad04682765526?pvs=73"
          >
            {t('look')}
          </Link>
        </li>
        <li className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-8">
            <Checkbox
              checked={isCheckedList[2]}
              onChange={e =>
                setIsCheckedList([
                  isCheckedList[0],
                  isCheckedList[1],
                  e.target.checked,
                ])
              }
            />
            {t('term_3')}
          </div>
          <Link
            className="underline"
            target="_blank"
            href="https://comfortable-margin-430.notion.site/3-27d77f3875ab805f8e4ad04682765526?pvs=73"
          >
            {t('payment_agency_service_link')}
          </Link>
        </li>
      </ul>
    </div>
  );
}
