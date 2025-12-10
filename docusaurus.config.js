// @ts-check 
const path = require('path');
const prismThemes = require("prism-react-renderer").themes; // FIX: Changed import to require

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Physical AI & Humanoid Robotics",
  tagline: "Explore AI-powered humanoid robots",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://physical-ai-humanoid-robotics-mu.vercel.app/",
  baseUrl: "/",

  organizationName: "MubashirKhanYousufZai",
  projectName: "Physical AI & Humanoid Robotics",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

 // =======================================================================
 // 🚀 FIX: Using require.resolve for robust plugin pathing
 // =======================================================================
  plugins: [
    require.resolve('./plugins/resolve-fallback'),
  ],
 // =======================================================================

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/MubashirKhanYousufZai/Physical-AI-Humanoid-Robotics/edit/main/",
        },
        blog: false,
        
        // 🛑 CRITICAL FIX: Tell Docusaurus to ignore the API folder
        pages: {
          exclude: [
            '**/api/**', 
          ],
        },
        
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "AI & Humanoid Robotics",
      logo: {
        alt: "AI Robotics Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          type: "doc",
          docId: "rag-chatbot", 
          label: "RAG Chatbot",
          position: "left",
        },
        {
          href: "https://github.com/MubashirKhanYousufZai/Physical-AI-Humanoid-Robotics",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
            {
              label: "Author",
              to: "/docs/author",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/mubashir-khan-538a662bb",
            },
            {
              label: "Email",
              href: "mailto:mubashirmpa2008@gmail.com",
            },
            {
              label: "X",
              href: "https://x.com/MubashirKh67451",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Portfolio",
              href: "https://mubashir-khans-portfolio.vercel.app/",
            },
            {
              label: "GitHub",
              href: "https://github.com/MubashirKhanYousufZai/Physical-AI-Humanoid-Robotics",
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