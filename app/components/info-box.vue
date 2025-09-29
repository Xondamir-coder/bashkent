<template>
  <div class="info-box-layer">
    <div ref="boxEl" class="info-box" :class="{ visible: isActive }">
      <h2 class="info-box__title">
        {{ title }}
      </h2>
      <div class="info-box__text">
        <div v-for="(text, i) in texts" :key="i">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  texts: {
    type: Array,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

const boxEl = ref(null);

const OFFSET_X = 24; // how far to the right of cursor
const OFFSET_Y = 16; // how far below cursor
const EDGE_MARGIN = 8; // keep inside viewport

const handlePointer = e => {
  if (!props.title || !boxEl.value) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const boxRect = boxEl.value.getBoundingClientRect();

  let x = e.clientX + OFFSET_X;
  let y = e.clientY + OFFSET_Y;

  // Clamp so box stays inside screen
  const maxX = vw - boxRect.width - EDGE_MARGIN;
  const maxY = vh - boxRect.height - EDGE_MARGIN;
  x = Math.min(x, maxX);
  y = Math.min(y, maxY);

  gsap.to(boxEl.value, {
    left: x,
    top: y,
    duration: 0.25,
    ease: 'power3.out',
    overwrite: true
  });
};

onMounted(() => {
  window.addEventListener('pointermove', handlePointer);
});
onUnmounted(() => {
  window.removeEventListener('pointermove', handlePointer);
});
</script>

<style scoped lang="scss">
.info-box {
  position: fixed;
  top: 0;
  left: 0;
  width: max-content;
  pointer-events: none;
  background-color: #fff;
  border-radius: max(1.6rem, 12px);
  padding: max(2.4rem, 24px);
  display: flex;
  flex-direction: column;
  gap: max(2rem, 16px);
  font-weight: 500;
  box-shadow: 0px 4px 32px 0px #0000001f;
  opacity: 0;
  transition: opacity 0.3s;
  &-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 50;
  }
  &.visible {
    opacity: 1;
  }
  &__text {
    font-size: max(1.6rem, 14px);
    line-height: 1.35;
    font-weight: 500;
  }
  &__title {
    font-family: vars.$font-angst;
    font-size: max(2.8rem, 24px);
    font-weight: bold;
    color: vars.$gold;
  }
}
</style>
