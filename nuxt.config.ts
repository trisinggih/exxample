export default defineNuxtConfig({
  ssr: true,
  srcDir: './src',
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'msapplication-TileColor', content: '#2a52be' },
        { name: 'theme-color', content: '#2a52be' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
  css: ['@/assets/scss/main.scss'],
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  routeRules: {
    '/auth/**': { ssr: false },
    '/location/**': { ssr: false },
    '/panel/**': { ssr: false },
  },
  runtimeConfig: {
    public: {
      app_name: '',
      app_url: '',
      api_url: '',
    },
  },
  pinia: {
    storesDirs: ['./src/stores/**'],
  },
  tailwindcss: {
    cssPath: '@/assets/scss/tailwind.scss',
    configPath: './tailwind.config.ts',
    exposeConfig: false,
    viewer: false,
  },
});
