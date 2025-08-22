<template>
  <div class="radial-gradient">
    <SvgEllipseBg class="radial-gradient__bg" />
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
  display: grid;
  overflow: hidden;
  & > * {
    grid-area: 1/1/2/2;
  }
  &__pattern {
    justify-self: center;
    width: 79%;
    min-width: 600px;
    @media screen and (max-width: 900px) {
      position: absolute;
      left: 50%;
      translate: -50%;
    }
    &:nth-of-type(2) {
      align-self: flex-start;
      @media screen and (max-width: 900px) {
        top: 0;
      }
    }
    &:last-of-type {
      align-self: flex-end;
      transform: rotate(180deg);
      @media screen and (max-width: 900px) {
        bottom: 0;
      }
    }
  }
}
</style>
