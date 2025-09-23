'use client';

import Script from 'next/script';

import Ordering from './_components/Ordering.Client';

export default function ShoppingCartPage() {
  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
      <div data-no-navigation>
        <Ordering />
      </div>
    </>
  );
}
