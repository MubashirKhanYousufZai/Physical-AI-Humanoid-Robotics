// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Explore AI-powered humanoid robots',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://ai-robotics-reads.vercel.app', // your live site
  baseUrl: '/',

  organizationName: 'MubashirKhanYousufZai', // GitHub username
  projectName: 'AI-Robotics-Reads',

  onBrokenLinks: 'throw',
  // ------------------------------------------------------------------
  // ⚠️ FIX: REMOVED DEPRECATED OPTION HERE (onBrokenMarkdownLinks)
  // ------------------------------------------------------------------

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // ------------------------------------------------------------------
  // ✨ FIX: ADDED NEW MARKDOWN HOOKS STRUCTURE HERE
  // ------------------------------------------------------------------
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn', // Moved here to fix the build warning
    },
  },
  // ------------------------------------------------------------------

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/MubashirKhanYousufZai/AI-Robotics-Reads/edit/main/',
        },
        blog: false, // blog removed for Hackathon clean look
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI & Humanoid Robotics',
      logo: {
        alt: 'AI Robotics Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/MubashirKhanYousufZai/AI-Robotics-Reads',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
            {
              label: 'Author',
              to: '/docs/author',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/mubashir-khan-538a662bb',
            },
            {
              label: 'Email',
              href: 'mailto:mubashirmpa2008@gmail.com',
            },
            {
              label: 'X',
              href: 'https://x.com/MubashirKh67451',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Portfolio',
              href: 'https://mubashir-khans-portfolio.vercel.app/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/MubashirKhanYousufZai/AI-Robotics-Reads',
            },
          ],
        },
      ],
      copyright: `
        © ${new Date().getFullYear()} Mubashir Khan. 
        Built with ❤️ using Docusaurus. 
        All rights reserved.
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;