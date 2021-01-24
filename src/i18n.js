import {useI18n,createI18n} from "vue-i18n"
import getBrowserLocale from "@/util/i18n/get-browser-locale"
import { supportedLocalesInclude } from "./util/i18n/supported-locales"
import {
  getChoiceIndex,
  setDefaultChoiceIndexGet
} from "./util/i18n/choice-index-for-plural"
import dateTimeFormats from "@/locales/date-time-formats"
import numberFormats from "@/locales/number-formats"

// Get Local from browser
function getStartingLocale() {
  const browserLocale = getBrowserLocale({ countryCodeOnly: true })
  if (supportedLocalesInclude(browserLocale)) {
    return browserLocale
  } else {
    return process.env.VUE_APP_I18N_LOCALE || "en"
  }
}

setDefaultChoiceIndexGet(useI18n.prototype.getChoiceIndex)

useI18n.prototype.getChoiceIndex = getChoiceIndex

const startingLocale = getStartingLocale()

// Load messages from JSON
function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

// Create i18n instance
const i18n = new createI18n({
  locale: startingLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
  dateTimeFormats,
  numberFormats
})

export default i18n