export default {
  env: {
    API_URL: process.env.API_URL || 'http://127.0.0.1:8000/api/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'finman-client',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~assets/scss/app.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/mixins.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components/', '~/components/global/'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/auth-next', '@nuxtjs/axios', '@nuxtjs/svg-sprite', 'bootstrap-vue/nuxt'],

  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      'bootstrap/scss/_functions.scss',
      'bootstrap/scss/_mixins.scss',
      'bootstrap/scss/_variables.scss'
    ]
  },

  bootstrapVue: {
    bootstrapVueCSS: false,
    bootstrapCSS: false,
    components: ['BContainer', 'BRow', 'BCol', 'BButton', 'BLink']
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token'
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: false
        }
      }
    },
    redirect: {
      logout: '/login'
    }
  },

  axios: {
    baseURL: process.env.API_URL,
    headers: {
      Accept: 'application/json'
    }
  },

  svgSprite: {
    input: '~/assets/images/icons'
  },

  generate: {
    crawler: false
  },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
