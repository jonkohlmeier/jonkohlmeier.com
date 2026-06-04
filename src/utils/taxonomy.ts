import type { CollectionEntry } from 'astro:content';

export type TaxonomyField = 'categories' | 'tags';

export interface TaxonomySummary {
  slug: string;
  raw: string;
  label: string;
  count: number;
  posts: CollectionEntry<'blog'>[];
}

const formatWord = (value: string) => (value ? value[0].toUpperCase() + value.slice(1) : '');

export const formatTaxonomyLabel = (value: string) =>
  value
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(formatWord)
    .join(' ');

export const slugifyTaxonomy = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const buildTaxonomy = (posts: CollectionEntry<'blog'>[], field: TaxonomyField): TaxonomySummary[] => {
  const lookup = new Map<string, TaxonomySummary>();

  for (const post of posts) {
    const values = post.data[field];
    if (!values?.length) {
      continue;
    }

    for (const value of values) {
      const slug = slugifyTaxonomy(value);
      if (!slug) {
        continue;
      }

      const existing = lookup.get(slug);
      if (existing) {
        existing.count += 1;
        existing.posts.push(post);
      } else {
        lookup.set(slug, {
          slug,
          raw: value,
          label: formatTaxonomyLabel(value),
          count: 1,
          posts: [post],
        });
      }
    }
  }

  return Array.from(lookup.values()).sort((a, b) => a.label.localeCompare(b.label));
};
