<template>
  <div class="preloader">
    <div class="preloader__logo">
      <SvgPreloaderLogoIcon class="preloader__logo-icon" />
      <SvgPreloaderLogoText class="preloader__logo-text" />
    </div>
    <SvgRadialGradientBg />
  </div>
</template>

<script setup>
import gsap from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

const emits = defineEmits(['hide-preloader']);
defineProps({
  showPreloader: Boolean
});

const animateLogo = () => {
  const duration = 2; // seconds

  gsap.set('.preloader__logo', { opacity: 1 });

  const tl = gsap.timeline({
    onComplete: () => {
      emits('hide-preloader');
    }
  });
  tl.from('.preloader__logo-icon path', { duration: duration, drawSVG: 0, stagger: 0.08 });
  gsap.from('.preloader__logo-text path', { duration: duration * 15, drawSVG: 0, stagger: 0.08 });
  tl.to('.preloader__logo path', { fill: '#fff' });
};

if (import.meta.client) {
  animateLogo();
}
</script>

<style lang="scss" scoped>
.preloader {
  z-index: 100;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: vars.$green-linear-gradient;

  @include mix.flex-center;
  &__logo {
    width: 38.5%;
    min-width: 222px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: max(4.2rem, 17px);
    align-items: center;
    opacity: 0;
    &-icon {
      width: 37.6%;
    }
  }
}
</style>
