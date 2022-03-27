import ru from '~/i18n/ru.json'
import en from '~/i18n/en.json'

export default function () {
  return {
    messages: {
      ru,
      en,
    },
    silentFallbackWarn: true,
  }
}
