<template>
  <div class="sidebar">
    <button class="sidebar__key">
      <SvgKey />
    </button>
    <button class="sidebar__logo" @click="$router.push('/')">
      <SvgLogo />
    </button>
    <SvgLogoMobile class="sidebar__logo--mobile" />
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
      <GlassButton>
        <SvgCalculator />
      </GlassButton>
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
  padding-block: max(2rem, 16px);
  padding-inline: max(1.6rem, 16px);
  background-color: vars.$teal;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  @media screen and (min-width: 900px) {
    flex-direction: column;
    min-height: 100%;
    width: var(--sidebar-width);
    border-top-right-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
    border-right: 1px solid vars.$teal-light;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    border-bottom-left-radius: max(0.8rem, 8px);
    border-bottom-right-radius: max(0.8rem, 8px);
    border-bottom: 1px solid vars.$teal-light;
  }
  &__key {
    @include mix.flex-center;
    @media screen and (min-width: 900px) {
      display: none;
    }
  }
  &__logo {
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  &__pattern {
    position: absolute;
    pointer-events: none;
    @media screen and (min-width: 900px) {
      width: 500%;
      top: 50%;
      left: 100%;
      transform: translate(0, -50%) rotate(-90deg);
    }
    @media screen and (max-width: 900px) {
      left: 50%;
      transform: translateX(-50%);
      width: 91%;
    }
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: max(calc(1.8rem * 3.5), 80px);
    @media screen and (max-width: 900px) {
      display: none;
    }
    &-text {
      font-size: max(1.4rem, 14px);
      line-height: 135%;
      color: vars.$teal-very-light;
      transform: rotate(-90deg);
    }
  }
  &__ham {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: max(1.2rem, 8px);
    padding: max(1.2rem, 5px);
    @media screen and (max-width: 900px) {
      flex-direction: row;
      .sidebar__ham-box {
        order: 1;
      }
    }
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
      @media screen and (max-width: 900px) {
        display: none;
      }
    }
    &-box {
      display: grid;
    }
    &-icon {
      grid-area: 1/1/2/2;
      width: max(2.4rem, 24px);
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
    &:not(.sidebar__logo--mobile) {
      @media screen and (max-width: 900px) {
        display: none;
      }
    }
    &--mobile {
      width: max(11rem, 110px);
      @media screen and (min-width: 900px) {
        display: none;
      }
    }
  }
}
</style>
