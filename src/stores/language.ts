import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLanguageStore = defineStore('language', () => {
  const { locale } = useI18n()
  const loading = ref(false)

  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    locale.value = savedLanguage
  } else {
    locale.value = navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
  }

  const setLanguage = (lang: string) => {
    // Only show loading and change language if it's actually changing
    if (locale.value !== lang) {
      loading.value = true
      locale.value = lang
      localStorage.setItem('language', lang)
      setTimeout(() => {
        loading.value = false
      }, 700)
    }
  }

  const getLanguage = () => locale.value

  return { setLanguage, getLanguage, loading }
})
