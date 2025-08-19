<template>
  <div class="sidebar">
    <SvgLogo class="sidebar__logo" />
    <button class="sidebar__ham" :class="{ active: showMenu }" @click="emits('toggle-menu')">
      <div class="sidebar__ham-box">
        <SvgHam class="sidebar__ham-icon" />
        <SvgClose class="sidebar__ham-icon" />
      </div>
      <span class="sidebar__ham-text">Меню</span>
    </button>
    <SvgSidebarPattern class="sidebar__pattern" />
    <div class="sidebar__bottom">
      <span class="sidebar__bottom-text"> Калькулятор </span>
      <div class="sidebar__bottom-box">
        <SvgCalculator class="sidebar__bottom-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showMenu: Boolean
});
const emits = defineEmits(['toggle-menu']);
</script>

<style lang="scss" scoped>
.sidebar {
  z-index: 20;
  width: 7%;
  padding-block: 2rem;
  padding-inline: 1.6rem;
  background-color: vars.$teal;
  border-right: 1px solid vars.$teal-light;
  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  &__pattern {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(1.8rem * 3.5);

    &-box {
      background-color: #fff;
      width: 4.2rem;
      height: 4.2rem;
      border-radius: 0.8rem;
      position: relative;
      @include mix.flex-center;
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: inherit;
        border: 0.6px solid #ffffff;
      }
      &::after {
        background: radial-gradient(
          50% 50% at 50% 50%,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.3) 100%
        );
        width: 129%;
        height: 129%;
        opacity: 0.6;
      }
      &::before {
        background: radial-gradient(
          50% 50% at 50% 50%,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.3) 100%
        );
        width: 157%;
        height: 157%;
        opacity: 0.1;
      }
    }
    &-icon {
      width: 2.4rem;
    }
    &-text {
      font-size: 1.4rem;
      line-height: 135%;
      color: vars.$teal-very-light;
      transform: rotate(-90deg);
    }
  }
  &__ham {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    padding: 1.2rem;
    &.active .sidebar__ham-icon {
      &:first-child {
        opacity: 0;
        transform: scale(0);
      }
      &:last-child {
        opacity: 1;
        transform: scale(1);
      }
    }
    &-text {
      color: #fff;
      font-weight: 500;
      line-height: 135%;
    }
    &-box {
      display: grid;
    }
    &-icon {
      grid-area: 1/1/2/2;
      width: 2.4rem;
      transition-property: transform, opacity;
      transition-duration: vars.$dt;
      fill: #fff;

      &:last-child {
        opacity: 0;
        transform: scale(0);
      }
    }
  }
  &__logo {
    width: 100%;
  }
}
</style>
