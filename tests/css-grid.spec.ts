import { test, expect } from '@playwright/test';

test.describe('Site presentation', () => {
  test('home page serves compiled CSS from /_astro', async ({ page }) => {
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

    expect(cssResponses.length).toBeGreaterThan(0);
    expect(cssResponses[0]?.length ?? 0).toBeGreaterThan(200);
  });

  test('writing archive renders post cards', async ({ page }) => {
    await page.goto('/writing/');
    const cards = page.locator('[data-testid="post-card"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
