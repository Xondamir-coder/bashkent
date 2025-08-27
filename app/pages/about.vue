<template>
  <main class="about" ref="containerRef">
    <SvgRadialGradientBg />
    <div class="about__wrapper">
      <div class="about__header">
        <h2 ref="titleRef" class="heading-large">
          Что такое <br />
          Bashkent Residence?
        </h2>
        <div class="about__header-content">
          <p ref="textRef">
            <b>Bashkent Residence</b> - это не просто жилой комплекс. Это - среда жизни, в которой
            объединены современные стандарты архитектуры, продуманная инфраструктура, эстетика
            городского комфорта и стремление к гармонии с окружающей средой.
          </p>
          <p ref="subtextRef">
            Вдохновлённый успешным одноимённым проектом в Ташкенте, новый Bashkent Residence в
            Бухаре вобрал в себя всё лучшее от столичного масштаба, адаптированное к уникальному
            историческому и культурному контексту древнего города.
          </p>
        </div>
      </div>
      <div class="about__container">
        <NuxtPicture src="/images/home/buildings.jpg" class="about__image" />
        <NuxtPicture src="/images/home/tree-top.png" class="about__picture" />
        <NuxtPicture src="/images/home/light.png" class="about__picture" />
        <NuxtPicture src="/images/home/tree-2.png" class="about__picture" />
        <button class="about__play">
          <SvgVideoPlayText />
        </button>
        <div class="about__box">
          <p>
            Здесь пространство перестаёт быть просто квадратными метрами - оно становится
            продолжением вашей личности, отражением вашего вкуса и заботы о будущем.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { SplitText } from 'gsap/SplitText';

const router = useRouter();
const { $gsap } = useNuxtApp();
const { showPreloader, showPageLoader } = useLoader();

let tl;

const titleRef = ref();
const textRef = ref();
const subtextRef = ref();
const containerRef = ref();

// useImageParallax(containerRef, { selector: '.about__picture', strength: 50, ease: 0.1 });

onMounted(() => {
  tl = $gsap.timeline();

  // Splits
  const titleSplit = SplitText.create(titleRef.value, {
    type: 'words',
    mask: 'words'
  });
  const textSplit = SplitText.create(textRef.value, {
    type: 'lines',
    mask: 'lines'
  });
  const subtextSplit = SplitText.create(subtextRef.value, {
    type: 'lines',
    mask: 'lines'
  });

  // Animations
  tl.from(titleSplit.words, {
    yPercent: 100,
    ease: 'power3.out',
    stagger: 0.12,
    duration: 0.7
  });
  tl.from(
    textSplit.lines,
    {
      yPercent: 100,
      ease: 'power3.out',
      stagger: 0.12,
      duration: 0.7
    },
    '-=.8'
  );
  tl.from(
    subtextSplit.lines,
    {
      yPercent: 100,
      ease: 'power3.out',
      stagger: 0.12,
      duration: 0.7
    },
    '-=.8'
  );
  tl.from(
    '.about__image img',
    {
      scale: 1.1,
      opacity: 0,
      duration: 0.7
    },
    0.25
  );
  tl.from(
    '.about__picture img',
    {
      stagger: 0.1,
      scale: 0.85,
      opacity: 0
    },
    0.5
  );
});
onUnmounted(() => {
  if (tl) tl.kill();
});

watch([showPreloader, showPageLoader], () => {
  if (!showPreloader.value && !showPageLoader.value) tl.restart();
});

useScrollPage(direction => {
  if (direction === 'next') {
    router.push('/portfolio');
  } else {
    router.push('/');
  }
});
useHead({
  title: 'About'
});
</script>

<style lang="scss" scoped>
.about {
  background: linear-gradient(246.98deg, #0b726b 0%, #065650 94.35%);
  display: flex;

  &__wrapper {
    @include mix.block-padding;
    flex: 1;
    color: #fff;
    display: flex;
    gap: max(7.7rem, 57px);
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
    @media screen and (max-width: vars.$bp-large-mobile) {
      padding-inline: 0;
      padding-bottom: calc(var(--block-spacing) + max(7rem, 70px));
    }
  }
  &__play {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: max(12.3rem, 90px);
  }
  &__picture {
    z-index: 2;
    &:nth-child(2) {
      width: 30%;
      min-width: 200px;
      right: 0;
      top: 0;
      transform: translateY(-100%);
    }
    &:nth-child(3) {
      width: 15.7%;
      top: -10%;
      min-width: 104px;
      left: calc(var(--block-spacing) * -1);
    }
    &:last-of-type {
      width: 24%;
      left: calc(var(--block-spacing) * -1);
      bottom: 0;
      @media screen and (max-width: vars.$bp-large-mobile) {
        transform: translateX(-20%);
      }
    }
  }

  &__image {
    position: absolute;
    inset: 0;
    // height: 100%;
    // aspect-ratio: 1160/460;
    @media screen and (max-width: vars.$bp-large-mobile) {
      // aspect-ratio: 375/210;
    }
  }
  &__container {
    flex: 1;
    position: relative;
    padding-right: var(--block-spacing);
    @media screen and (max-width: vars.$bp-large-mobile) {
      padding-right: 0;
    }
    & > * {
      position: absolute;
    }
  }
  &__box {
    right: calc(var(--block-spacing) * -0.75);
    bottom: 2.4rem;
    z-index: 2;
    max-width: 37ch;
    padding-block: max(1.9rem, 15px);
    background-color: vars.$gold;
    text-align: center;
    font-weight: 700;
    font-size: max(1.6rem, 12px);
    @media screen and (max-width: vars.$bp-large-mobile) {
      font-weight: 400;
      padding-inline: 13px;
      margin-bottom: 0;
      margin-right: 0;
      align-self: flex-end;
      justify-self: center;
      transform: translateY(50%);
    }
  }
  &__banner {
    transform: scale(1.1);
  }
  &__header {
    display: flex;
    gap: 11.2rem;
    @media screen and (max-width: vars.$bp-large-mobile) {
      flex-direction: column;
      gap: max(5rem, 20px);
      padding-inline: var(--block-spacing);
    }
    &-content {
      display: flex;
      flex-direction: column;
      & > *:first-of-type {
        padding-bottom: max(1.6rem, 8px);
      }
      & > *:last-of-type {
        padding-top: max(1.6rem, 8px);
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          top: 0;
          left: 0;
          opacity: 0.3;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            #ffffff 50%,
            rgba(255, 255, 255, 0) 100%
          );
        }
      }
    }
    & > * {
      flex: 1;
    }
  }
  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__pattern {
    z-index: 1;
    position: absolute;
    width: 59%;
    left: 50%;
    translate: -50%;
    &:first-of-type {
      top: 0;
    }
    &:last-of-type {
      bottom: 0;
      rotate: 180deg;
    }
  }
}
</style>
