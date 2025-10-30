export interface NavLink {
  href: string;
  label: string;
  aliases?: string[];
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/writing/', label: 'Writing', aliases: ['/blog/'] },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Advisory' },
  { href: '/contact/', label: 'Contact' },
];
