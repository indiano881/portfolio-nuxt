// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./i18n.config.js",
    locales: [
      { code: "en", name: "en" },
      { code: "se", name: "se" },
      { code: "it", name: "it" },
    ],
    defaultLocale: "en",
  },
  css: ["~/assets/css/main.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
