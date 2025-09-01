export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/google-fonts', '@nuxt/image', '@nuxtjs/i18n'],
  css: ['~/assets/scss/main.scss'],
  googleFonts: {
    display: 'swap',
    families: {
      Inter: [400, 500, 600, 700],
      'Gothic A1': [800]
    }
  },
  i18n: {
    defaultLocale: 'en',
    baseUrl: 'https://bashkent.netlify.app',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'Eng',
        file: 'en.json'
      },
      {
        code: 'ru',
        language: 'ru-RU',
        name: 'Рус',
        file: 'ru.json'
      },
      {
        code: 'uz',
        language: 'uz-UZ',
        name: "O'zb",
        file: 'uz.json'
      }
    ]
  },
  image: {
    format: ['avif']
  },
  app: {
    head: {
      titleTemplate: '%s - Bashkent'
    }
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
