import { expect, test } from '@playwright/test';

test.describe('Site functionality', () => {
  test('primary navigation identifies the current page', async ({ page }) => {
    await page.goto('/about/');

    const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
    await expect(navigation.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('mobile navigation opens and closes from the keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const toggle = page.locator('[data-menu-toggle]');
    const navigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(toggle).toHaveAccessibleName('Open navigation');
    await expect(navigation).toBeHidden();

    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAccessibleName('Close navigation');
    await expect(navigation).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
  });

  test('theme choice persists across navigation', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();

    const toggle = page.getByRole('button', { name: 'Toggle dark mode' });
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

    await page.goto('/writing/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('archive filters support direct links and reset to all writing', async ({ page }) => {
    await page.goto('/writing/?category=life-and-reflection');

    const selectedFilter = page.getByRole('button', { name: 'Life & Reflection' });
    const allArticles = page.locator('article[data-testid="post-card"]');
    const visibleArticles = page.locator('article[data-testid="post-card"]:visible');
    await expect(selectedFilter).toHaveAttribute('aria-pressed', 'true');
    expect(await visibleArticles.count()).toBeGreaterThan(0);
    expect(await visibleArticles.evaluateAll((articles) => articles.map((article) => article.getAttribute('data-category'))))
      .toEqual(Array(await visibleArticles.count()).fill('life-and-reflection'));

    await page.getByRole('button', { name: 'All', exact: true }).click();
    await expect(page).toHaveURL('/writing/');
    await expect(visibleArticles).toHaveCount(await allArticles.count());
  });

  test('RSS and sitemap endpoints expose published routes', async ({ request }) => {
    const rssResponse = await request.get('/rss.xml');
    expect(rssResponse.ok()).toBeTruthy();
    expect(rssResponse.headers()['content-type']).toMatch(/(?:application|text)\/xml/);
    const rss = await rssResponse.text();
    expect(rss).toContain('<title>Puffs of Smoke</title>');
    expect(rss).toContain('/blog/revenue-operations/');

    const sitemapResponse = await request.get('/sitemap-index.xml');
    expect(sitemapResponse.ok()).toBeTruthy();
    expect(await sitemapResponse.text()).toContain('sitemap-0.xml');

    const routesResponse = await request.get('/sitemap-0.xml');
    expect(routesResponse.ok()).toBeTruthy();
    const routes = await routesResponse.text();
    expect(routes).toContain('https://jonkohlmeier.com/writing/');
    expect(routes).toContain('https://jonkohlmeier.com/blog/revenue-operations/');
  });

  test('privacy controls reopen after declining analytics', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByRole('dialog', { name: 'Analytics consent' });
    await banner.getByRole('button', { name: 'Decline' }).click();
    await expect(banner).toBeHidden();

    await page.getByRole('button', { name: 'Manage cookies' }).click();
    await expect(banner).toBeVisible();
    await expect(banner).toBeFocused();
  });

  test('key pages load without failed local resources', async ({ page }) => {
    const failures: string[] = [];
    page.on('response', (response) => {
      const url = new URL(response.url());
      if (url.origin === 'http://127.0.0.1:4173' && response.status() >= 400) {
        failures.push(`${response.status()} ${url.pathname}`);
      }
    });

    for (const path of ['/', '/writing/', '/about/', '/blog/revenue-operations/']) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
    }

    expect(failures).toEqual([]);
  });

  test('key pages do not overflow a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const path of ['/', '/writing/', '/about/', '/now/', '/contact/', '/blog/revenue-operations/']) {
      await page.goto(path);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content, `${path} overflows horizontally`).toBeLessThanOrEqual(dimensions.viewport);
    }
  });
});
