<template>
  <main class="architecture">
    <NuxtPicture src="/images/architecture-bg.jpg" alt="banner" class="architecture__banner" />
    <div class="architecture__content">
      <h2 class="heading-large">Просторные террасы для отдыха и встреч</h2>
      <p class="architecture__content-text">
        Наслаждайтесь панорамными видами и свежим воздухом на просторных террасах, расположенных
        прямо над коммерческими помещениями — идеальное место для отдыха, встреч и приятного
        времяпрепровождения
      </p>
    </div>
    <div class="architecture__bottom">
      <div class="architecture__nav">
        <button
          v-for="(name, i) in blockLinks"
          :key="i"
          class="architecture__nav-item"
          :class="{ active: currentBlock === i }"
          @click="changeBlock(i)"
        >
          {{ name }}
        </button>
      </div>
      <div class="architecture__arrows">
        <button
          class="architecture__arrow"
          :disabled="currentBlock === 0"
          @click="changeBlock(prevBlock)"
        >
          <SvgLongArrowRight />
        </button>
        <div class="architecture__page">
          <Transition name="fade">
            <span :key="currentBlock">{{ currentBlock + 1 }}</span>
          </Transition>
          /
          <span>{{ blockLinks.length }}</span>
        </div>
        <button
          class="architecture__arrow"
          :disabled="currentBlock === blockLinks.length - 1"
          @click="changeBlock(nextBlock)"
        >
          <SvgLongArrowRight />
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
const currentBlock = ref(0);

const prevBlock = computed(() => (currentBlock.value - 1 <= 0 ? 0 : currentBlock.value - 1));
const nextBlock = computed(() =>
  currentBlock.value + 1 >= blockLinks.length ? blockLinks.length - 1 : currentBlock.value + 1
);

const blockLinks = [
  'Террасы',
  'Панорамные окна',
  'Фасадная подсветка',
  'Велодорожки',
  'Зона отдыха',
  'Автостоянки'
];

const changeBlock = index => (currentBlock.value = index);
</script>

<style lang="scss" scoped>
.architecture {
  @include mix.block-padding;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: max(2.4rem, 16px);
  &__banner {
    z-index: -1;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    & > * {
      object-position: 34%;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: vars.$bp-ipad-pro) {
      justify-content: center;
    }
  }
  &__nav {
    display: flex;
    gap: max(2.4rem, 14px);
    padding-inline: 2.4rem;
    border-radius: 1.2rem;
    background-color: #fff;
    position: relative;
    @media screen and (max-width: vars.$bp-ipad-pro) {
      display: none;
    }

    &-item {
      font-weight: 500;
      color: vars.$darker-grey;
      position: relative;
      padding-block: 1.4rem;
      &.active::after {
        transform: translateX(-50%) scaleX(1);
      }
      &::after {
        content: '';
        position: absolute;
        bottom: max(0.1rem, 1px);
        left: 50%;
        transition: transform 0.5s;
        transform: translateX(-50%) scaleX(0);
        width: 122.2222%;
        height: 3px;
        background-color: vars.$teal;
        border-top-left-radius: 2.2rem;
        border-top-right-radius: 2.2rem;
      }
    }
  }
  &__content {
    min-width: max(343px, 34.3rem);
    margin-block: auto;
    display: flex;
    flex-direction: column;
    gap: max(2.4rem, 24px);
    color: #fff;
    @media screen and (min-width: vars.$bp-large-mobile) {
      max-width: 42%;
    }
    @media screen and (max-width: vars.$bp-large-mobile) {
      margin-top: auto;
      margin-bottom: max(6rem, 60px);
    }
    &-text {
      font-size: max(1.8rem, 14px);
    }
  }
  &__arrows {
    display: flex;
    align-items: center;
    gap: max(1.2rem, 12px);
    padding-block: max(1.3rem, 13px);
    padding-inline: max(1.2rem, 12px);
    border-radius: max(1.2rem, 12px);
    background-color: #fff;
  }
  &__page {
    min-width: 4.1rem;
    font-size: max(1.6rem, 16px);
    text-align: center;
  }
  &__arrow {
    width: max(2.4rem, 24px);
    display: flex;
    fill: vars.$lighter-black;
    &:first-of-type {
      transform: rotate(180deg);
    }
    &:disabled {
      fill: vars.$dark-grey-accent;
    }
  }
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    position: absolute;
  }
}
</style>
