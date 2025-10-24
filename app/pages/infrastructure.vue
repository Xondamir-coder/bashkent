<template>
  <main
    ref="containerRef"
    class="infrastructure"
    :class="{ hidden: showPreloader || showPageLoader }"
  >
    <SvgFadingPattern class="infrastructure__pattern" />
    <SvgFadingPattern class="infrastructure__pattern" />
    <MyPicture
      data-depth="0.4"
      class="infrastructure__parallax infrastructure__picture"
      src="picnic.jpg"
      alt="picnic"
    />
    <MyPicture
      data-depth="0.45"
      class="infrastructure__parallax infrastructure__picture"
      src="hugging.jpg"
      alt="hugging"
    />
    <MyPicture
      data-depth="0.8"
      class="infrastructure__parallax infrastructure__picture"
      src="camera.png"
      alt="cameras"
    />
    <div class="infrastructure__content-box">
      <div class="infrastructure__content">
        <h2 class="heading-large">{{ $t('infrastructure.title') }}</h2>
        <p class="infrastructure__content-text">
          {{ $t('infrastructure.text') }}
        </p>
      </div>
    </div>
    <div class="infrastructure__box">
      <MyPicture
        data-depth=".2"
        class="infrastructure__parallax infrastructure__box-picture"
        src="street.jpg"
        alt="street"
      />
      <MyPicture
        data-depth="0.5"
        class="infrastructure__parallax infrastructure__box-picture"
        src="tree.png"
        alt="tree"
      />
    </div>
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Composables
const showPreloader = useState('showPreloader');
const showPageLoader = useState('showPageLoader');

// State
const containerRef = ref();
let tl;

// Functions
const changePage = newPage => (currentPage.value = newPage);

const handleKeyup = e => {
  if (e.key === 'ArrowRight' && currentPage.value < 5) {
    changePage(currentPage.value + 1);
  }
  if (e.key === 'ArrowLeft' && currentPage.value > 0) {
    changePage(currentPage.value - 1);
  }
};

// Watchers
watch([showPreloader, showPageLoader], () => {
  if (!showPreloader.value && !showPageLoader.value) {
    tl.restart();
  }
});

// Effects
useImageParallax(containerRef, { selector: '.infrastructure__parallax' });

onMounted(() => {
  document.addEventListener('keyup', handleKeyup);

  tl = gsap.timeline();
  // Animate title
  SplitText.create('.infrastructure__content:first-of-type h2', {
    type: 'words',
    mask: 'words',
    onSplit: self => {
      tl.from(self.words, {
        yPercent: 100,
        skewY: 20,
        opacity: 0,
        ease: 'power4.out',
        stagger: 0.15,
        duration: 1
      });
    }
  });

  // Animate text
  SplitText.create('.infrastructure__content:first-of-type p', {
    type: 'lines',
    mask: 'lines',
    onSplit: self => {
      tl.from(
        self.lines,
        {
          yPercent: 100,
          skewY: 20,
          opacity: 0,
          ease: 'power4.out',
          stagger: 0.15,
          duration: 1
        },
        '-=0.6'
      );
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyup);
  tl.kill();
});

useScrollPage(direction => {
  if (direction === 'next') {
    useLocaleNavigate('/contacts');
  } else {
    useLocaleNavigate('/housing');
  }
});

// Head meta
useMySEO('infrastructure');
</script>

<style lang="scss" scoped>
.infrastructure {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  overflow: hidden;
  padding-bottom: max(3.2rem, 16px);
  @media screen and (max-width: 900px) {
    padding-inline: var(--block-spacing);
  }
  &.hidden {
    picture > * {
      transform: translateY(50px);
      opacity: 0;
    }
  }
  picture {
    & > * {
      transition: all 0.5s;
    }
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        & > * {
          transition-delay: $i * 0.1s;
        }
      }
    }
  }
  &__picture {
    width: max(32rem, 160px);

    &:first-of-type {
      bottom: 19.1%;
      right: 3.2rem;
      @media screen and (max-width: 900px) {
        bottom: max(2.8rem, 28px);
        right: -10%;
      }
    }
    &:nth-of-type(2) {
      left: 16.2%;
      bottom: 6.3%;
      @media screen and (max-width: 900px) {
        left: -15%;
        bottom: max(9.2rem, 92px);
      }
    }
    &:nth-of-type(3) {
      width: max(22rem, 160px);
      right: 18%;
      top: 13.8%;
      @media screen and (max-width: 900px) {
        right: max(2rem, 20px);
        top: 22.4%;
      }
    }
  }
  &__picture,
  &__pattern {
    position: absolute;
  }
  &__box {
    top: 12.6%;
    left: 11.2%;
    position: absolute;
    display: grid;
    width: max(32.5rem, 142px);
    @media screen and (max-width: 900px) {
      top: 22.4%;
      left: max(1.6rem, 16px);
    }
    & > * {
      grid-area: 1/1/2/2;
      &:first-child {
        border-top-left-radius: 11rem;
      }
      &:last-child {
        width: 50%;
        align-self: flex-start;
        justify-self: flex-end;
        translate: 40% 20%;
      }
    }
  }
  &__pattern {
    z-index: -1;
    width: max(56.4%, 437px);
    left: 50%;
    transform: translate(-50%, 0);
    &:first-of-type {
      top: var(--header-height);
    }
    &:last-of-type {
      bottom: 1.9%;
      transform: translate(-50%, 0) rotate(180deg);
    }
  }
  &__content + div {
    z-index: 3;
    margin-bottom: max(3.2rem, 16px);
  }
  &__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: max(2.4rem, 24px);
    text-align: center;
    & > * {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    &.hidden {
      pointer-events: none;
      backdrop-filter: none;
      background-color: transparent;
      & > *:first-child {
        opacity: 0;
        transform: scale(1.15) translateY(-10px);
        filter: blur(4px);
      }

      & > *:last-child {
        opacity: 0;
        transform: scale(0.85) translateY(10px);
        filter: blur(4px);
      }
    }

    @media screen and (min-width: 768px) {
      max-width: max(53.3rem, 343px);
    }
    @media screen and (max-width: 900px) {
      transform: translateY(10vh);
      background-color: rgba(#fff, 0.3);
      backdrop-filter: blur(5px);
      border-radius: 12px;
    }
    &-box {
      margin-block: auto;
      z-index: 3;
      display: grid;
      & > * {
        grid-area: 1/1/2/2;
      }
    }
    &-text {
      font-size: max(1.8rem, 14px);
      color: rgba(vars.$darker-grey, 0.7);
    }
  }
}
</style>
