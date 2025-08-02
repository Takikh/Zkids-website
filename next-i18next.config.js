module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'ar', 'en'],
    localeDetection: false,
  },
  fallbackLng: {
    default: ['fr'],
  },
  debug: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}