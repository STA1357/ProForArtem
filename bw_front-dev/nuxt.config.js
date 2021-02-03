export default {
  server: {
      port: 3000, // default: 3000
  },
  // Disable Server Side rendering
  ssr: false, 
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'asd',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    contractAddresses: {
      black: '0xCb7432528B8eCa40ff06e029318DaeE4d6A919A7',
      white: '0xFB067Fe96d281580b8808e635a3FA49091aE48EF',
      primary: '0xE64a2f645261FfB7C113B0Bd16DD6ecf53fBa2C9',
      collateralization: '0xd7dFf05E8c60643CBbbddBcFB45567F8DE83F59E',
      secondaryPrimary: '0xa1c9b143a6c708e34800d62dc0429726382861d6',
      secondaryCollateralization: '0x8f917ccd79d31aa93bc9436b02666f35e64b09fa'
    }
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'normalize.css/normalize.css',
  ],

  styleResources: {
      scss: ["./assets/scss/styles.scss"]
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/vue-js-modal',
    '~plugins/filters',
    '~plugins/mixins',
    '~plugins/lodash',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    'nuxt-izitoast',
    '@nuxtjs/axios',
    "@nuxtjs/style-resources",
    'portal-vue/nuxt'

  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // extend(config, ctx) {
    //     // Run ESLint on save
    //     if (ctx.isDev && ctx.isClient) {
    //         config.module.rules.push({
    //             enforce: 'pre',
    //             test: /\.(js|vue)$/,
    //             loader: 'eslint-loader',
    //             exclude: /(node_modules)/,
    //             options: {
    //                 fix: true,
    //             }
    //         })
    //     }
    // }
  }
}
