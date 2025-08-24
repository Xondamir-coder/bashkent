<template>
  <div class="radial-gradient">
    <SvgEllipseBg class="radial-gradient__bg" />
    <SvgRadialPattern class="radial-gradient__pattern" />
    <SvgRadialPattern class="radial-gradient__pattern" />
  </div>
</template>

<style lang="scss" scoped>
$scale-factor: 1.1;
$y-factor: 10%;
$balance-factor: 5%;
$duration: 3s;

@keyframes scale-fade-in {
  from {
    opacity: 0;
    scale: $scale-factor;
  }
}
@keyframes scale-fade-in-from-top {
  from {
    opacity: 0;
    scale: $scale-factor;
    translate: $balance-factor -#{$y-factor};
  }
}
@keyframes scale-fade-in-from-bottom {
  from {
    opacity: 0;
    scale: $scale-factor;
    translate: $balance-factor $y-factor;
  }
}
.radial-gradient {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  overflow: hidden;

  // & > * {
  //   animation: scale-fade-in 2s backwards;
  //   @for $i from 1 through 3 {
  //     &:nth-child(#{$i}) {
  //       animation-delay: $i * 0.5s;
  //     }
  //   }
  // }
  &__pattern {
    width: min(79%, 100dvh);
    min-width: 600px;
    position: absolute;
    left: 50%;
    &:nth-of-type(2) {
      animation: scale-fade-in-from-top $duration backwards;
      top: 0;
      transform: translateX(-50%);
      @media screen and (max-width: vars.$bp-large-mobile) {
        transform: translate(-50%, -30%);
      }
    }
    &:last-of-type {
      animation: scale-fade-in-from-bottom $duration backwards;
      bottom: 0;
      transform: translateX(-50%) rotate(180deg);
      @media screen and (max-width: vars.$bp-large-mobile) {
        transform: translate(-50%, 30%) rotate(180deg);
      }
    }
  }
  &__bg {
    height: 100%;
    min-width: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    animation: scale-fade-in $duration backwards;
  }
}
</style>
