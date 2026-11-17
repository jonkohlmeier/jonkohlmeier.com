import type { CollectionEntry } from 'astro:content';

export const CATEGORIES = [
  {
    slug: 'work-and-ideas',
    label: 'Work & Ideas',
    description:
      'Leadership, technology, systems, customer experience, and the work of making complicated things useful.',
  },
  {
    slug: 'life-and-reflection',
    label: 'Life & Reflection',
    description: 'Faith, family, values, personal growth, and the ordinary practices that shape a life.',
  },
  {
    slug: 'the-finer-things',
    label: 'The Finer Things',
    description: 'Books, drinks, travel, hobbies, and other things worth noticing and enjoying well.',
  },
] as const;

export const FORMATS = {
  essay: 'Essay',
  note: 'Note',
  roundup: 'Roundup',
} as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
export type EditorialFormat = keyof typeof FORMATS;

export const getCategory = (slug: CategorySlug) =>
  CATEGORIES.find((category) => category.slug === slug) ?? CATEGORIES[0];

export const getFormatLabel = (format: EditorialFormat) => FORMATS[format];

export const articlePath = (post: CollectionEntry<'blog'>) => `/blog/${post.id}/`;

export const sortPosts = (posts: CollectionEntry<'blog'>[]) =>
  [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
