<template>
  <div class="page-loader" :class="{ yellow: currentPageData?.color === 'yellow' }">
    <SvgRadialGradientBg :class="{ yellow: currentPageData?.color === 'yellow' }" />
    <div class="page-loader__content">
      <h2 class="heading-large page-loader__title">
        {{ currentPageData?.title }}
      </h2>
      <div class="page-loader__texts">
        <p v-for="(text, index) in currentPageData?.texts" :key="index" class="page-loader__text">
          {{ $rt(text) }}
        </p>
      </div>
      <div class="page-loader__bar">
        <div class="page-loader__bar--inner" />
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
const { tm, rt } = useI18n();

const newPageName = useState('newPageName');
const pages = useState('pages');

const showPageLoader = useState('showPageLoader', () => false);

// page loader
const allPagesData = computed(() =>
  pages.value?.map((page, i) => ({
    name: page,
    title: rt(tm('page-loader')[i].title),
    texts: tm('page-loader')[i].texts,
    color: i % 2 === 0 ? 'yellow' : ''
  }))
);
const currentPageData = computed(() => {
  return allPagesData.value?.find(item => item.name === newPageName.value);
});

// Animations
onMounted(() => {
  setTimeout(() => {
    showPageLoader.value = false;
  }, 2000);

  // set initial states
  gsap.set('.page-loader__title', { opacity: 1 });
  gsap.set('.page-loader__text', { opacity: 1 });

  // animate title chars
  SplitText.create('.page-loader__title', {
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
  SplitText.create('.page-loader__text', {
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
  z-index: 50;
  position: fixed;
  &.yellow {
    background: vars.$yellow-linear-gradient;
  }
  &__title,
  &__text {
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
      animation: animate-bar 1.5s backwards 0.5s;
    }
  }
  &__texts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: max(1.2rem, 12px);
    p:first-child {
      max-width: 43ch;
    }
    p:last-child {
      max-width: 58ch;
    }
  }
}
</style>
