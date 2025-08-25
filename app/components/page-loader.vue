<template>
  <div class="page-loader" :class="{ yellow: data.color === 'yellow' }">
    <SvgRadialGradientBg :class="{ yellow: data.color === 'yellow' }" />
    <div class="page-loader__content">
      <h2 ref="titleRef" class="heading-large page-loader__title">{{ data.title }}</h2>
      <div class="page-loader__texts" ref="textsContainerRef">
        <p v-for="text in data.texts" :key="text" ref="textsRef">
          {{ text }}
        </p>
      </div>
      <div class="page-loader__bar" />
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const titleRef = ref();
const textsRef = ref([]);
const textsContainerRef = ref();

onMounted(() => {
  gsap.set(titleRef.value, { opacity: 1 });
  gsap.set(textsContainerRef.value, { opacity: 1 });

  const titleSplit = SplitText.create(titleRef.value, {
    type: 'chars, words',
    mask: 'chars'
  });
  const textsSplit = Array.from(textsRef.value).map(text =>
    SplitText.create(text, {
      type: 'lines',
      mask: 'lines'
    })
  );

  const tl = gsap.timeline();

  // animate title
  tl.from(titleSplit.chars, {
    duration: 0.6,
    yPercent: 'random([-100, 100])',
    xPercent: 'random([-100, 100])',
    stagger: {
      from: 'random',
      amount: 0.6
    },
    ease: 'power3.out'
  });

  // animate texts one by one, sequentially
  textsSplit.forEach(split => {
    tl.from(
      split.lines,
      {
        yPercent: 100,
        stagger: {
          each: 0.1,
          from: 0
        },
        ease: 'power3.out'
      },
      '-=0.5'
    ); // 👈 no offset, so it plays after the previous one
  });
});

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
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: inherit;
      z-index: 1;
      transform-origin: left;
      animation: animate-bar 4s forwards ease-in-out;
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
