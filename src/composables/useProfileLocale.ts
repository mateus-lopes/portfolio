import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale, Localized } from '../data/profile'

const months: Record<Locale, string[]> = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

export function useProfileLocale() {
  const { locale, t } = useI18n()

  const current = computed<Locale>(() => (locale.value === 'pt' ? 'pt' : 'en'))

  const pick = (text: Localized) => text[current.value]

  const formatMonth = ([year, month]: [number, number]) => `${months[current.value][month - 1]} ${year}`

  const formatPeriod = (start: [number, number], end: [number, number] | null) =>
    `${formatMonth(start)} — ${end ? formatMonth(end) : t('trajectory.present')}`

  return { current, pick, formatPeriod }
}
