import { SOCIAL } from '../consts';

export interface SocialLink {
  name: 'linkedin' | 'instagram' | 'podcast' | 'rss';
  label: string;
  url: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jonkohlmeier/',
  },
  {
    name: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/jon.kohlmeier/',
  },
  {
    name: 'podcast',
    label: 'Life with a Twist of Lemon',
    url: SOCIAL.podcast,
  },
  {
    name: 'rss',
    label: 'RSS feed',
    url: '/rss.xml',
  },
];
