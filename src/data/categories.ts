export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  life: 'Personal reflections on faith, work, routines, friendship, and the everyday decisions that shape a grounded life.',
  productivity: 'Practical notes on habits, planning, and personal systems for making better use of attention and time.',
  'web-design':
    'Lessons from building for the web, from early experiments and front-end craft to the professional practice behind digital experiences.',
  'finer-things-in-life':
    'A collection of slower pleasures, including coffee, food, drinks, books, music, and the details worth noticing.',
};

export const DEFAULT_CATEGORY_DESCRIPTION =
  'Collected essays and field notes grouped around a shared theme from Puffs of Smoke.';

export const getCategoryDescription = (slug: string, label: string) =>
  CATEGORY_DESCRIPTIONS[slug] ?? `${DEFAULT_CATEGORY_DESCRIPTION} Focus this one on ${label}.`;
