<script setup lang="ts">
import { ref } from 'vue'
import photo from '../../assets/images/foto-exercito.jpg'

// Blocos que cobrem a foto e somem em onda diagonal (mesmo tamanho da grade de 40px)
const COLS = 8
const ROWS = 10
const START = 0.35 // segundos até o primeiro bloco
const STEP = 0.045 // atraso entre diagonais
const JITTER = 0.12 // variação aleatória para não parecer mecânico

const makeTiles = () =>
  Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS
    const row = Math.floor(i / COLS)
    const delay = START + (col + row) * STEP + Math.random() * JITTER
    return { id: i, delay: `${delay.toFixed(3)}s` }
  })

const tiles = ref(makeTiles())
const build = ref(0)

// Demonstração: clicar na foto repete a animação
const replay = () => {
  tiles.value = makeTiles()
  build.value++
}
</script>

<template>
  <section class="hero">
    <div class="top">
      <div class="intro">
        <h1 class="name">Mateus Lopes<br /><strong>Albano</strong></h1>
        <div class="rule" aria-hidden="true"></div>
        <i18n-t keypath="hero.bio" tag="p" class="bio" scope="global">
          <template #company>
            <a href="https://tssolutions.com.br/" target="_blank" rel="noopener" class="company"
              >TS - Solutions</a
            >
          </template>
        </i18n-t>
      </div>

      <figure :key="build" class="photo-col">
        <div class="photo-row">
          <div class="frame" title="Clique para repetir a animação" @click="replay">
            <span class="reg reg--tl" aria-hidden="true"></span>
            <span class="reg reg--tr" aria-hidden="true"></span>
            <span class="reg reg--bl" aria-hidden="true"></span>
            <span class="reg reg--br" aria-hidden="true"></span>
            <div class="duo">
              <img :src="photo" :alt="$t('hero.photoAlt')" width="800" height="1000" />
              <div class="tiles" aria-hidden="true">
                <span
                  v-for="tile in tiles"
                  :key="tile.id"
                  class="tile"
                  :style="{ animationDelay: tile.delay }"
                ></span>
              </div>
            </div>
          </div>
          <div class="dim dim--v" aria-hidden="true">
            <b></b><i></i><span>400</span><i></i><b></b>
          </div>
        </div>
        <div class="dim dim--h" aria-hidden="true">
          <b></b><i></i><span>320</span><i></i><b></b>
        </div>
      </figure>
    </div>

    <dl class="bp-box spec">
      <div class="spec-item">
        <dt class="bp-label bp-label--mute">{{ $t('hero.role') }}</dt>
        <dd>{{ $t('hero.roleValue') }}</dd>
      </div>
      <div class="spec-item">
        <dt class="bp-label bp-label--mute">{{ $t('hero.stack') }}</dt>
        <dd>Angular · C# · Vue · TS</dd>
      </div>
      <div class="spec-item">
        <dt class="bp-label bp-label--mute">{{ $t('hero.base') }}</dt>
        <dd>Joinville, SC</dd>
      </div>
      <div class="spec-item">
        <dt class="bp-label bp-label--mute">{{ $t('hero.languages') }}</dt>
        <dd>{{ $t('hero.languagesValue') }}</dd>
      </div>
      <div class="spec-item">
        <dt class="bp-label bp-label--mute">{{ $t('hero.since') }}</dt>
        <dd>2019</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px 64px;
}

.intro {
  flex: 1 1 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
}

.name {
  font-weight: 300;
  font-size: clamp(44px, 6.2vw, 86px);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--bp-ink);
}

.name strong {
  font-weight: 600;
}

.rule {
  height: 1px;
  width: 100%;
  max-width: 520px;
  background: var(--bp-cyan);
  transform-origin: left;
  animation: draw 1.2s cubic-bezier(0.6, 0, 0.2, 1) both;
}

@keyframes draw {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.bio {
  font-size: 18px;
  max-width: 580px;
  color: var(--bp-soft);
}

.company {
  color: var(--bp-ink);
  text-decoration: underline;
  text-decoration-color: var(--bp-cyan);
  text-underline-offset: 4px;
}

.company:hover {
  color: var(--bp-cyan);
}

/* Foto como figura de desenho técnico */
.photo-col {
  flex: 0 1 366px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.photo-row {
  display: flex;
  gap: 12px;
}

.frame {
  position: relative;
  flex: 1;
  padding: 14px;
}

/* Duotone: foto em cinza multiplicada sobre o ciano */
.duo {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--bp-cyan);
  border: 1px solid rgba(92, 200, 255, 0.5);
}

.duo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.15) brightness(0.92);
  mix-blend-mode: multiply;
}

/* Grade por cima da foto */
.duo::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(230, 241, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(230, 241, 255, 0.18) 1px, transparent 1px);
  background-size: 40px 40px;
}

.duo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(10, 19, 34, 0.22);
  pointer-events: none;
}

/* Marcas de registro nos cantos */
.reg {
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 2;
}

.reg::before,
.reg::after {
  content: '';
  position: absolute;
  background: var(--bp-cyan);
}

.reg::before {
  left: 9px;
  top: 0;
  width: 2px;
  height: 20px;
}

.reg::after {
  top: 9px;
  left: 0;
  width: 20px;
  height: 2px;
}

.reg--tl {
  top: 0;
  left: 0;
}

.reg--tr {
  top: 0;
  right: 0;
}

.reg--bl {
  bottom: 0;
  left: 0;
}

.reg--br {
  bottom: 0;
  right: 0;
}

/* Cotas */
.dim {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--bp-mono);
  font-size: 11px;
  color: var(--bp-mute);
}

.dim i {
  flex: 1;
  background: rgba(92, 200, 255, 0.5);
}

.dim b {
  background: rgba(92, 200, 255, 0.8);
}

.dim--h {
  padding: 0 14px;
  margin-right: 32px;
}

.dim--h i {
  height: 1px;
}

.dim--h b {
  width: 1px;
  height: 10px;
}

.dim--v {
  flex-direction: column;
  padding: 14px 0;
}

.dim--v i {
  width: 1px;
}

.dim--v b {
  width: 10px;
  height: 1px;
}

.dim--v span {
  writing-mode: vertical-rl;
}

/* Especificação em faixa horizontal */
.spec {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.spec-item {
  flex: 1 1 160px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 24px;
  border-left: 1px solid rgba(92, 200, 255, 0.2);
}

.spec-item:first-child {
  border-left: 0;
}

.spec dd {
  margin: 0;
  font-size: 14px;
  color: var(--bp-ink);
}

/* ---------- Animação de montagem da foto ---------- */

.frame {
  cursor: pointer;
}

/* Blocos que cobrem a foto: acendem em ciano e somem.
   Sem animação (movimento reduzido) ficam invisíveis e a foto aparece direto. */
.tiles {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(10, minmax(0, 1fr));
  pointer-events: none;
}

.tile {
  opacity: 0;
  background: var(--bp-bg);
  box-shadow: inset 0 0 0 1px transparent;
  animation: tile-in 0.55s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

@keyframes tile-in {
  0% {
    opacity: 1;
    background: var(--bp-bg);
    box-shadow: inset 0 0 0 1px rgba(92, 200, 255, 0.25);
    transform: scale(1);
  }
  35% {
    opacity: 1;
    background: rgba(92, 200, 255, 0.55);
    box-shadow: inset 0 0 0 1px var(--bp-cyan);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    background: rgba(92, 200, 255, 0);
    box-shadow: inset 0 0 0 1px transparent;
    transform: scale(0.85);
  }
}

/* A borda e a grade da foto surgem antes dos blocos */
.duo {
  animation: frame-in 0.4s ease 0.15s backwards;
}

@keyframes frame-in {
  from {
    border-color: transparent;
  }
}

.duo::before {
  animation: fade-in 0.6s ease 0.25s backwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}

/* Marcas de registro giram e encaixam nos cantos */
.reg {
  animation: reg-in 0.45s cubic-bezier(0.3, 1.4, 0.5, 1) backwards;
}

.reg--tl {
  animation-delay: 0s;
}

.reg--tr {
  animation-delay: 0.08s;
}

.reg--br {
  animation-delay: 0.16s;
}

.reg--bl {
  animation-delay: 0.24s;
}

@keyframes reg-in {
  from {
    opacity: 0;
    transform: scale(0) rotate(-90deg);
  }
}

/* Cotas: as linhas crescem do número para as pontas */
.dim i {
  animation: dim-grow 0.6s cubic-bezier(0.6, 0, 0.2, 1) 1.3s backwards;
}

.dim--h i:first-of-type {
  transform-origin: right;
}

.dim--h i:last-of-type {
  transform-origin: left;
}

.dim--v i {
  animation-name: dim-grow-v;
}

.dim--v i:first-of-type {
  transform-origin: bottom;
}

.dim--v i:last-of-type {
  transform-origin: top;
}

.dim span,
.dim b {
  animation: fade-in 0.4s ease 1.2s backwards;
}

.dim b {
  animation-delay: 1.8s;
}

@keyframes dim-grow {
  from {
    transform: scaleX(0);
  }
}

@keyframes dim-grow-v {
  from {
    transform: scaleY(0);
  }
}

@media (max-width: 767px) {
  .photo-col {
    flex-basis: 100%;
  }

  .spec-item {
    flex-basis: 50%;
    border-left: 0;
    border-top: 1px solid rgba(92, 200, 255, 0.2);
  }

  .spec-item:first-child,
  .spec-item:nth-child(2) {
    border-top: 0;
  }
}
</style>
