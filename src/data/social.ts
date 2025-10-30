export interface SocialLink {
  name: 'linkedin' | 'instagram' | 'podcast' | 'rss';
  label: string;
  url: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jonkohlmeier/',
    icon: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm.02 6H2v11h3V9.5Zm6.12 0H9v11h3v-5.7c0-1.47.7-2.3 1.91-2.3 1.1 0 1.79.74 1.79 2.3V20.5h3v-6.3c0-2.98-1.59-4.5-3.72-4.5-1.64 0-2.36.9-2.77 1.54V9.5Z" />'
  },
  {
    name: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/jon.kohlmeier/',
    icon: '<rect x="3" y="3" width="18" height="18" rx="4" /><path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" /><circle cx="17" cy="7" r="1" />'
  },
  {
    name: 'podcast',
    label: 'Podcast',
    url: 'https://twistoflemonpod.com',
    icon: '<path d="M12 3a6 6 0 0 0-6 6 6 6 0 0 0 4.5 5.83V21a1.5 1.5 0 0 0 3 0v-6.17A6 6 0 0 0 18 9a6 6 0 0 0-6-6Zm0 2a4 4 0 0 1 4 4c0 1.87-1.29 3.44-3 3.87V19h-2v-6.13A4 4 0 0 1 8 9a4 4 0 0 1 4-4Z" />'
  },
  {
    name: 'rss',
    label: 'RSS feed',
    url: '/rss.xml',
    icon: '<path d="M5 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm10-1H12c0-3.87-3.13-7-7-7V8c5.52 0 10 4.48 10 10Zm4 0h-3c0-6.63-5.37-12-12-12V3c8.28 0 15 6.72 15 15Z" />'
  },
];
