<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Cursor de mira + "lanterna" que acende a grade do fundo em volta do mouse.
// Só liga com mouse (ponteiro fino) e sem preferência por movimento reduzido.
const enabled = ref(false)
const visible = ref(false)
const interactive = ref(false)
const overPhoto = ref(false)
const pressed = ref(false)

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const glow = ref<HTMLElement | null>(null)

const INTERACTIVE = 'a, button, [role="button"], label, summary'
const RING_EASE = 0.18 // quanto menor, mais o anel "atrasa"

let mouseX = 0
let mouseY = 0
let ringX = 0
let ringY = 0
let raf = 0

const tick = () => {
  ringX += (mouseX - ringX) * RING_EASE
  ringY += (mouseY - ringY) * RING_EASE
  if (dot.value) dot.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
  if (ring.value) ring.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
  if (glow.value) {
    glow.value.style.setProperty('--mx', `${mouseX}px`)
    glow.value.style.setProperty('--my', `${mouseY}px`)
    // a grade do fundo rola com a página; a camada da lanterna é fixa, então acompanha o scroll
    glow.value.style.backgroundPosition = `${-window.scrollX}px ${-window.scrollY}px`
  }
  raf = requestAnimationFrame(tick)
}

const onMove = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse') return
  mouseX = event.clientX
  mouseY = event.clientY
  if (!visible.value) {
    // primeira vez: o anel nasce no lugar certo, sem "voar" do canto da tela
    ringX = mouseX
    ringY = mouseY
    visible.value = true
  }
  const target = event.target as Element | null
  interactive.value = !!target?.closest(INTERACTIVE)
  overPhoto.value = !!target?.closest('.duo')
}

const onLeave = () => (visible.value = false)
const onDown = () => (pressed.value = true)
const onUp = () => (pressed.value = false)

onMounted(() => {
  const fine = window.matchMedia('(pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduced) return
  enabled.value = true
  document.documentElement.classList.add('has-custom-cursor')
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', onUp)
  document.documentElement.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', onUp)
  document.documentElement.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <template v-if="enabled">
    <div ref="glow" class="glow" :class="{ 'is-visible': visible }" aria-hidden="true"></div>
    <div
      class="cursor"
      :class="{
        'is-visible': visible && !overPhoto,
        'is-interactive': interactive,
        'is-pressed': pressed,
      }"
      aria-hidden="true"
    >
      <span ref="ring" class="ring"><i></i></span>
      <span ref="dot" class="dot"></span>
    </div>
  </template>
</template>

<style scoped>
/* Lanterna: a mesma grade do fundo, mais forte, recortada num círculo em volta do mouse */
.glow {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  background-image:
    linear-gradient(rgba(92, 200, 255, 0.32) 1px, transparent 1px),
    linear-gradient(90deg, rgba(92, 200, 255, 0.32) 1px, transparent 1px),
    linear-gradient(rgba(92, 200, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(92, 200, 255, 0.16) 1px, transparent 1px);
  background-size:
    120px 120px,
    120px 120px,
    24px 24px,
    24px 24px;
  -webkit-mask-image: radial-gradient(
    240px circle at var(--mx, -999px) var(--my, -999px),
    #000 0%,
    rgba(0, 0, 0, 0.5) 45%,
    transparent 100%
  );
  mask-image: radial-gradient(
    240px circle at var(--mx, -999px) var(--my, -999px),
    #000 0%,
    rgba(0, 0, 0, 0.5) 45%,
    transparent 100%
  );
}

.glow.is-visible {
  opacity: 1;
}

.cursor {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.cursor.is-visible {
  opacity: 1;
}

.dot,
.ring {
  position: fixed;
  top: 0;
  left: 0;
  will-change: transform;
}

.dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: var(--bp-cyan);
  box-shadow: 0 0 8px rgba(92, 200, 255, 0.8);
}

/* Anel com 4 marcas de mira; quem anima o tamanho é o <i>, o <span> só se move */
.ring i {
  position: absolute;
  top: -17px;
  left: -17px;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(92, 200, 255, 0.75);
  border-radius: 50%;
  transition:
    transform 0.25s cubic-bezier(0.3, 1.4, 0.5, 1),
    background 0.25s ease,
    border-color 0.25s ease;
}

.ring i::before,
.ring i::after {
  content: '';
  position: absolute;
  background: var(--bp-cyan);
}

/* marcas em cima/baixo */
.ring i::before {
  left: 50%;
  top: -6px;
  width: 1px;
  height: calc(100% + 12px);
  margin-left: -0.5px;
  -webkit-mask: linear-gradient(
    #000 0 6px,
    transparent 6px calc(100% - 6px),
    #000 calc(100% - 6px)
  );
  mask: linear-gradient(#000 0 6px, transparent 6px calc(100% - 6px), #000 calc(100% - 6px));
}

/* marcas nas laterais */
.ring i::after {
  top: 50%;
  left: -6px;
  height: 1px;
  width: calc(100% + 12px);
  margin-top: -0.5px;
  -webkit-mask: linear-gradient(
    90deg,
    #000 0 6px,
    transparent 6px calc(100% - 6px),
    #000 calc(100% - 6px)
  );
  mask: linear-gradient(90deg, #000 0 6px, transparent 6px calc(100% - 6px), #000 calc(100% - 6px));
}

.is-interactive .ring i {
  transform: scale(1.6);
  background: rgba(92, 200, 255, 0.1);
  border-color: var(--bp-cyan);
}

.is-pressed .ring i {
  transform: scale(0.75);
}

.is-interactive.is-pressed .ring i {
  transform: scale(1.3);
}
</style>

<style>
/* Esconde o cursor do sistema só quando o customizado está ligado */
html.has-custom-cursor,
html.has-custom-cursor * {
  cursor: none !important;
}
</style>
