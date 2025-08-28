<template>
  <main ref="homeRef" class="home" :class="{ hidden: showPreloader || showPageLoader }">
    <SvgBigPattern class="home__pattern" />
    <NuxtPicture data-depth="0.2" src="/images/home/wave.png" alt="wave" class="home__image" />
    <NuxtPicture
      data-depth="0.3"
      src="/images/home/building-small.png"
      alt="small building"
      class="home__image"
    />
    <NuxtPicture data-depth=".35" src="/images/home/tree.png" alt="tree" class="home__image" />
    <NuxtPicture
      data-depth=".6"
      src="/images/home/building-big.png"
      alt="big building"
      class="home__image"
    />
    <NuxtPicture
      data-depth="1"
      src="/images/home/rotated-tree.png"
      alt="rotated tree"
      class="home__image"
    />
    <div class="home__content">
      <p ref="textRef" class="home__content-text">Новый этап архитектуры.</p>
      <h1 ref="titleRef" class="heading-extra-large">жизни Город Бухара</h1>
      <div class="home__content-bottom">
        <img
          src="~/assets/images/home-flower.jpg"
          alt="home flower"
          class="home__content-bottom-image"
        >
        <span ref="subtextRef">Новая философия городской </span>
      </div>
    </div>
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const { showPreloader, showPageLoader } = useLoader();
const router = useRouter();

const titleRef = ref();
const textRef = ref();
const subtextRef = ref();
const homeRef = ref();

// 🔒 store cleanup refs
let tl;

const handleTextAnimations = () => {
  tl = gsap.timeline();
  const { words: textWords } = SplitText.create(textRef.value, {
    type: 'words',
    mask: 'words'
  });
  const { words: titleWords } = SplitText.create(titleRef.value, {
    type: 'words',
    mask: 'words'
  });
  const { words: subtextWords } = SplitText.create(subtextRef.value, {
    type: 'words',
    mask: 'words'
  });

  tl.from(textWords, {
    yPercent: 100,
    ease: 'power3.out',
    stagger: 0.12,
    duration: 0.7
  });
  tl.from(
    titleWords,
    {
      yPercent: 100,
      rotation: 10,
      transformOrigin: 'left',
      ease: 'power2.out',
      stagger: 0.1,
      duration: 0.7
    },
    '-=0.5'
  );
  tl.from(
    subtextWords,
    {
      yPercent: 100,
      ease: 'power2.out',
      stagger: 0.05,
      duration: 0.6
    },
    '-=0.5'
  );
};

useImageParallax(homeRef, { selector: '.home__image', strength: 50, ease: 0.1 });

watch([showPreloader, showPageLoader], () => {
  if (!showPreloader.value && !showPageLoader.value) tl.restart();
});

onMounted(() => {
  handleTextAnimations();
});
onUnmounted(() => {
  if (tl) tl.kill();
});

useHead({ title: 'Home' });
useScrollPage(direction => {
  if (direction === 'next') {
    router.push('/about');
  }
});
</script>

<style lang="scss" scoped>
@use 'sass:math';
@use 'sass:map';
@use 'sass:list';

.home {
  @include mix.block-padding;
  background: linear-gradient(180deg, #ffffff 15.8%, #f9e9d8 100%);
  display: flex;
  position: relative;
  overflow: hidden;
  &.hidden {
    .home__image {
      $transforms: (
        1: (
          0.95,
          -3deg,
          -4px 2px
        ),
        2: (
          1.08,
          5deg,
          6px -3px
        ),
        3: (
          1.02,
          -2deg,
          -2px -4px
        ),
        4: (
          0.98,
          4deg,
          3px 5px
        ),
        5: (
          1.1,
          -6deg,
          -5px 1px
        )
      );

      @for $i from 1 through 5 {
        &:nth-of-type(#{$i}) {
          $values: map.get($transforms, $i);

          & > * {
            scale: list.nth($values, 1);
            rotate: list.nth($values, 2);
            translate: list.nth($values, 3);
            opacity: 0;
          }
        }
      }

      & > * {
        opacity: 0;
      }
    }
  }

  &__pattern {
    position: absolute;
    z-index: 1;
    width: 56.3%;
    right: 1.7%;
    top: 2.4%;
    @media screen and (max-width: vars.$bp-large-mobile) {
      min-width: 65vh;
      left: 50%;
      top: 60%;
      right: auto;
      transform: translate(-50%, -50%);
    }
  }
  &__image {
    --perspective: -4%;
    position: absolute;
    z-index: 1;
    bottom: var(--perspective);
    transition: none;
    will-change: transform;
    // transition: all 0.5s;
    // @for $i from 1 through 5 {
    //   &:nth-of-type(#{$i}) {
    //     transition-delay: $i * 0.1s;
    //   }
    // }
    @media screen and (max-width: vars.$bp-ipad-pro) {
      --perspective: 0;
    }
    & > * {
      transition: all 0.5s;
    }
    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        & > * {
          transition-delay: $i * 0.1s;
        }
      }
    }
    &:first-of-type {
      right: var(--perspective);
      width: 100%;
      min-width: 132vh;
      @media screen and (max-width: vars.$bp-large-mobile) {
        transform: translate(12%, 10%);
      }
    }
    &:nth-of-type(2) {
      left: 18%;
      width: 32%;
      @media screen and (max-width: vars.$bp-large-mobile) {
        display: none;
      }
    }
    &:nth-of-type(3) {
      left: var(--perspective);
      width: 32.5%;
      min-width: 226px;
      z-index: 2;
    }
    &:nth-of-type(4) {
      right: var(--perspective);
      width: 51%;
      min-width: 60vh;
      @media screen and (max-width: vars.$bp-large-mobile) {
        transform: translateX(30%);
      }
    }
    &:last-of-type {
      top: var(--perspective);
      bottom: auto;
      right: var(--perspective);
      width: 21%;
      min-width: 125px;
    }
  }
  &__content {
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    gap: max(1.2rem, 8px);
    z-index: 3;
    h1 {
      max-width: 15ch;
    }
    &-text {
      font-size: max(1.8rem, 12px);
      color: vars.$darker-grey;
    }
    &-bottom {
      margin-top: max(0.8rem, 4px);
      display: flex;
      gap: max(2.3rem, 12px);
      align-items: center;
      span {
        font-weight: 800;
        font-size: max(2rem, 12px);
        color: vars.$lighter-black;
        font-family: vars.$font-gothic-a1;
        max-width: 20ch;
      }
      &-image {
        width: max(6rem, 32px);
        height: max(6rem, 32px);
      }
    }
  }
}
</style>
