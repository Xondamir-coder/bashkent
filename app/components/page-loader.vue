<template>
  <div class="page-loader" :class="{ yellow: data?.color === 'yellow' }">
    <SvgRadialGradientBg :class="{ yellow: data?.color === 'yellow' }" />
    <div class="page-loader__content">
      <h2 ref="titleRef" class="heading-large page-loader__title">{{ data?.title }}</h2>
      <div ref="textsContainerRef" class="page-loader__texts">
        <p v-for="text in data?.texts" :key="text" ref="textsRef">
          {{ $rt(text) }}
        </p>
      </div>
      <div class="page-loader__bar">
        <div class="page-loader__bar--inner"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// loader state
const { showPageLoader } = useLoader();

// refs
const titleRef = ref();
const textsRef = ref([]);
const textsContainerRef = ref();

// direction state (forward or backward)
const isGoingForward = useState('isGoingForward', () => true);

// progress values
let progress = isGoingForward.value ? 0 : 1; // bar progress: 0 → 1
let startY = 0; // for touch tracking

// animate the bar based on progress
const animateBar = () => {
  gsap.to('.page-loader__bar--inner', {
    scaleX: progress,
    duration: 0.5,
    ease: 'power2.out'
  });
};

// handle wheel event
const onWheel = e => {
  progress += e.deltaY * 0.001; // sensitivity
  progress = Math.max(0, Math.min(1, progress)); // clamp
  animateBar();

  // exit loader when bar is full or empty depending on direction
  if (!isGoingForward.value && progress <= 0) {
    showPageLoader.value = false;
  }
  if (isGoingForward.value && progress >= 1) {
    showPageLoader.value = false;
  }
};

// handle touch start
const onTouchStart = e => {
  startY = e.touches[0].clientY;
};

// handle touch move (swipe)
const onTouchMove = e => {
  const delta = startY - e.touches[0].clientY;
  progress += delta * 0.002; // sensitivity
  progress = Math.max(0, Math.min(1, progress)); // clamp
  startY = e.touches[0].clientY;
  animateBar();

  // exit loader when bar is full or empty depending on direction
  if (!isGoingForward.value && progress <= 0) {
    showPageLoader.value = false;
  }
  if (isGoingForward.value && progress >= 1) {
    showPageLoader.value = false;
  }
};

// setup animations and listeners
onMounted(() => {
  // set initial states
  gsap.set(titleRef.value, { opacity: 1 });
  gsap.set(textsContainerRef.value, { opacity: 1 });
  gsap.set('.page-loader__bar--inner', {
    scaleX: isGoingForward.value ? 0 : 1
  });

  // animate title chars
  SplitText.create(titleRef.value, {
    type: 'chars, words',
    mask: 'chars',
    onSplit: self => {
      gsap.from(self.chars, {
        duration: 0.6,
        yPercent: 'random([-100, 100])',
        xPercent: 'random([-100, 100])',
        stagger: { from: 'random', amount: 0.6 },
        ease: 'power3.out'
      });
    }
  });

  // animate text lines
  SplitText.create(textsRef.value, {
    type: 'lines',
    mask: 'lines',
    onSplit: self => {
      gsap.from(self.lines, {
        delay: 0.3,
        yPercent: 100,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  });

  // delay input listeners so animation plays first
  setTimeout(() => {
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
  }, 1000);
});

// cleanup
onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchmove', onTouchMove);
});

// props
defineProps({
  data: {
    required: true,
    type: Object
  }
});
</script>

<style lang="scss" scoped>
@keyframes animate-bar {
  from {
    transform: scaleX(0);
  }
}
.page-loader {
  @include mix.flex-center;
  position: relative;
  min-width: 100dvw;
  min-height: 100dvh;
  background: vars.$green-linear-gradient;
  &.yellow {
    background: vars.$yellow-linear-gradient;
  }
  z-index: 50;
  position: fixed;
  &__title {
    opacity: 0;
  }
  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  &__content {
    color: #fff;
    z-index: 2;
    max-width: 47.9%;
    min-width: 343px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: max(3.7rem, 20px);
  }
  &__bar {
    height: 6px;
    width: 60%;
    min-width: 240px;
    border-radius: 1.5rem;
    background-color: #ffffff33;
    position: relative;
    overflow: hidden;
    &--inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: inherit;
      z-index: 1;
      transform-origin: left;
    }
  }
  &__texts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: max(1.2rem, 12px);
    opacity: 0;
    p:first-child {
      max-width: 43ch;
    }
    p:last-child {
      max-width: 58ch;
    }
  }
}
</style>
