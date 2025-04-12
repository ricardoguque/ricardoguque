// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide'

// https://astro.build/config
export default defineConfig({
  site: 'https://ricardoguque.github.io',
  base: '/ricardoguque',
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
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
          label: 'Study Notes',
          collapsed: false,
          items: [
            'notes/overview',
            { 
              label: 'Network Fundamentals', 
              items: [
                'notes/nf/arp',
                'notes/nf/dhcp',
              ]
            },
          ],
        }
      ],
    })]
});