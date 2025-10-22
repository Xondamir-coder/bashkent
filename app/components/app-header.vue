<template>
  <header
    v-if="!$route.path.includes('/select')"
    class="header"
    :class="{
      'header--plan': isPlanHeader,
      'header--variant': isVariant,
      'header--black': ['about', 'architecture', 'housing'].includes(route.name.split('___')[0])
    }"
  >
    <div class="header__left">
      <button
        class="header__button"
        @click="isPlanHeader ? $router.back() : navigateTo($localePath('/select'))"
      >
        <SvgKeyboardArrowLeft class="header__button-icon" />
        <span>{{ isPlanHeader ? $t('back') : $t('select-apt') }}</span>
      </button>
      <button class="header__button">
        <SvgVideocam class="header__button-icon" />
        <span>{{ $t('live') }}</span>
      </button>
    </div>
    <button class="header__back" @click="$router.back()">
      <SvgKeyboardArrowLeft />
    </button>
    <NuxtLink :to="$localePath('/')" class="header__logo">
      <SvgHeaderLogo />
    </NuxtLink>
    <FloatingCall :clickable="true" class="header__call" />
    <div class="header__right">
      <a :href="`tel:${TEL_NUMBER}`" class="header__tel">
        <FloatingCall />
        <span>{{ TEL_NUMBER }}</span>
      </a>
      <div class="header__dropdown-box" data-lang-dropdown>
        <button
          class="header__select"
          :class="{ active: showLangDropdown }"
          @click="showLangDropdown = !showLangDropdown"
        >
          <span>{{ $i18n.localeProperties.value.name }}</span>
          <SvgChevronDown class="header__select-icon" />
        </button>
        <LangDropdown v-model="showLangDropdown" />
      </div>
      <button class="header__button header__button--gold" @click="showContactsModal = true">
        {{ $t('book-appointment') }}
      </button>
    </div>
  </header>
  <FloatingCall v-if="isFloatingCallExist" :clickable="true" class="header__floating" />
</template>

<script setup>
const route = useRoute();

const paths = ['about', 'portfolio', 'architecture', 'housing'];
const floatingCallPages = ['masterplan', 'buildings', 'floors', 'apartments'];

const showContactsModal = useState('showContactsModal');

const showLangDropdown = ref(false);

const isVariant = computed(() => paths.includes(route.path.slice(1)));
const isFloatingCallExist = computed(() => !floatingCallPages.some(p => route.path.includes(p)));

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
  pointer-events: none;
  @media print {
    display: none;
  }
  &--black {
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    .header__tel {
      color: #fff;
      & > *:first-child {
        background-color: #fff;
        fill: vars.$gold;
      }
    }
  }
  & > * {
    pointer-events: all;
  }
  &:not(.header--plan) {
    @media screen and (max-width: 900px) {
      display: none;
    }
    .header__call,
    .header__back,
    .header__logo {
      display: none;
    }
    .header__button:first-child svg {
      display: none;
    }
  }
  &--plan {
    position: absolute;
    padding-left: var(--block-spacing);
    padding-top: max(2rem, 16px);
    .header__floating {
      display: none;
    }
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
    fill: #fff;
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
    font-weight: 500;
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
    stroke: vars.$black-medium;
    border: 1px solid transparent;
    &.active {
      background-color: #f7f7f7;
      border-color: #d6d7d7;
      color: vars.$teal;
      stroke: vars.$teal;
      .header__select-icon {
        transform: rotate(180deg);
      }
    }
    &:hover {
      background-color: vars.$grey;
    }
    &-icon {
      fill: none;
      width: 2.4rem;
      transition: transform vars.$dt, stroke vars.$dt;
    }
  }
  &__dropdown-box {
    display: flex;
    position: relative;
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
