<template>
  <div class="preloader">
    <SvgPreloaderLogo class="preloader__logo" />
    <SvgRadialGradientBg />
  </div>
</template>

<script setup>
import gsap from 'gsap';

const animateLogo = () => {
  const paths = document.querySelectorAll('.preloader__logo path');
  const totalDuration = 10; // seconds

  let maxLength = 0;
  paths.forEach(path => {
    const length = path.getTotalLength();
    if (length > maxLength) maxLength = length;

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fill: 'transparent'
    });
  });

  const tl = gsap.timeline();

  // animate drawing
  paths.forEach(path => {
    const length = path.getTotalLength();

    tl.to(
      path,
      {
        strokeDashoffset: 0,
        duration: (length / maxLength) * totalDuration,
        ease: 'none'
      },
      0
    ); // all start at same time
  });

  setTimeout(() => {
    gsap.to(paths, {
      fill: '#fff',
      duration: 1,
      stagger: 0.008
    });
  }, 3000);
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
  }
}
</style>
