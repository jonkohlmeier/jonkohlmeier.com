export interface NavLink {
  href: string;
  label: string;
  aliases?: string[];
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/writing/', label: 'Writing', aliases: ['/blog/'] },
  { href: '/about/', label: 'About' },
  { href: 'https://twistoflemonpod.com', label: 'Podcast ↗', external: true },
  { href: '/contact/', label: 'Contact' },
];
