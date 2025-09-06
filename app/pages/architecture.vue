<template>
  <main class="architecture" :class="{ hidden: showPreloader || showPageLoader }">
    <NuxtPicture
      format="avif"
      sizes="(max-width: 640px) 640px, 1280px"
      v-for="(pic, index) in pics"
      :key="index"
      :src="pic"
      alt="banner"
      class="architecture__banner"
      :class="{ hidden: index !== currentPage }"
    />
    <div class="architecture__box">
      <div
        v-for="(content, index) in contents"
        :key="index"
        class="architecture__content"
        :class="{ hidden: index !== currentPage }"
      >
        <h2 class="heading-large">{{ content.title }}</h2>
        <p class="architecture__content-text">
          {{ content.text }}
        </p>
      </div>
    </div>
    <div class="architecture__bottom">
      <div class="architecture__nav">
        <button
          v-for="(name, i) in $tm('architecture.nav')"
          :key="i"
          class="architecture__nav-item"
          :class="{ active: currentPage === i }"
          @click="changePage(i)"
        >
          {{ $rt(name) }}
        </button>
      </div>
      <PageCounter v-model="currentPage" :pages="$tm('architecture.nav').length" />
    </div>
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import archBg from '/images/architecture-bg.jpg';
import housingBg from '/images/housing.jpg';

// Composables
const { showPreloader, showPageLoader } = useLoader();
const { t } = useI18n();

// State
const currentPage = ref(0);
const changePage = index => (currentPage.value = index);

const pics = [archBg, housingBg, archBg, housingBg, archBg, housingBg];
const contents = computed(() =>
  Array(6).fill({
    title: t('architecture.title'),
    text: t('architecture.text')
  })
);

// GSAP timeline
let tl;

// Watchers
watch([showPreloader, showPageLoader], () => {
  if (!showPreloader.value && !showPageLoader.value) {
    tl.restart();
  }
});
const handleKeyup = e => {
  if (e.key === 'ArrowRight' && currentPage.value < 5) {
    changePage(currentPage.value + 1);
  }
  if (e.key === 'ArrowLeft' && currentPage.value > 0) {
    changePage(currentPage.value - 1);
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('keyup', handleKeyup);

  tl = gsap.timeline();

  // Animate title
  SplitText.create('.architecture__content:first-child h2', {
    type: 'words',
    mask: 'words',
    onSplit: self => {
      tl.from(self.words, {
        yPercent: 120,
        rotationX: -90,
        opacity: 0,
        transformOrigin: '50% 100%',
        ease: 'back.out(1.7)',
        stagger: 0.08,
        duration: 0.8
      });
    }
  });

  // Animate text
  SplitText.create('.architecture__content:first-child .architecture__content-text', {
    type: 'lines',
    mask: 'lines',
    onSplit: self => {
      tl.from(
        self.lines,
        {
          yPercent: 120,
          opacity: 0,
          ease: 'elastic.out(1, 0.5)',
          duration: 1.2,
          stagger: 0.1
        },
        '-=0.6'
      );
    }
  });
});
onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyup);
  if (tl) tl.kill();
});

// Scroll navigation
useScrollPage(direction => {
  if (direction === 'next') {
    useLocaleNavigate('/formula');
  } else {
    useLocaleNavigate('/portfolio');
  }
});

// Head meta
useHead({
  title: 'Architecture'
});
</script>

<style lang="scss" scoped>
.architecture {
  @include mix.block-padding;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: max(2.4rem, 16px);
  &.hidden {
    .architecture__banner > * {
      opacity: 0;
      transform: scale(1.1);
    }
    .architecture__bottom > * {
      @for $i from 1 through 2 {
        &:nth-child(#{$i}) {
          transform: translateY(25px);
          opacity: 0;
        }
      }
    }
  }
  &__banner {
    z-index: -1;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    &.hidden > * {
      opacity: 0;
      transform: scale(1.05);
    }
    & > * {
      transition: all 1s;
      object-position: 34%;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    & > * {
      transition-property: opacity, transform;
      transition-duration: 0.5s;
      @for $i from 1 through 2 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 0.2s + 0.5s;
        }
      }
    }
    @media screen and (max-width: vars.$bp-ipad-pro) {
      justify-content: center;
    }
  }
  &__nav {
    display: flex;
    gap: max(2.4rem, 14px);
    padding-inline: 2.4rem;
    border-radius: 1.2rem;
    background-color: #fff;
    position: relative;
    @media screen and (max-width: vars.$bp-ipad-pro) {
      display: none;
    }

    &-item {
      font-weight: 500;
      color: vars.$darker-grey;
      position: relative;
      padding-block: 1.4rem;
      &.active::after {
        transform: translateX(-50%) scaleX(1);
      }
      &::after {
        content: '';
        position: absolute;
        bottom: max(0.1rem, 1px);
        left: 50%;
        transition: transform 0.5s;
        transform: translateX(-50%) scaleX(0);
        width: 122.2222%;
        height: 3px;
        background-color: vars.$teal;
        border-top-left-radius: 2.2rem;
        border-top-right-radius: 2.2rem;
      }
    }
  }
  &__box {
    display: grid;
    min-width: max(343px, 34.3rem);
    margin-block: auto;
    @media screen and (min-width: vars.$bp-large-mobile) {
      max-width: 42%;
    }
    & > * {
      grid-area: 1/1/2/2;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: max(2.4rem, 24px);
    color: #fff;
    transition: all 1s;
    &.hidden {
      opacity: 0;
      pointer-events: none;
      transform: translateY(15%);
    }

    @media screen and (max-width: vars.$bp-large-mobile) {
      margin-top: auto;
      margin-bottom: max(6rem, 60px);
    }
    &-text {
      font-size: max(1.8rem, 14px);
    }
  }

  &__page {
    min-width: 4.1rem;
    font-size: max(1.6rem, 16px);
    text-align: center;
  }
}
</style>
