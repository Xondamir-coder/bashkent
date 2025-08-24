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

const animateLogo = () => {
  const duration = 2; // seconds
  const tl = gsap.timeline();

  tl.from('.preloader__logo-icon path', { duration: duration, drawSVG: 0, stagger: 0.08 });
  gsap.from('.preloader__logo-text path', { duration: duration * 15, drawSVG: 0, stagger: 0.08 });
  tl.to('.preloader__logo path', { fill: '#fff' });
};

if (import.meta.client) {
  animateLogo();
}
</script>

<style lang="scss" scoped>
$preloader-delay: 4.5s;
$preloader-duration: 0.5s;

@keyframes preloader-disappear {
  to {
    transform: scale(1.1);
    opacity: 0;
    visibility: hidden;
  }
}
@keyframes logo-disappear {
  to {
    transform: scale(0.85);
    opacity: 0;
  }
}

.preloader {
  z-index: 100;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: vars.$green-linear-gradient;
  animation: preloader-disappear $preloader-duration forwards $preloader-delay;

  @include mix.flex-center;
  &__logo {
    width: 38.5%;
    min-width: 222px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: max(4.2rem, 17px);
    align-items: center;
    animation: logo-disappear $preloader-duration forwards $preloader-delay;
    &-icon {
      width: 37.6%;
    }
  }
}
</style>
