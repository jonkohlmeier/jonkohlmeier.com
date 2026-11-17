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

  test('writing archive renders published pieces', async ({ page }) => {
    await page.goto('/writing/');
    const cards = page.locator('article[data-testid="post-card"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('category filtering updates the visible archive and URL', async ({ page }) => {
    await page.goto('/writing/');
    await page.getByRole('button', { name: 'The Finer Things' }).click();

    const visibleArticles = page.locator('article[data-testid="post-card"]:visible');
    await expect(visibleArticles).toHaveCount(1);
    await expect(visibleArticles.first()).toContainText('Weekly Things');
    await expect(page).toHaveURL(/category=the-finer-things/);
  });

  test('legacy article URLs remain available with a stable canonical', async ({ page }) => {
    await page.goto('/blog/core-values/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('What Gets Priority?');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://jonkohlmeier.com/blog/core-values/',
    );

    await page.goto('/writing/core-values/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://jonkohlmeier.com/blog/core-values/',
    );
  });

  test('restored RevOps article is published and featured', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Revenue Operations: The Quiet Craft of Making People Successful' })).toBeVisible();

    await page.goto('/blog/revenue-operations/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Revenue Operations');
  });

  test('analytics requires an explicit consent choice', async ({ page }) => {
    await page.goto('/');
    const banner = page.getByRole('dialog', { name: 'Analytics consent' });
    await expect(banner).toBeVisible();
    await banner.getByRole('button', { name: 'Decline' }).click();
    await expect(banner).toBeHidden();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('analytics-consent'))).toBe('denied');
  });

  test('featured story and muted metadata meet WCAG AA contrast', async ({ page }) => {
    const contrast = async (foregroundSelector: string, backgroundSelector: string) =>
      page.evaluate(
        ({ foregroundSelector, backgroundSelector }) => {
          const foreground = document.querySelector(foregroundSelector);
          const background = document.querySelector(backgroundSelector);
          if (!foreground || !background) throw new Error('Contrast test element missing');

          const parse = (value: string) => {
            const channels = value.match(/[\d.]+/g)?.map(Number) ?? [];
            return channels.slice(0, 3);
          };
          const luminance = (channels: number[]) => {
            const values = channels.map((channel) => {
              const normalized = channel / 255;
              return normalized <= 0.04045
                ? normalized / 12.92
                : Math.pow((normalized + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
          };

          const foregroundLuminance = luminance(parse(getComputedStyle(foreground).color));
          const backgroundLuminance = luminance(parse(getComputedStyle(background).backgroundColor));
          const high = Math.max(foregroundLuminance, backgroundLuminance);
          const low = Math.min(foregroundLuminance, backgroundLuminance);
          return (high + 0.05) / (low + 0.05);
        },
        { foregroundSelector, backgroundSelector },
      );

    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();
    expect(await contrast('.article-row .article-meta', '.section--tinted')).toBeGreaterThanOrEqual(4.5);
    expect(await contrast('.featured-story h2', '.featured-story')).toBeGreaterThanOrEqual(4.5);

    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.reload();
    expect(await contrast('.featured-story h2', '.featured-story')).toBeGreaterThanOrEqual(4.5);
  });
});
