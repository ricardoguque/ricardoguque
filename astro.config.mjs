// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide'
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid'

// https://astro.build/config
export default defineConfig({
  site: 'https://ricardoguque.github.io',
  base: '/ricardoguque',
  integrations: [starlight({
    plugins: [starlightThemeRapide(),starlightClientMermaid({ /* options */ })],
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
              "notes/nf/udp",
              "notes/nf/dns",
              "notes/nf/ntp",
            ]
          },
          { 
            label: 'Routing', 
            items: [
              "notes/routing/ospf",
              "notes/routing/bgp",
              "notes/routing/isis",
            ]
          }
        ],
      },
      {
        label: 'How Tos',
        collapsed: false,
        items: [
              "how_to/iperf",
        ]
      },
    ],
  })]
});