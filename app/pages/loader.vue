<template>
  <div class="loader">
    <NuxtPicture src="/images/pattern-bg-green.png" alt="loader" class="loader__image" />
    <div class="loader__content">
      <h2 class="heading-large">Надёжность, проверенная временем</h2>
      <div class="loader__texts">
        <p>
          Застройщик — <b>DUNE GROUP</b> С 2019 года <b>DUNE GROUP</b> реализует амбициозные
          строительные проекты в Узбекистане, совмещая техническую экспертизу и чувство
          архитектурного такта.
        </p>
        <p>
          Компания делает ставку на устойчивое развитие, безопасность, технологичность и
          архитектурную выразительность.
        </p>
      </div>
      <div class="loader__bar" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});
</script>

<style lang="scss" scoped>
@keyframes animate-bar {
  from {
    transform: scaleX(0);
  }
}
.loader {
  @include mix.flex-center;
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  background: vars.$green-linear-gradient;

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  &__content {
    color: #fff;
    z-index: 2;
    max-width: 47.9%;
    min-width: 343px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: max(3.7rem, 20px);
  }
  &__bar {
    height: 6px;
    width: 60%;
    min-width: 240px;
    border-radius: 1.5rem;
    background-color: #ffffff33;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: inherit;
      z-index: 1;
      transform-origin: left;
      animation: animate-bar 4s forwards ease-in-out;
    }
  }
  &__texts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: max(1.2rem, 12px);
    p:first-child {
      max-width: 43ch;
    }
    p:last-child {
      max-width: 58ch;
    }
  }
}
</style>
