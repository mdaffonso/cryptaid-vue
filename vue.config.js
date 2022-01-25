module.exports = {
  pluginOptions: {
    i18n: {
      locale: (localStorage.getItem("locale") || 'en'),
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
}
