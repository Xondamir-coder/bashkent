<template>
  <div class="radial-gradient">
    <svg
      class="radial-gradient__bg"
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.7" filter="url(#filter0_f_176_262)">
        <circle class="radial-gradient__circle" cx="250" cy="991" r="633" fill="#033F3A" />
      </g>
      <g opacity="0.7" filter="url(#filter1_f_176_262)">
        <path
          class="radial-gradient__circle"
          d="M1643 -52C1643 297.596 1760.6 372 1411 372C1061.4 372 377 297.596 377 -52C377 -401.596 660.404 -685 1010 -685C1359.6 -685 1643 -401.596 1643 -52Z"
          fill="#13AA9E"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_176_262"
          x="-783"
          y="-42"
          width="2066"
          height="2066"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_176_262" />
        </filter>
        <filter
          id="filter1_f_176_262"
          x="-23"
          y="-1085"
          width="2085.02"
          height="1857"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_176_262" />
        </filter>
      </defs>
    </svg>
    <SvgRadialPattern class="radial-gradient__pattern" />
    <SvgRadialPattern class="radial-gradient__pattern" />
  </div>
</template>

<style lang="scss" scoped>
.radial-gradient {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  overflow: hidden;
  &.yellow {
    .radial-gradient__circle:first-child {
      fill: #8d6702;
    }
    .radial-gradient__circle:nth-child(2) {
      fill: #ffd97a;
    }
  }
  &__pattern {
    width: min(79%, 100dvh);
    min-width: 600px;
    position: absolute;
    left: 50%;
    &:nth-of-type(2) {
      top: 0;
      transform: translateX(-50%);
      @media screen and (max-width: vars.$bp-large-mobile) {
        transform: translate(-50%, -30%);
      }
    }
    &:last-of-type {
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
  }
}
</style>
