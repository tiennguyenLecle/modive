import { expect, test } from '@playwright/test';

import en from '../../messages/en.json';
import kr from '../../messages/kr.json';

test.describe('Locale Detection', () => {
  // Scenario 1: User's browser prefers Korean.
  // Playwright will send the 'Accept-Language: ko-KR' header.
  test.use({ locale: 'ko-KR' });

  test('should redirect a user with Korean locale to /kr', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/kr');
    await expect(page).toHaveTitle(
      `${kr.home_page.metadata.title} | ${kr.default.metadata.title}`
    );
  });
});

test.describe('Locale Fallback', () => {
  // Scenario 2: User's browser prefers Japanese, which is not supported.
  // Playwright will send the 'Accept-Language: ja-JP' header.
  test.use({ locale: 'ja-JP' });

  test('should redirect a user with an unsupported locale to the default locale (/en)', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/en');
    await expect(page).toHaveTitle(
      `${en.home_page.metadata.title} | ${en.default.metadata.title}`
    );
  });
});
