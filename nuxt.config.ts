export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/google-fonts', '@nuxt/image'],
  css: ['~/assets/scss/main.scss'],
  googleFonts: {
    display: 'swap',
    families: {
      Inter: [400, 500, 600, 700],
      'Gothic A1': [800]
    }
  },
  image: {
    format: ['avif']
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/abstracts/variables" as vars;
          @use "~/assets/scss/abstracts/mixins" as mix;
          `
        }
      }
    }
  }
});
