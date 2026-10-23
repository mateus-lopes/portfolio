<script setup lang="ts">
import BpHeader from '../components/blueprint/BpHeader.vue'
import BpHero from '../components/blueprint/BpHero.vue'
import BpTrajectory from '../components/blueprint/BpTrajectory.vue'
import BpProjects from '../components/blueprint/BpProjects.vue'
import BpContact from '../components/blueprint/BpContact.vue'
import BpCursor from '../components/blueprint/BpCursor.vue'

const year = new Date().getFullYear()
</script>

<template>
  <BpCursor />
  <div class="page">
    <BpHeader />
    <main class="content">
      <BpHero />
      <BpTrajectory />
      <BpProjects />
      <BpContact />
    </main>
    <footer class="footer">
      <blockquote class="verse">
        <p>“{{ $t('footer.verse') }}”</p>
        <cite>{{ $t('footer.verseRef') }}</cite>
      </blockquote>
      <div class="bottom">
        <span class="bp-label bp-label--mute">Mateus Lopes Albano · {{ year }}</span>
        <a href="#" class="bp-label back-top">{{ $t('footer.backTop') }} ↑</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page {
  /* acima da camada da "lanterna" do cursor */
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 40px) 64px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 72px;
  padding-top: 72px;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 96px;
  padding-top: 48px;
  border-top: 1px solid rgba(92, 200, 255, 0.25);
}

.verse {
  margin: 0 auto;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.verse p {
  font-family: var(--bp-mono);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.7;
  color: var(--bp-soft);
}

.verse cite {
  font-family: var(--bp-mono);
  font-size: 11px;
  font-style: normal;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bp-cyan);
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px 24px;
}

.back-top {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  text-decoration: none;
}

.back-top:hover {
  color: var(--bp-ink);
}
</style>
