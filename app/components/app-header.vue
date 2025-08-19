<template>
  <header class="header">
    <div class="header__left">
      <button class="header__button header__button--grey">Выбрать квартиру</button>
      <button class="header__button header__button--grey">
        <SvgVideocam class="header__button-icon" />
        <span>Онлайн-трансляция</span>
      </button>
    </div>
    <div class="header__right">
      <a href="tel:+998 78 148 55 55" class="header__tel">
        <div class="header__tel-box">
          <SvgCall class="header__tel-icon" />
        </div>
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
</template>

<script setup>
const emits = defineEmits(['toggle-modal']);
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: calc(100% - 11.11111% - 4.2%);
  top: 2.222222%;
  left: 11.11111%;
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  z-index: 10;

  &__button {
    padding-block: 1.15rem;
    padding-inline: 2.1rem;
    font-weight: 500;
    border-radius: 0.8rem;
    &--grey {
      background-color: vars.$light-grey;
      &:hover {
        background-color: vars.$grey;
      }
    }
    &--gold {
      background-color: vars.$gold;
      color: vars.$default-white;
      &:hover {
        background-color: vars.$gold-dark;
      }
    }
    &:has(svg) {
      display: flex;
      align-items: center;
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
    color: vars.$black-medium;
    // &:hover .header__tel-box {
    //   background-color: vars.$gold-dark;
    //   transform: scale(1.15);
    // }
    &-box {
      background-color: vars.$gold;
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 50%;
      transition-property: background-color, transform;
      transition-duration: vars.$dt;
      @include mix.flex-center;
    }
    &-icon {
      width: 1.8rem;
    }
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
      width: 2.4rem;
    }
  }
  &__dropdown {
    display: flex;
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
