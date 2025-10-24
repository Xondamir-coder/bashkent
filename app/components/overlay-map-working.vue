<template>
  <main ref="root" class="overlay">
    <GlassButton class="overlay__close" @click="$router.back()">
      <SvgClose />
    </GlassButton>

    <div ref="wrapper" class="overlay__wrapper">
      <div
        ref="layer"
        class="overlay__layer"
        :style="{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          left: `50%`,
          top: `50%`,
          transform: `translate(-50%, -50%)`
        }"
      >
        <img :src="image" alt="overlay banner" class="overlay__picture" draggable="false" >
        <svg
          class="overlay__container"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            v-for="(path, index) in paths"
            :key="index"
            :d="path.path"
            class="overlay__container-path"
            @click="() => emitSelect(path)"
            @pointerenter="() => emitHover(path)"
          />
        </svg>
      </div>

      <slot />
    </div>
  </main>
</template>

<script setup>
import gsap from 'gsap';

/* Props & emits */
defineProps({
  image: { type: String, required: true },
  paths: { type: Array, required: true }
});
const emit = defineEmits(['select-path', 'hover-path']);

/* Refs */
const root = ref(null);
const wrapper = ref(null);
const layer = ref(null);

/* Constants */
const ASPECT_W = 1440;
const ASPECT_H = 900;
const BREAKPOINT = 1280;
const OVERSCALE = 1.1; // 10% bigger than necessary

/* Reactive state */
const state = reactive({
  vw: 0,
  vh: 0,
  scaledWidth: ASPECT_W,
  scaledHeight: ASPECT_H,
  overflowX: 0,
  overflowY: 0,
  desktop: false
});

/* Exposed for template binding */
const scaledWidth = ref(ASPECT_W);
const scaledHeight = ref(ASPECT_H);

const emitSelect = path => emit('select-path', path);
const emitHover = path => emit('hover-path', path);

const applyScrollMode = () => {
  if (state.desktop) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (root.value) root.value.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (root.value) root.value.style.overflow = '';
  }
};

/* Recalculate scaling with overscale */
const recalc = () => {
  state.vw = window.innerWidth;
  state.vh = window.innerHeight;
  state.desktop = state.vw >= BREAKPOINT;

  const scaleX = state.vw / ASPECT_W;
  const scaleY = state.vh / ASPECT_H;
  const scale = Math.max(scaleX, scaleY) * OVERSCALE;

  state.scaledWidth = Math.round(ASPECT_W * scale);
  state.scaledHeight = Math.round(ASPECT_H * scale);

  scaledWidth.value = state.scaledWidth;
  scaledHeight.value = state.scaledHeight;

  state.overflowX = Math.max(0, state.scaledWidth - state.vw);
  state.overflowY = Math.max(0, state.scaledHeight - state.vh);

  if (layer.value) {
    gsap.killTweensOf(layer.value);
    gsap.set(layer.value, { x: 0, y: 0 });
  }

  applyScrollMode();
};

/* Parallax */
const handleParallax = e => {
  if (!state.desktop || !layer.value) return;

  const nx = (e.clientX / state.vw - 0.5) * 2;
  const ny = (e.clientY / state.vh - 0.5) * 2;

  const targetX = -nx * (state.overflowX / 2);
  const targetY = -ny * (state.overflowY / 2);

  gsap.to(layer.value, {
    x: Math.round(targetX),
    y: Math.round(targetY),
    duration: 0.9,
    ease: 'power3.out',
    overwrite: true
  });
};

const resetParallax = () => {
  if (!layer.value) return;
  gsap.to(layer.value, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
};

/* Resize debounce */
let resizeTimer = null;
const onResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(recalc, 120);
};

/* Lifecycle */
onMounted(() => {
  recalc();
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', recalc, { passive: true });
  window.addEventListener('pointerleave', resetParallax);
  window.addEventListener('blur', resetParallax);
  window.addEventListener('pointermove', handleParallax);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
  window.removeEventListener('orientationchange', recalc);
  window.removeEventListener('pointerleave', resetParallax);
  window.removeEventListener('blur', resetParallax);
  window.removeEventListener('pointermove', handleParallax);
  clearTimeout(resizeTimer);

  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  if (root.value) root.value.style.overflow = '';
});
</script>

<style lang="scss" scoped>
.overlay {
  user-select: none;
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  touch-action: none;

  &__close {
    position: absolute !important;
    right: var(--block-spacing);
    top: calc(var(--header-height) + max(3.2rem, 20px));
    z-index: 50;
  }

  &__wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media screen and (max-width: 1280px) {
      position: relative;
      overflow: auto;
      touch-action: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  &__layer {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    will-change: transform;
    z-index: 10;
  }

  &__picture,
  &__container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &__picture {
    object-fit: cover;
    pointer-events: none;
    user-drag: none;
    user-select: none;
  }

  &__container {
    z-index: 20;
    &-path {
      cursor: pointer;
      transition: fill 160ms ease;
      fill: transparent;
      &:hover {
        fill: #ffff0080;
      }
    }
  }
}
</style>
