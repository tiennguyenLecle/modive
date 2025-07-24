import { LOCALE_TO_RFC5646 } from '@/lib/locale';

// Helper functions are kept private to this module and are not exported.
function getWebsiteSchema(locale: string, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Modive',
    description:
      locale === 'kr'
        ? '현대적인 AI 챗봇 애플리케이션'
        : 'A modern AI chatbot application',
    url: baseUrl,
    inLanguage: LOCALE_TO_RFC5646[locale] || 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    author: {
      '@type': 'Organization',
      name: 'Modive Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Modive',
    },
  };
}

function getWebApplicationSchema(locale: string, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Modive',
    description:
      locale === 'kr'
        ? '현대적인 AI 챗봇 애플리케이션'
        : 'A modern AI chatbot application',
    url: baseUrl,
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Modern web browser with JavaScript enabled',
    inLanguage: LOCALE_TO_RFC5646[locale] || 'en-US',
    // TODO: Update this section with the correct price and currency in the future
    // This section is used to determine the price of the app
    // offers: [
    //   // Free Tier
    //   {
    //     "@type": "Offer",
    //     "name": "Free Tier",
    //     "price": "0.00",
    //     "priceCurrency": "USD",
    //     "description": "Access to view public content and basic features."
    //   },
    //   // Premium Plan
    //   {
    //     "@type": "Offer",
    //     "name": "Premium Plan",
    //     "price": "9.99",
    //     "priceCurrency": "USD",
    //     "description": "Unlimited chat, advanced features, and priority support."
    //   }
    // ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Modive Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Modive',
    },
  };
}

interface StructuredDataProps {
  locale: string;
}

/**
 * A component to generate and render both WebSite and WebApplication
 * structured data schemas. It should be used in the <head> of the root layout.
 */
export function StructuredData({ locale }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // If baseUrl is not set, we cannot generate valid schema data with absolute URLs.
  if (!baseUrl) {
    return null;
  }

  const websiteSchema = getWebsiteSchema(locale, baseUrl);
  const webAppSchema = getWebApplicationSchema(locale, baseUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
    </>
  );
}
