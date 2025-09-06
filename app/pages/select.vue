<template>
  <main class="select">
    <GlassButton class="select__glass" @click="$router.back()">
      <SvgClose class="fill-teal" />
    </GlassButton>
    <NuxtLink :to="$localePath('/advanced-search')" class="select__left">
      <NuxtPicture
        format="avif"
        sizes="(max-width: 640px) 640px, 1280px"
        src="/images/select-banner.jpg"
        alt="banner"
        class="select__banner"
      />
      <SvgRadialPattern class="select__pattern" />
      <div class="select__content">
        <div class="select__icon-box">
          <SvgFilter class="select__icon" />
        </div>
        <h2 class="heading-large">{{ $t('select.title-1') }}</h2>
        <p>{{ $t('select.text-1') }}</p>
      </div>
    </NuxtLink>
    <NuxtLink :to="$localePath('/masterplan')" class="select__right">
      <NuxtPicture
        format="avif"
        sizes="(max-width: 640px) 640px, 1280px"
        src="/images/select-banner.jpg"
        alt="banner"
        class="select__banner"
      />
      <SvgRadialPattern class="select__pattern" />
      <div class="select__content">
        <div class="select__icon-box">
          <SvgVisibility class="select__icon" />
        </div>
        <h2 class="heading-large">{{ $t('select.title-2') }}</h2>
        <p>{{ $t('select.text-2') }}</p>
      </div>
    </NuxtLink>
  </main>
</template>

<script setup>
useHead({
  title: 'Select'
});
</script>

<style lang="scss" scoped>
@mixin hide-banner {
  opacity: 0;
  transform: scale(1.05);
}
@mixin show-banner {
  opacity: 1;
  transform: translateX(0);
}
.select {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: #fff;
  overflow: hidden;
  @media screen and (max-width: vars.$bp-large-mobile) {
    grid-template-columns: 1fr;
  }
  &:has(.select__left:hover) {
    .select__left {
      .select__icon-box {
        fill: vars.$gold;
        &::before {
          opacity: 1;
        }
      }
      &::after,
      .select__banner {
        @include show-banner();
      }
    }
    .select__right {
      .select__icon-box {
        fill: #fff;
        &::before {
          opacity: 0.2;
        }
      }
      &::after,
      .select__banner {
        @include hide-banner();
      }
    }
  }
  &__left,
  &__right {
    background: linear-gradient(246.98deg, #0b726b 0%, #065650 94.35%);
    position: relative;
    overflow: hidden;
    @include mix.flex-center;
    &::after {
      z-index: 2;
      content: '';
      position: absolute;
      inset: 0;
      background: #00000052;
      opacity: 0;
      transition: opacity vars.$dt;
    }
  }
  &__content {
    z-index: 4;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: max(2.4rem, 16px);
    h2 {
      max-width: 15ch;
    }
  }
  &__glass {
    position: absolute !important;
    top: 3.2rem;
    right: var(--block-spacing);
    z-index: 10;
    @media screen and (max-width: 900px) {
      top: calc(var(--header-height) + max(20px, 2rem));
    }
  }
  &__icon {
    width: max(2.8rem, 24px);
    z-index: 1;
    &-box {
      width: max(5.6rem, 40px);
      height: max(5.6rem, 40px);
      border-radius: max(1.5rem, 10px);
      position: relative;
      fill: #fff;
      transition: fill vars.$dt;
      @include mix.flex-center;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        transform: rotate(45deg);
        border-radius: inherit;
        background-color: #fff;
        opacity: 0.2;
        transition: opacity vars.$dt;
      }
    }
  }
  &__banner {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    @include hide-banner();
    transition: opacity vars.$dt, transform vars.$dt;
  }
  &__left {
    @media screen and (min-width: 900px) {
      padding-left: var(--block-spacing);
    }
    @media screen and (max-width: vars.$bp-large-mobile) {
      padding-top: var(--header-height);
      overflow: hidden;
    }
    .select__pattern {
      top: 0;
      left: 50%;
      transform: translate(-47%, -20%);
      width: 120%;
      @media screen and (max-width: vars.$bp-large-mobile) {
        bottom: 0;
        top: auto;
        left: 50%;
        transform: translate(-50%, 25%) rotate(180deg);
      }
    }
  }
  &__right {
    .select__icon-box {
      fill: vars.$gold;
      &::before {
        opacity: 1;
      }
    }
    &::after,
    .select__banner {
      @include show-banner();
    }
    .select__pattern {
      bottom: 0;
      right: 0;
      transform: rotate(180deg) translateY(-15%);
      @media screen and (max-width: vars.$bp-large-mobile) {
        display: none;
      }
    }
  }
  &__pattern {
    z-index: 3;
    position: absolute;
    width: 100%;
    min-width: 571px;
  }
}
</style>
