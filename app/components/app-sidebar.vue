<template>
  <div class="sidebar">
    <NuxtLink :to="$localePath('/')" class="sidebar__logo">
      <SvgLogo />
    </NuxtLink>
    <SvgLogoMobile class="sidebar__logo--mobile" />
    <div class="sidebar__pattern-box">
      <SvgSidebarPattern class="sidebar__pattern" />
    </div>
    <SidebarHam :show-menu="showMenu" class="sidebar__ham--mobile" @click="emits('toggle-menu')" />
    <div class="sidebar__mobile">
      <NuxtLink :to="$localePath('/calculator')">
        <SvgCalculator class="sidebar__mobile-icon" />
      </NuxtLink>
      <div class="sidebar__dropdown" data-lang-dropdown>
        <button @click="showLangDropdown = !showLangDropdown">
          <SvgGlobe class="sidebar__mobile-icon" />
        </button>
        <LangDropdown v-model="showLangDropdown" />
      </div>
      <SidebarHam :show-menu="showMenu" @click="emits('toggle-menu')" />
    </div>
    <div class="sidebar__bottom">
      <span class="sidebar__bottom-text">{{ $t('calculator.label') }}</span>
      <NuxtLink :to="$localePath('/calculator')">
        <GlassButton>
          <SvgCalculator />
        </GlassButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showMenu: Boolean
});
const emits = defineEmits(['toggle-menu']);
const showLangDropdown = ref(false);
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
  &__ham--mobile {
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  &__dropdown {
    position: relative;
  }
  &__key {
    @include mix.flex-center;
  }
  &__mobile {
    display: flex;
    gap: max(2rem, 20px);
    &-icon {
      width: max(2.4rem, 24px);
      fill: #fff;
    }
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
    &-box {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }
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
    fill: vars.$teal;
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
