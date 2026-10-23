<script setup lang="ts">
import { useLanguageStore } from '../../stores/language'

const language = useLanguageStore()
</script>

<template>
  <header class="header">
    <a href="#" class="logo">mateus<span>.</span>lopes</a>
    <nav class="nav" aria-label="Menu">
      <a href="#trajetoria">{{ $t('nav.trajectory') }}</a>
      <a href="#projetos">{{ $t('nav.projects') }}</a>
      <a href="#contato">{{ $t('nav.contact') }}</a>
      <div class="lang" role="group" aria-label="Idioma / Language">
        <button
          type="button"
          :aria-pressed="language.getLanguage() === 'pt'"
          @click="language.setLanguage('pt')"
        >
          PT
        </button>
        <button
          type="button"
          :aria-pressed="language.getLanguage() === 'en'"
          @click="language.setLanguage('en')"
        >
          EN
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px 24px;
  padding: 24px 0;
}

.logo {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-family: var(--bp-mono);
  font-size: 15px;
  font-weight: 500;
  color: var(--bp-ink);
  text-decoration: none;
}

.logo span {
  color: var(--bp-cyan);
}

/* No celular o logo some e o menu ocupa a linha sozinho */
@media (max-width: 767px) {
  .logo {
    display: none;
  }
}

.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 24px;
  font-family: var(--bp-mono);
  font-size: 13px;
}

.nav a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  text-decoration: none;
}

.lang {
  display: flex;
  border: 1px solid var(--bp-line);
}

.lang button {
  min-width: 44px;
  min-height: 36px;
  border: 0;
  background: transparent;
  color: var(--bp-text);
  font-family: var(--bp-mono);
  font-size: 12px;
  cursor: pointer;
}

.lang button[aria-pressed='true'] {
  background: var(--bp-cyan);
  color: var(--bp-bg);
}
</style>
