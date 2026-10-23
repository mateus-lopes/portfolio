<script setup lang="ts">
import { contact } from '../../data/profile'
</script>

<template>
  <section id="contato" class="bp-box contact">
    <div class="head">
      <span class="bp-label">{{ $t('contact.label') }}</span>
      <h2>{{ $t('contact.title') }}</h2>
    </div>
    <div class="links">
      <a :href="`mailto:${contact.email}`" class="link link--primary">
        {{ $t('contact.email') }} <span aria-hidden="true">→</span>
      </a>
      <a :href="contact.linkedin" class="link">linkedin <span aria-hidden="true">→</span></a>
      <a :href="contact.github" class="link">github <span aria-hidden="true">→</span></a>
      <a :href="contact.whatsapp" class="link">whatsapp <span aria-hidden="true">→</span></a>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: clamp(24px, 4vw, 40px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.head {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.head h2 {
  font-weight: 300;
  font-size: clamp(32px, 4vw, 52px);
  color: var(--bp-ink);
  letter-spacing: -0.02em;
}

.links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  min-width: min(100%, 420px);
}

.link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid rgba(92, 200, 255, 0.45);
  text-decoration: none;
  font-family: var(--bp-mono);
  font-size: 13px;
}

.link--primary {
  border-color: var(--bp-cyan);
  background: var(--bp-cyan);
  color: var(--bp-bg);
  font-weight: 500;
}

.link--primary:hover {
  color: var(--bp-bg);
  filter: brightness(1.1);
}
</style>
