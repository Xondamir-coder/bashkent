<template>
  <main ref="containerRef" class="housing">
    <div v-for="(box, i) in $tm('housing.boxes')" :key="i" class="housing__box">
      <div v-if="box.variant1">
        <div v-for="(line, j) in box.variant1" :key="j">
          {{ $rt(line) }}
        </div>
      </div>

      <div v-if="box.variant2">
        <div v-for="(line, j) in box.variant2" :key="j">
          {{ $rt(line) }}
        </div>
      </div>

      <div v-if="box.single">
        {{ $rt(box.single) }}
      </div>
    </div>

    <MyPicture
      v-for="(image, index) in images"
      :key="index"
      :src="image"
      alt="housing banner"
      class="housing__banner"
    />
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const images = ['housing-1.jpg', 'housing-2.jpg', 'housing-3.jpg', 'housing-4.jpg'].reverse();

const containerRef = ref();
const showPageLoader = useState('showPageLoader');

watch(showPageLoader, () => {
  if (showPageLoader.value) document.body.classList.add('no-scroll');
  else {
    setTimeout(() => {
      document.body.classList.remove('no-scroll');
    }, 1000);
  }
});

let tl;
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top top',
      end: `+=${window.innerHeight * 6} bottom`,
      // markers: true,
      scrub: true
    }
  });

  const firstBanner = containerRef.value.querySelector('.housing__banner:last-of-type');
  const secondBanner = containerRef.value.querySelector('.housing__banner:nth-of-type(3)');
  const thirdBanner = containerRef.value.querySelector('.housing__banner:nth-of-type(2)');

  tl.to(firstBanner, {
    scale: 2.04
  });
  tl.to(firstBanner, { opacity: 0 }, '-=0.4');
  tl.to(secondBanner, {
    opacity: 0,
    scale: 1.15
  });
  tl.to(thirdBanner, {
    opacity: 0,
    scale: 1.15
  });
});

onUnmounted(() => {
  if (tl) tl.kill();
});
useScrollPage(direction => {
  if (direction === 'next') {
    useLocaleNavigate('/infrastructure');
  } else {
    useLocaleNavigate('/formula');
  }
});
useMySEO('housing');
</script>

<style lang="scss" scoped>
.housing {
  position: relative;
  height: 600vh;
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 49%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    z-index: 2;
  }
  &__box {
    font-size: max(4.8rem, 28px);
    font-weight: bold;
    font-family: vars.$font-angst;
    z-index: 3;
    position: absolute;
    color: #fff;
    text-transform: uppercase;
    left: var(--block-padding-left);
    &:last-of-type {
      max-width: 19ch;
      @media screen and (max-width: vars.$bp-small-mobile) {
        max-width: 18ch;
      }
    }
    &:not(:last-of-type) {
      & > * {
        &:first-child {
          max-width: 19ch;
          & > *:nth-child(2) {
            padding-left: max(3rem, 30px);
          }
          & > *:nth-child(3) {
            padding-left: max(1.5rem, 15px);
          }
          @media screen and (max-width: vars.$bp-small-mobile) {
            display: none;
          }
        }
        &:last-child {
          & > *:nth-child(2) {
            padding-left: 20px;
          }
          & > *:nth-child(3) {
            padding-left: 40px;
          }
          @media screen and (min-width: vars.$bp-small-mobile) {
            display: none;
          }
        }
      }
    }

    // & > * {
    //   &:nth-child(2) {
    //     padding-left: max(3rem, 30px);
    //   }
    //   &:nth-child(3) {
    //     padding-left: max(1.5rem, 15px);
    //   }
    // }
    &:first-child {
      top: var(--block-padding-top);
    }
    &:nth-child(2) {
      top: calc(200vh + var(--block-padding-top));
    }
    &:nth-child(3) {
      top: calc(350vh + var(--block-padding-top));
    }
    &:nth-child(4) {
      top: calc(500vh + var(--block-padding-top));
    }
  }
  &__banner {
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    &:nth-child(5) {
      @media screen and (max-width: vars.$bp-large-mobile) {
        & > * {
          object-position: 10%;
        }
      }
    }
  }
}
</style>
