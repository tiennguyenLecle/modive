import { MetadataRoute } from 'next';

import { SUPPORTED_LOCALES } from '@/lib/locale';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Define your app routes
  const routes = ['', '/chat', '/goods', '/me'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and route
  SUPPORTED_LOCALES.forEach(locale => {
    routes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: SUPPORTED_LOCALES.reduce(
            (acc, lang) => {
              acc[lang] = `${baseUrl}/${lang}${route}`;
              return acc;
            },
            {} as Record<string, string>
          ),
        },
      });
    });
  });

  return sitemap;
}
