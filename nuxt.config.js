import i18n from './i18n';
import tailwind from './tailwind.config'

const title = "COVID Pass";
const description = "Scan your vaccination, test and recovery certificates and save them to your Apple Wallet";
const ogImageUrl = "https://covidpass.eu/og-image.png?v=2";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: title,
    htmlAttrs: { },
    bodyAttrs: {
      class: 'bg-primary'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      { hid: 'description', name: 'description', content: description },
      { hid: 'application-name', name: 'application-name', content: description},
      { hid: 'keywords', name: 'keywords', content: 'Apple Wallet, iOS Wallet, iPhone Wallet, EU Digital COVID Certificate, COVID, covid pass, green pass, EU Green Certificate, Vaccination, Recovery, Test'},
      { hid: 'author', name: 'author', content: 'Donatus Wolf, Philipp Trenz'},
      { hid: 'theme-color', name: 'theme-color', content: tailwind.theme.colors.primary },
      
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: tailwind.theme.colors.primary },
      { hid: 'msapplication-TileImage', name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:site_name', property: 'og:site_name', content: title },
      { hid: 'og:image', property: 'og:image', content: ogImageUrl },
      { hid: 'og:image:width', property: 'og:image:width', content: '1280' },
      { hid: 'og:image:height', property: 'og:image:height', content: '640' },

      { hid: 'twitter:site', property: 'twitter:site', content: '@covidpass_eu' },
      { hid: 'twitter:creator', property: 'twitter:creator', content: '@donatuswolf,@philipptrenz' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:image', property: 'twitter:image', content: ogImageUrl },
      { hid: 'twitter:url', property: 'twitter:url', content: process.env.BASE_URL },
      { hid: 'twitter:domain', property: 'twitter:domain', content: 'covidpass.eu' },
      { hid: 'twitter:title', property: 'twitter:title', content: title },
      { hid: 'twitter:description', property: 'twitter:description', content: description },

    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: tailwind.theme.colors.primary },
    ]
  },
  
  // Environment variables
  publicRuntimeConfig: { // accessible from server and client
    teamIdentifier: process.env.PASS_TEAM_IDENTIFIER,
    passIdentifier: process.env.PASS_TYPE_IDENTIFIER,
    baseUrl: process.env.BASE_URL,
    axios: {
      browserBaseURL: process.env.BASE_URL
    }
  },
  privateRuntimeConfig: { // only accessible from server
    faqDataUrlDE: process.env.FAQ_DATA_URL_DE,
    faqDataUrlEN: process.env.FAQ_DATA_URL_EN,
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/qr', mode: 'client' },
    { src: '~/plugins/hcert', mode: 'client' },
    { src: '~/plugins/pkpass', mode: 'client' },
  ],

  // The nuxt.js internal REST endpoint
  serverMiddleware: [
    { path: '/api', handler: '~/server-middleware/rest.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    'nuxt-i18n',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    { 
      src: 'nuxt-user-agent',
      ssr: false
    },
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  axios: {},

  sitemap: {
    hostname: process.env.BASE_URL,
    i18n: true,
    gzip: true,
  },

  robots: {
    Sitemap: (req) => `https://${ req.headers.host }/sitemap.xml`,
    UserAgent: '*',
    Disallow: (req) => req.headers.host.startsWith('dev.') ? '/': '',
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US' },
      { code: 'de', iso: 'de-DE' },
      { code: 'fr', iso: 'fr-FR' },
      { code: 'es', iso: 'es-ES' },
      { code: 'it', iso: 'it-IT' },
      { code: 'sv', iso: 'sv-SE' },
      { code: 'pl', iso: 'pl-PL' },
      { code: 'et', iso: 'et-EE' },
      { code: 'ru', iso: 'ru-RU' },
      { code: 'tr', iso: 'tr-TR' },
      { code: 'ar', iso: 'ar-YE' },
    ],
    defaultLocale: 'en',
    baseUrl: () => process.env.BASE_URL,
    strategy: 'prefix',
    vueI18n: i18n,
    detectBrowserLanguage: { 
      fallbackLocale: 'en', 
      useCookie: false,
      onlyOnRoot: true,
    }
  },

  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    html: true,
    xhtmlOut: true, 
    runtime: true,  // Support `$md()`
    linkify: true,
    typographer: true,
    breaks: true,
    use: [
      [
        'markdown-it-link-attributes',
        {
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        }
      ],
      // 'markdown-it-div',
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {

      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      })
    },

    postcss: { order: 'presetEnvAndCssnanoLast', },
  }
}
