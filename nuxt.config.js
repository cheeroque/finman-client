export default {
  env: {
    API_URL: process.env.API_URL || 'http://127.0.0.1:8000/api',
    PUBLIC_URL: process.env.PUBLIC_URL || 'http://127.0.0.1:8000',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Finance Manager 2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'mobile-web-app-capable',
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
    ],
    link: [
      {
        rel: 'shortcut icon',
        hid: 'shortcut-icon',
        type: 'image/png',
        href: '/icon-32.png',
      },
      {
        rel: 'apple-touch-icon',
        hid: 'apple-touch-icon',
        type: 'image/png',
        href: '/icon.png',
      },
      {
        rel: 'manifest',
        hid: 'manifest',
        href: '/manifest.json',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~assets/scss/app.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/dialog', '~/plugins/validate', '~/plugins/toast'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/global/',
    '~/components/framework/',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/svg-sprite',
    'portal-vue/nuxt',
  ],

  styleResources: {
    scss: ['~/assets/scss/_variables.scss', '~/assets/scss/_mixins.scss'],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: false,
        },
      },
    },
    redirect: {
      logout: '/login',
    },
  },

  axios: {
    baseURL: process.env.API_URL,
    headers: {
      Accept: 'application/json',
    },
  },

  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      redirectOn: 'root',
      useCookie: true,
    },
    vueI18n: '~/config/i18n.js',
    vueI18nLoader: true,
  },

  svgSprite: {
    input: '~/assets/images/icons',
  },

  generate: {
    crawler: false,
  },

  router: {
    middleware: ['auth', 'store'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
