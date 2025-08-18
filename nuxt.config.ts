export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/scss/main.scss'],
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
