export default defineNuxtConfig({
  app: {
    head: {
      title: "Nexus",
      titleTemplate: "%s | Trustori Nexus",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
  site: {
    url: "https://trustori.com",
    name: "Trustori Nexus",
    description:
      "The unified design language and component library for Trustori Enterprise interfaces.",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@nuxtjs/seo"],
  css: ["@/assets/css/tailwind.css"],
  srcDir: "app",
});
