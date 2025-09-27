export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/leaflet',
    '@nuxtjs/seo'
  ],
  css: ['~/assets/scss/main.scss'],
  googleFonts: {
    display: 'swap',
    families: {
      Inter: [400, 500, 600, 700],
      'Gothic A1': [800]
    }
  },
  seo: {
    meta: {
      author: 'https://spacelabs.studio',
      publisher: 'Spacelabs'
    }
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: 'https://bashkent-residence.uz',
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
  nitro: {
    output: {
      dir: 'dist'
    }
  },
  app: {
    head: {
      titleTemplate: '%s - Bashkent Residence'
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
