export default {
  head: {
    title: 'nuxt-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#409EFF' },

  css: ['element-ui/lib/theme-chalk/index.css', '@/theme/index.scss'],

  plugins: ['@/plugins/globals', '@/plugins/axios'],

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  serverMiddleware: [
    // Will register redirect-ssl npm package
    // 'redirect-ssl',

    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/server/index.js' },
  ],

  env: {
    appName: 'SSR Blog',
  },

  build: {
    transpile: [/^element-ui/],
  },
};
