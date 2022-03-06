import {useI18n,createI18n} from "vue-i18n"
import getBrowserLocale from "./util/i18n/get-browser-locale"
import { supportedLocalesInclude } from "./util/i18n/supported-locales"
import {
  getChoiceIndex,
  setDefaultChoiceIndexGet
} from "./util/i18n/choice-index-for-plural"
import dateTimeFormats from "./locales/date-time-formats"
import numberFormats from "./locales/number-formats"

import en from "./locales/en.json"
import fr from "./locales/fr.json"


// Get Local from browser
function getStartingLocale() {
  const browserLocale = getBrowserLocale({ countryCodeOnly: true })
  if (supportedLocalesInclude(browserLocale)) {
    return browserLocale
  } else {
    return process.meta.env.VITE_I18N_LOCALE || "en"
  }
}

setDefaultChoiceIndexGet(useI18n.prototype.getChoiceIndex)

useI18n.prototype.getChoiceIndex = getChoiceIndex

const startingLocale = getStartingLocale()
// Create i18n instance
const i18n = new createI18n({
  locale: startingLocale,
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
  messages: {
    en,
    fr
  },
  dateTimeFormats,
  numberFormats
})

export default i18n