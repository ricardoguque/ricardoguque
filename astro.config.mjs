// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';


// https://astro.build/config
export default defineConfig({
  site: 'https://ricardoguque.github.io',
  base: '/ricardoguque',
  integrations: [
    starlight({
      title: 'Home',
      logo: { src: '/src/assets/yo.jpg' },
      lastUpdated: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ricardoguque' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ricardo-gutierrez-b3446475' },
      ],
      sidebar: [
        { label: 'Overview', link: '/overview', badge: { text: "WIP", variant: "caution"} },
        {
          label: 'Network fundamentals',
          collapsed: false,
          autogenerate: { directory: 'network_fundamentals' }
        }
      ],
    })]
});