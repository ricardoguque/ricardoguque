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
      title: 'Profile',
      logo: { src: './src/assets/yo.jpg' },
      lastUpdated: true,
      credits: true,
      editLink: {
        baseUrl: 'https://github.com/ricardoguque/ricardoguque/tree/main/',
      },
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
            { label: "Overview", link: 'notes/overview', badge: { text: "WIP", variant: "caution"}},
            { 
              label: 'Network Fundamentals', 
              items: [
                "notes/nf/arp",
                "notes/nf/dhcp",
                "notes/nf/icmp",
                "notes/nf/nat",
                "notes/nf/tcp",
              ]
            },
          ],
        }
      ],
    })]
});