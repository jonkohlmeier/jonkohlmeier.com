import { test, expect } from '@playwright/test';

test.describe('Site presentation', () => {
  test('home page serves compiled CSS assets', async ({ page }) => {
    const cssResponses: Array<Promise<string>> = [];
    page.on('response', (response) => {
      if (
        response.request().resourceType() === 'stylesheet' &&
        response.url().includes('/_astro/')
      ) {
        cssResponses.push(response.text());
      }
    });

    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();

    await page.waitForTimeout(500);
    expect(cssResponses.length).toBeGreaterThan(0);

    const firstStylesheet = await cssResponses[0];
    expect(firstStylesheet.length).toBeGreaterThan(200);
  });

  test('writing grid renders post cards', async ({ page }) => {
    await page.goto('/writing/');
    const cards = page.locator('article[data-testid="post-card"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
