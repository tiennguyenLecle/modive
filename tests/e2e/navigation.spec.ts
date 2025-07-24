import { expect, test } from '@playwright/test';

import en from '../../messages/en.json';
import kr from '../../messages/kr.json';

test.describe('Navigation and SEO', () => {
  const enDefaultTitle = en.default.metadata.title;

  test('should redirect to the default locale (en) and have correct title', async ({
    page,
  }) => {
    // Navigate to the root URL
    await page.goto('/');

    // Check that the URL is now /en
    await expect(page).toHaveURL('/en');

    // The homepage should have the default title
    await expect(page).toHaveTitle(
      `${en.home_page.metadata.title} | ${enDefaultTitle}`
    );
  });

  test('should show the Korean page for /kr and have correct title', async ({
    page,
  }) => {
    // Navigate directly to the /kr URL
    await page.goto('/kr');

    // Check that the URL is correctly /kr
    await expect(page).toHaveURL('/kr');

    const koreanDefaultTitle = kr.default.metadata.title;
    await expect(page).toHaveTitle(
      `${kr.home_page.metadata.title} | ${koreanDefaultTitle}`
    );
  });

  test('should apply title template on child pages (e.g., /chat)', async ({
    page,
  }) => {
    await page.goto('/en/chat');

    const chatPageTitle = en.chat_page.metadata.title;
    const expectedTitle = `${chatPageTitle} | ${enDefaultTitle}`;

    await expect(page).toHaveTitle(expectedTitle);
  });

  test('should have correct hreflang tags for SEO', async ({ page }) => {
    await page.goto('/en');

    // Find the hreflang tags in the head of the document
    const hreflangEn = await page.locator('link[hreflang="en"]');
    const hreflangKr = await page.locator('link[hreflang="kr"]');

    // Assert that the tags exist and have the correct href attributes
    await expect(hreflangEn).toHaveAttribute(
      'href',
      'http://localhost:3000/en'
    );
    await expect(hreflangKr).toHaveAttribute(
      'href',
      'http://localhost:3000/kr'
    );
  });
});
