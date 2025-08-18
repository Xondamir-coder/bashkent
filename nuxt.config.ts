export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/google-fonts'],
  css: ['~/assets/scss/main.scss'],
  googleFonts: {
    display: 'swap',
    families: {
      Inter: [400, 500, 600, 700]
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `
            @use "~/assets/scss/abstracts/variables" as vars;
            @use "~/assets/scss/abstracts/mixins" as mix;
          `
        }
      }
    }
  }
});
