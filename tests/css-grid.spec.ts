import { test, expect } from '@playwright/test';

test.describe('Site presentation', () => {
  test('home page delivers compiled CSS early', async ({ page }) => {
    const cssResponses: string[] = [];
    page.on('response', async (response) => {
      if (
        response.request().resourceType() === 'stylesheet' &&
        response.url().includes('/_astro/')
      ) {
        try {
          cssResponses.push(await response.text());
        } catch {
          /* swallow network errors */
        }
      }
    });

    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    await page.waitForTimeout(500);

    const inlineCssLength = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('style'))
        .map((styleEl) => styleEl.textContent?.length ?? 0)
        .reduce((total, len) => total + len, 0);
    });

    if (cssResponses.length > 0) {
      expect(cssResponses[0]?.length ?? 0).toBeGreaterThan(200);
    } else {
      expect(inlineCssLength).toBeGreaterThan(200);
    }
  });

  test('writing archive renders post cards', async ({ page }) => {
    await page.goto('/writing/');
    const cards = page.locator('[data-testid="post-card"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
