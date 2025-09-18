<template>
  <div class="menu">
    <div class="menu__top">
      <h2 class="heading-large">Меню</h2>
      <nav class="menu__nav">
        <NuxtLink
          v-for="(link, index) in $tm('menu.nav')"
          :key="index"
          :to="$localePath($rt(link.path))"
          class="menu__link"
          active-class="active"
          @click="$emit('toggle-menu')"
        >
          {{ $rt(link.name) }}
        </NuxtLink>
      </nav>
    </div>
    <div class="menu__cta">
      <button class="menu__button">
        <SvgVideocam class="menu__button-icon" />
        <span>{{ $t('live') }}</span>
      </button>
      <NuxtLink :to="$localePath('/select')" class="menu__button">
        <span>{{ $t('select-apt') }}</span>
      </NuxtLink>
      <button class="menu__button" @click="showContactsModal = true">
        <span>{{ $t('book-appointment') }}</span>
      </button>
    </div>
    <div class="menu__bottom">
      <div class="menu__bottom-header">
        <h3 class="menu__subtitle">{{ $t('menu.office') }}</h3>
        <p>Office location</p>
        <p>{{ $t('menu.timing') }}</p>
      </div>

      <div class="menu__list">
        <a class="menu__item" href="https://maps.app.goo.gl/jJozY1KSuyT9hoWu8" target="_blank">
          <SvgPin class="menu__item-icon" />
          <span>{{ $t('address') }}:</span>
          <span class="menu__item-address">{{ $t('menu.address') }}</span>
        </a>
        <a class="menu__item" :href="`tel:${TEL_NUMBER}`">
          <SvgCallEnd class="menu__item-icon" />
          <span>{{ $t('phone') }}:</span>
          <span>{{ TEL_NUMBER }}</span>
        </a>
        <a class="menu__item" href="https://t.me/bashkent_residence">
          <SvgTelegram class="menu__item-icon" />
          <span>{{ $t('telegram') }}:</span>
          <span>@bashkent_residence</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['toggle-menu']);

const showContactsModal = useState('showContactsModal');
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  left: 0;
  top: 0;
  background: #012320cc;
  backdrop-filter: blur(10px);
  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  color: #fff;
  padding-block: 3.2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: max(3rem, 24px);
  min-width: max(45%, 375px);
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
  padding-left: var(--sidebar-width);
  padding-right: 4.3rem;
  z-index: 15;
  @media screen and (max-width: 900px) {
    padding-left: 0;
    padding-top: calc(var(--header-height) + max(2.2rem, 22px));
    padding-bottom: max(2rem, 20px);
  }
  @media screen and (max-width: vars.$bp-small-mobile) {
    min-width: 100%;
  }
  h2 {
    @media screen and (max-width: 900px) {
      font-size: max(2rem, 20px);
    }
  }
  h2,
  .menu__link,
  .menu__bottom {
    padding-left: max(3.2rem, 16px);
  }
  &__bottom {
    p {
      max-width: 30ch;
    }
  }
  &__cta {
    display: flex;
    flex-direction: column;
    gap: max(1.3rem, 13px);
    padding-left: max(1.6rem, 16px);
    @media screen and (min-width: 900px) {
      display: none;
    }
  }
  &__button {
    padding-block: max(1.2rem, 10px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: max(1rem, 10px);
    background-color: vars.$near-white;
    border-radius: max(0.8rem, 8px);
    color: vars.$black-medium;
    font-weight: 500;
    animation: slide-from-bottom-20 0.5s backwards;
    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 0.1s + 0.5s;
      }
    }
    &:last-child {
      background-color: vars.$gold;
      color: #fff;
    }
    &-icon {
      width: max(2.4rem, 24px);
    }
  }
  &__subtitle {
    font-family: vars.$font-angst;
    font-size: max(3.2rem, 20px);
  }
  &__top {
    display: flex;
    flex-direction: column;
    gap: max(2rem, 12px);
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    gap: max(3.2rem, 20px);
    &-header {
      display: flex;
      flex-direction: column;
      gap: max(2rem, 12px);
      font-size: max(1.6rem, 12px);
      & > * {
        animation: slide-from-bottom-20 0.5s backwards;
        @for $i from 1 through 3 {
          &:nth-child(#{$i}) {
            animation-delay: $i * 0.1s + 0.8s;
          }
        }
      }
    }
  }
  &__nav {
    display: flex;
    flex-direction: column;
  }
  &__item {
    display: flex;
    gap: max(1rem, 10px);
    align-items: center;
    padding-block: max(1.7rem, 10px);
    border-top: 1px solid #ffffff1f;
    animation: slide-from-bottom-20 0.5s backwards;
    &-address {
      max-width: 25ch;
      text-align: right;
      line-height: 1.6;
    }
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 0.1s + 0.9s;
      }
    }
    &:hover {
      background-color: #ffffff0e;
    }
    span {
      &:last-of-type {
        margin-left: auto;
      }
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
  }
  &__link {
    font-size: max(2rem, 14px);
    font-weight: 500;
    padding-block: max(1rem, 10px);
    position: relative;
    animation: slide-from-left-20 0.5s backwards;
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 0.1s;
      }
    }
    &::before {
      content: '';
      left: 0;
      top: 0;
      position: absolute;
      width: 2px;
      height: 100%;
      background-color: vars.$teal-light;
      transition: transform vars.$dt;
      transform: scaleY(0);
      transform-origin: bottom;
    }
    &:not(.active):hover {
      transform: translateX(10px);
    }
    &.active {
      background: linear-gradient(-90deg, rgba(39, 162, 154, 0) 0%, rgba(39, 162, 154, 0.2) 100%);
      &::before {
        transform: scaleY(1);
      }
    }
  }
  &__item {
    &-icon {
      width: max(2.4rem, 20px);
    }
  }
}
</style>
