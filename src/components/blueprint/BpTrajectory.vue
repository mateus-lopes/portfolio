<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { experiences, timeline } from '../../data/profile'
import { useProfileLocale } from '../../composables/useProfileLocale'

const { t } = useI18n()
const { pick, formatPeriod } = useProfileLocale()

const START = 2019
const SPAN = 8
const ROW_HEIGHT = 44
const ROWS = 7

const today = new Date()
const todayPoint: [number, number] = [today.getFullYear(), today.getMonth() + 1]

const toPercent = ([year, month]: [number, number]) =>
  Math.min(100, Math.max(0, ((year + (month - 1) / 12 - START) / SPAN) * 100))

// O fim das barras é exclusivo; para exibir, volta um mês
const lastMonth = ([year, month]: [number, number]): [number, number] =>
  month === 1 ? [year - 1, 12] : [year, month - 1]

const years = Array.from({ length: SPAN + 1 }, (_, i) => ({
  label: String(START + i),
  left: `${(i / SPAN) * 100}%`,
}))

const bars = computed(() =>
  timeline.map((item) => {
    const isNow = item.kind === 'now'
    // A barra atual cresce até o mês de hoje
    const end: [number, number] = isNow ? [todayPoint[0], todayPoint[1] + 1] : item.end
    const left = toPercent(item.start)
    const label = pick(item.label)
    // Projetos do técnico não têm mês exato; mostra só o ano letivo
    const period =
      item.kind === 'project'
        ? String(item.start[0])
        : formatPeriod(item.start, isNow ? null : lastMonth(item.end))
    return {
      key: item.label.en,
      label,
      period,
      detail: item.detail ? pick(item.detail) : '',
      url: item.url,
      // "github" para repositórios, o domínio para os demais sites
      linkLabel: item.url
        ? item.url.includes('github.com')
          ? 'github'
          : new URL(item.url).hostname.replace(/^www\./, '')
        : '',
      kind: item.kind,
      // Linhas de cima abrem o balão para baixo, as de baixo para cima
      tipBelow: item.row < ROWS / 2,
      // Barras perto da borda direita alinham o balão pela direita
      tipAlignEnd: left > 70,
      style: {
        left: `${left}%`,
        width: `${toPercent(end) - left}%`,
        top: `${12 + item.row * ROW_HEIGHT}px`,
      },
    }
  }),
)

const todayLeft = `${toPercent([todayPoint[0], todayPoint[1] + 1])}%`

const kindLabel: Record<string, string> = {
  edu: 'trajectory.education',
  project: 'trajectory.project',
  work: 'trajectory.work',
  now: 'trajectory.current',
}

const ariaLabel = (bar: { label: string; period: string; kind: string; detail: string }) =>
  [bar.label, bar.period, t(kindLabel[bar.kind]), bar.detail].filter(Boolean).join(', ')
</script>

<template>
  <section id="trajetoria" class="trajectory">
    <div class="bp-section-head">
      <span class="bp-label">{{ $t('trajectory.label') }}</span>
      <h2 class="bp-section-title">{{ $t('trajectory.title') }}</h2>
    </div>

    <div class="bp-box chart-box">
      <div class="chart-scroll">
        <div class="chart" role="list">
          <div
            v-for="year in years"
            :key="year.label"
            class="year"
            :style="{ left: year.left }"
            aria-hidden="true"
          >
            <span>{{ year.label }}</span>
          </div>
          <div
            v-for="bar in bars"
            :key="bar.key"
            class="bar"
            :class="[`bar--${bar.kind}`, { 'tip-below': bar.tipBelow, 'tip-end': bar.tipAlignEnd }]"
            :style="bar.style"
            role="listitem"
            :tabindex="bar.url ? undefined : 0"
            :aria-label="bar.url ? undefined : ariaLabel(bar)"
          >
            <a
              v-if="bar.url"
              :href="bar.url"
              target="_blank"
              rel="noopener"
              class="bar-link"
              :aria-label="ariaLabel(bar)"
            >
              <span class="bar-label" aria-hidden="true">{{ bar.label }}</span>
            </a>
            <span v-else class="bar-label" aria-hidden="true">{{ bar.label }}</span>
            <span class="tip" aria-hidden="true">
              <strong>{{ bar.label }}</strong>
              <span>{{ bar.period }}</span>
              <span v-if="bar.detail" class="tip-detail">{{ bar.detail }}</span>
              <span v-if="bar.url" class="tip-link">{{ bar.linkLabel }} ↗</span>
            </span>
          </div>
          <div class="today" :style="{ left: todayLeft }" aria-hidden="true">
            <span class="bp-label">{{ $t('trajectory.today') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cards">
      <article v-for="job in experiences" :key="job.org + job.start.join('-')" class="bp-box card">
        <span class="bp-label bp-label--mute">{{ formatPeriod(job.start, job.end) }}</span>
        <h3>
          {{ pick(job.role) }} ·
          <a v-if="job.orgUrl" :href="job.orgUrl" target="_blank" rel="noopener" class="org-link">{{
            job.org
          }}</a>
          <template v-else>{{ job.org }}</template>
        </h3>
        <p>{{ pick(job.desc) }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.trajectory {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chart-box {
  padding: 24px;
}

/* Rola só na horizontal, e só quando a tela for estreita */
.chart-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(92, 200, 255, 0.45) transparent;
  /* espaço para os balões das linhas de cima e de baixo não serem cortados */
  padding: 0 0 4px;
}

.chart-scroll::-webkit-scrollbar {
  height: 8px;
}

.chart-scroll::-webkit-scrollbar-thumb {
  background: rgba(92, 200, 255, 0.45);
}

.chart-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.chart {
  position: relative;
  min-width: 920px;
  /* margem à direita para o rótulo do último ano e o "hoje" */
  margin-right: 56px;
  height: 340px;
}

.year {
  position: absolute;
  top: 0;
  bottom: 0;
  border-left: 1px dashed rgba(92, 200, 255, 0.18);
}

.year span {
  position: absolute;
  bottom: 0;
  left: 6px;
  font-family: var(--bp-mono);
  font-size: 11px;
  line-height: 1;
  color: var(--bp-mute);
}

.bar {
  position: absolute;
  height: 28px;
  display: flex;
  align-items: center;
  border: 1px solid var(--bp-cyan);
  background: rgba(92, 200, 255, 0.12);
  font-family: var(--bp-mono);
  font-size: 11px;
  color: var(--bp-ink);
  cursor: default;
  outline: none;
  transition: background 0.2s ease;
}

.bar:hover,
.bar:focus-visible {
  z-index: 5;
  background: rgba(92, 200, 255, 0.3);
}

.bar:focus-visible {
  box-shadow:
    0 0 0 2px var(--bp-bg),
    0 0 0 4px var(--bp-ink);
}

.bar-label {
  display: block;
  width: 100%;
  padding: 0 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.bar--edu {
  border-style: dashed;
  background: transparent;
  color: var(--bp-text);
}

.bar--now {
  background: var(--bp-cyan);
  color: var(--bp-bg);
  font-weight: 500;
}

.bar--now:hover,
.bar--now:focus-visible {
  background: var(--bp-cyan);
}

.bar-link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
  outline: none;
  cursor: pointer;
}

.bar-link:hover {
  color: inherit;
}

.bar:focus-within {
  z-index: 5;
  background: rgba(92, 200, 255, 0.3);
  box-shadow:
    0 0 0 2px var(--bp-bg),
    0 0 0 4px var(--bp-ink);
}

/* Balão com o nome completo e o período */
.tip {
  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: max-content;
  max-width: 300px;
  padding: 10px 12px;
  border: 1px solid var(--bp-cyan);
  background: #0e1a2e;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
  color: var(--bp-ink);
  font-weight: 400;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.tip strong {
  font-weight: 500;
  font-size: 12px;
}

.tip span {
  font-size: 11px;
  color: var(--bp-text);
}

.tip-below .tip {
  bottom: auto;
  top: calc(100% + 8px);
  transform: translateY(-4px);
}

.tip-end .tip {
  left: auto;
  right: 0;
}

.bar:hover .tip,
.bar:focus-visible .tip,
.bar:focus-within .tip {
  opacity: 1;
  transform: translateY(0);
}

.today {
  position: absolute;
  top: 0;
  bottom: 20px;
  border-left: 2px solid var(--bp-cyan);
}

.today span {
  position: absolute;
  top: -2px;
  left: 6px;
}

.tip .tip-detail {
  margin-top: 4px;
  white-space: normal;
  color: var(--bp-soft);
}

.tip .tip-link {
  margin-top: 4px;
  color: var(--bp-cyan);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: 16px;
}

.card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--bp-ink);
}

.org-link {
  text-decoration: underline;
  text-decoration-color: var(--bp-cyan);
  text-underline-offset: 4px;
}

.card p {
  font-size: 14px;
}
</style>
