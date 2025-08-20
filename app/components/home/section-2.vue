<template>
  <div class="section-2">
    <NuxtPicture src="/images/home-bg.png" alt="home banner" class="section-2__pattern" />
    <div class="section-2__wrapper">
      <div class="section-2__header">
        <h2 class="heading-large">
          Что такое <br />
          Bashkent Residence?
        </h2>
        <div class="section-2__header-content">
          <p>
            <b>Bashkent Residence</b> - это не просто жилой комплекс. Это - среда жизни, в которой
            объединены современные стандарты архитектуры, продуманная инфраструктура, эстетика
            городского комфорта и стремление к гармонии с окружающей средой.
          </p>
          <p>
            Вдохновлённый успешным одноимённым проектом в Ташкенте, новый Bashkent Residence в
            Бухаре вобрал в себя всё лучшее от столичного масштаба, адаптированное к уникальному
            историческому и культурному контексту древнего города.
          </p>
        </div>
      </div>
      <div class="section-2__container">
        <NuxtPicture src="/images/video-banner.png" alt="video banner" class="section-2__banner" />
        <button class="section-2__play">
          <SvgVideoPlayText />
        </button>
        <div class="section-2__box">
          <p>
            Здесь пространство перестаёт быть просто квадратными метрами - оно становится
            продолжением вашей личности, отражением вашего вкуса и заботы о будущем.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.section-2 {
  background: linear-gradient(246.98deg, #0b726b 0%, #065650 94.35%);
  display: flex;

  &__wrapper {
    padding-top: 12rem;
    flex: 1;
    color: #fff;
    display: flex;
    gap: 7.7rem;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 3.2rem;
    z-index: 2;
    padding-left: vars.$block-spacing-desktop;
    padding-right: vars.$inline-spacing-desktop;
  }
  &__play {
    width: 12.3rem;
    place-self: center;
  }
  &__container {
    position: relative;
    display: grid;
    & > * {
      grid-area: 1/1/2/2;
    }
  }
  &__box {
    margin-bottom: 2.4rem;
    z-index: 2;
    place-self: flex-end;
    max-width: 37ch;
    padding-block: 1.9rem;
    background-color: vars.$gold;
    text-align: center;
    font-weight: 700;
  }
  &__banner {
    transform: scale(1.1);
  }
  &__header {
    display: flex;
    gap: 11.2rem;

    &-content {
      display: flex;
      flex-direction: column;
      & > *:first-of-type {
        padding-bottom: 1.6rem;
      }
      & > *:last-of-type {
        padding-top: 1.6rem;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          top: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            #ffffff 50%,
            rgba(255, 255, 255, 0) 100%
          );
        }
      }
    }
    & > * {
      flex: 1;
    }
  }
  &__pattern {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    img {
      object-fit: cover;
    }
  }
}
</style>
