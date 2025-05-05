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
    plugins: [starlightThemeRapide(),starlightClientMermaid({})],
    title: 'RGQ',
    logo: { src: './src/assets/yo.jpg' },
    lastUpdated: true,
    credits: true,
    editLink: {
      baseUrl: 'https://github.com/ricardoguque/ricardoguque/tree/main/',
    },
    tableOfContents: {maxHeadingLevel: 4, minHeadingLevel: 2},
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/ricardoguque' },
      { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ricardo-gutierrez-b3446475' },
    ],
    sidebar: [
      'home',
      {
        label: 'Networking Notes',
        collapsed: false,
        items: [
          "networking/intro",
          { 
            label: 'Network Fundamentals', 
            items: [
              "networking/nf/mac",
              "networking/nf/ip_addr",
              "networking/nf/arp",
              "networking/nf/ipv4",
      //         "networking/nf/dhcp",
      //         "networking/nf/icmp",
      //         "networking/nf/nat",
      //         "networking/nf/tcp",
      //         "networking/nf/udp",
      //         "networking/nf/dns",
      //         "networking/nf/ntp",
      //       ]
      //     },
      //     { 
      //       label: 'Routing', 
      //       items: [
      //         "notes/routing/ospf",
      //         "notes/routing/bgp",
      //         "notes/routing/isis",
            ]
          }
        ],
      },
      {
        label: 'How-To',
        collapsed: false,
        items: [
          "how_to/iperf",
          "how_to/containerlab",
        ]
      },
    ],
  })]
});