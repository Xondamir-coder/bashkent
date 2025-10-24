<template>
  <main ref="root" class="overlay">
    <GlassButton class="overlay__close" @click="$router.back()">
      <SvgClose />
    </GlassButton>

    <div ref="wrapper" class="overlay__wrapper">
      <div ref="layer" class="overlay__layer" :style="layerStyle">
        <img
          :src="image"
          alt="overlay banner"
          class="overlay__picture"
          draggable="false"
          :class="{ loaded: isImgLoaded }"
          @load="isImgLoaded = true"
        />

        <svg
          class="overlay__container"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          role="img"
        >
          <path
            v-for="(path, index) in paths"
            :key="index"
            :d="path.path"
            :data-floor="path.floor_number"
            :data-block="path.block_id"
            class="overlay__container-path"
            @click="() => emitSelect(path)"
            @pointerenter="() => emitHover(path)"
            @pointerleave="() => emitLeave()"
          />
        </svg>
      </div>
    </div>

    <slot />
  </main>
</template>

<script setup>
import gsap from 'gsap';

/* props and emits (JS, not TS) */
const props = defineProps({
  image: { type: String, required: true },
  paths: { type: Array, required: true },
  overscale: { type: Number, default: 1.1 }, // optional override per usage
  breakpoint: { type: Number, default: 1280 }
});
const emit = defineEmits(['select-path', 'hover-path', 'leave-path']);

/* refs */
const root = ref(null);
const wrapper = ref(null);
const layer = ref(null);
const isImgLoaded = ref(false);

/* constants */
const ASPECT_W = 1440;
const ASPECT_H = 900;

/* reactive state */
const state = reactive({
  vw: 0,
  vh: 0,
  scale: 1,
  scaledWidth: ASPECT_W,
  scaledHeight: ASPECT_H,
  overflowX: 0,
  overflowY: 0,
  desktop: false
});

/* exposed for template binding */
const layerStyle = ref({ width: `${ASPECT_W}px`, height: `${ASPECT_H}px` });

/* helpers */
const emitSelect = path => emit('select-path', path);
const emitHover = path => emit('hover-path', path);
const emitLeave = () => emit('leave-path', null);

const applyScrollMode = () => {
  if (state.desktop) {
    // desktop: lock page scroll, let overlay manage visual
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (root.value) {
      root.value.style.overflow = 'hidden';
      root.value.style.touchAction = 'none';
    }
  } else {
    // mobile/tablet: allow overlay to scroll internally
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (root.value) {
      root.value.style.overflow = '';
      root.value.style.touchAction = '';
    }
  }
};

/* recalc sizes and mode */
const recalc = () => {
  state.vw = window.innerWidth;
  state.vh = window.innerHeight;
  state.desktop = state.vw >= props.breakpoint;

  // scale to cover and then overscale so both axes overflow
  const scaleX = state.vw / ASPECT_W;
  const scaleY = state.vh / ASPECT_H;
  const baseScale = Math.max(scaleX, scaleY);
  state.scale = baseScale * props.overscale;

  state.scaledWidth = Math.round(ASPECT_W * state.scale);
  state.scaledHeight = Math.round(ASPECT_H * state.scale);

  state.overflowX = Math.max(0, state.scaledWidth - state.vw);
  state.overflowY = Math.max(0, state.scaledHeight - state.vh);

  // set layer style depending on mode
  if (state.desktop) {
    layerStyle.value = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: `${state.scaledWidth}px`,
      height: `${state.scaledHeight}px`
    };
    // reset transform
    if (layer.value) {
      gsap.killTweensOf(layer.value);
      gsap.set(layer.value, { x: 0, y: 0 });
    }
  } else {
    // mobile/tablet: flow content normally inside scrollable wrapper.
    // use margin: 0 auto to center horizontally and allow scroll on both sides.
    layerStyle.value = {
      position: 'relative',
      left: 'auto',
      top: 'auto',
      transform: 'none',
      margin: '0 auto',
      width: `${state.scaledWidth}px`,
      height: `${state.scaledHeight}px`
    };
    // reset any leftover transforms
    if (layer.value) {
      gsap.killTweensOf(layer.value);
      gsap.set(layer.value, { x: 0, y: 0 });
    }
  }

  applyScrollMode();

  // when switching to mobile, center the initial scroll so user can pan both directions
  if (!state.desktop && wrapper.value) {
    // allow layout to update first
    nextTick(() => {
      // give the browser one frame to layout
      requestAnimationFrame(() => {
        try {
          wrapper.value.scrollLeft = Math.round(state.overflowX / 2);
          wrapper.value.scrollTop = Math.round(state.overflowY / 2);
        } catch (err) {
          // ignore if not scrollable yet
          console.log(err);
        }
      });
    });
  }
};

/* parallax handlers (arrow functions) */
const handleParallax = e => {
  if (!state.desktop || !layer.value) return;

  const nx = (e.clientX / state.vw - 0.5) * 2; // -1..1
  const ny = (e.clientY / state.vh - 0.5) * 2; // -1..1

  // move opposite to pointer up to half of overflow
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

/* resize debounce */
let resizeTimer = null;
const onResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(recalc, 120);
};

/* lifecycle */
onMounted(() => {
  recalc();
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', recalc, { passive: true });

  // global pointermove toggles parallax only on desktop
  window.addEventListener('pointermove', handleParallax);
  window.addEventListener('pointerleave', resetParallax);
  window.addEventListener('blur', resetParallax);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
  window.removeEventListener('orientationchange', recalc);
  window.removeEventListener('pointermove', handleParallax);
  window.removeEventListener('pointerleave', resetParallax);
  window.removeEventListener('blur', resetParallax);
  clearTimeout(resizeTimer);

  // restore page
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  if (root.value) {
    root.value.style.overflow = '';
    root.value.style.touchAction = '';
  }
});
</script>

<style lang="scss" scoped>
@keyframes scale-appear {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
}
.overlay {
  user-select: none;
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden; // toggled by JS
  z-index: 0;
  &:not(.overlay--buildings) .overlay__container-path:hover {
    fill: #ffff0080;
  }
  @media screen and (min-width: 1280px) {
    &.overlay--buildings .overlay__container-path:hover {
      fill: #ffff0080;
    }
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    opacity: 0.8;
    z-index: 10;
    pointer-events: none;
    @media screen and (min-width: 1280px) {
      display: none;
    }
  }
  &__close {
    position: absolute !important;
    right: var(--block-spacing);
    top: calc(var(--header-height) + max(3.2rem, 20px));
    z-index: 60;
  }

  &__wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;

    // mobile/tablet: let the wrapper scroll and keep layer flowable inside
    @media screen and (max-width: 1279px) {
      position: absolute; /* still fills viewport */
      overflow: auto;
      display: block;
      -webkit-overflow-scrolling: touch;
      touch-action: auto;
      scrollbar-width: 0;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  /* layer will receive transform from GSAP on desktop.
     On mobile it becomes a block with margin:auto so wrapper.scrollLeft can center it.
  */
  &__layer {
    position: absolute; /* overwritten inline in mobile mode */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    will-change: transform;
    pointer-events: auto;
    z-index: 10;

    @media screen and (max-width: 1279px) {
      position: relative;
      left: auto;
      top: auto;
      transform: none;
      margin: 0 auto;
    }
  }

  &__picture,
  &__container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  /* image must not capture pointer events so SVG remains interactive */
  &__picture {
    object-fit: cover;
    pointer-events: none;
    user-drag: none;
    user-select: none;
    &.loaded {
      animation: scale-appear 1s backwards;
    }
  }

  &__container {
    z-index: 20;
    pointer-events: auto;

    &-path {
      cursor: pointer;
      transition: fill 160ms ease;
      fill: transparent;
      pointer-events: auto;
      &.active {
        fill: #ffff0080;
      }
    }
  }
}
</style>
