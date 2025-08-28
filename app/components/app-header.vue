<template>
  <header class="header" :class="{ 'header--plan': isPlanHeader, 'header--variant': isVariant }">
    <div class="header__left">
      <NuxtLink to="/select" class="header__button">
        <SvgKeyboardArrowLeft v-if="isPlanHeader" class="header__button-icon" />
        <span>{{ isPlanHeader ? 'Вернуться' : 'Выбрать квартиру' }}</span>
      </NuxtLink>
      <button class="header__button">
        <SvgVideocam class="header__button-icon" />
        <span>Онлайн-трансляция</span>
      </button>
    </div>
    <button v-if="isPlanHeader" class="header__back" @click="$router.back()">
      <SvgKeyboardArrowLeft />
    </button>
    <SvgHeaderLogo v-if="isPlanHeader" class="header__logo" />
    <FloatingCall v-if="isPlanHeader" :clickable="true" class="header__call" />
    <div class="header__right">
      <a href="tel:+998 78 148 55 55" class="header__tel">
        <FloatingCall />
        <span>(78) 148-55-55</span>
      </a>
      <div class="header__dropdown">
        <button class="header__select">
          <span>Рус</span>
          <SvgChevronDown class="header__select-icon" />
        </button>
      </div>
      <button class="header__button header__button--gold" @click="emits('toggle-modal')">
        Записаться на встречу
      </button>
    </div>
  </header>
  <FloatingCall v-if="!isPlanHeader" :clickable="true" class="header__floating" />
</template>

<script setup>
const emits = defineEmits(['toggle-modal']);

const paths = ['about', 'portfolio', 'architecture', 'housing'];

const route = useRoute();
const isVariant = computed(() => paths.includes(route.path.slice(1)));

defineProps({
  isPlanHeader: {
    default: false,
    type: Boolean
  }
});
</script>

<style lang="scss" scoped>
.header {
  padding-top: max(var(--block-padding-top));
  padding-left: var(--block-padding-left);
  padding-right: var(--block-spacing);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  font-size: max(1.4rem, 11px);
  z-index: 10;
  &:not(.header--plan) {
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  &--plan {
    position: absolute;
    padding-left: var(--block-spacing);
    padding-top: max(2rem, 16px);
    @media screen and (max-width: 900px) {
      .header__right,
      .header__left {
        display: none;
      }
    }
  }
  &--variant {
    .header__tel {
      color: #fff;
      fill: vars.$gold;
      div {
        background-color: #fff;
      }
    }
  }
  &__floating {
    fill: #fff;
    position: fixed;
    z-index: 15;
    right: max(16px, 1.6rem);
    bottom: max(16px, 1.6rem);
    @media screen and (min-width: 900px) {
      display: none;
    }
  }
  &__call {
    width: max(4.2rem, 42px);
    height: max(4.2rem, 42px);
    @media screen and (min-width: 900px) {
      display: none;
    }
  }
  &__back {
    width: max(4.2rem, 42px);
    height: max(4.2rem, 42px);
    border-radius: max(0.8rem, 8px);
    background-color: vars.$light-grey;
    @include mix.flex-center;
    @media screen and (min-width: 900px) {
      display: none;
    }
    svg {
      width: 50%;
    }
    &:hover {
      background-color: vars.$grey;
    }
  }
  &__button {
    @include mix.flex-center;
    padding-block: max(1.15rem, 8px);
    padding-inline: max(2.1rem, 17px);
    font-weight: 500;
    border-radius: max(0.8rem, 5px);
    background-color: vars.$light-grey;

    &:hover {
      background-color: vars.$grey;
    }
    &--gold {
      background-color: vars.$gold;
      color: vars.$default-white;
      &:hover {
        background-color: vars.$gold-dark;
      }
    }
    &:has(svg) {
      gap: 1rem;
    }
    &-icon {
      width: 2.4rem;
    }
  }
  &__tel {
    display: flex;
    align-items: center;
    gap: 1rem;
    fill: #fff;
    &:hover {
      color: vars.$gold;
    }
    // &:hover .header__tel-box {
    //   background-color: vars.$gold-dark;
    //   transform: scale(1.15);
    // }
  }
  &__select {
    border-radius: 0.8rem;
    background-color: vars.$light-grey;
    padding-inline: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    &:hover {
      background-color: vars.$grey;
    }
    &-icon {
      fill: none;
      width: 2.4rem;
    }
  }
  &__dropdown {
    display: flex;
  }
  &__logo {
    width: max(18.3rem, 117px);
    @media screen and (min-width: 1000px) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &__right {
    display: flex;
    gap: 2rem;
  }
  &__left {
    display: flex;
    gap: 1.6rem;
  }
}
</style>
