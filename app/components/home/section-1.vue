<template>
  <div class="section-1">
    <NuxtPicture src="/images/block-1.png" alt="Home block banner" class="section-1__banner" />
    <SvgHomePattern class="section-1__pattern" />
    <div class="section-1__content">
      <p class="section-1__content-text">Новый этап архитектуры.</p>
      <h1 class="heading-extra-large">жизни Город Бухара</h1>
      <div class="section-1__content-bottom">
        <img
          src="~/assets/images/home-flower.jpg"
          alt="home flower"
          class="section-1__content-bottom-image"
        />
        <span>Новая философия городской </span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.section-1 {
  background: linear-gradient(180deg, #ffffff 15.8%, #f9e9d8 100%);
  display: flex;
  align-items: center;
  padding-left: var(--block-spacing-desktop);
  padding-right: var(--inline-spacing-desktop);

  &__pattern {
    position: absolute;
    z-index: 1;
    // width: 60.5%;
    height: calc(100% - 2.4%);
    right: 1.7%;
    top: 2.4%;
  }
  &__banner {
    position: absolute;
    inset: 0;
    left: -1%;
    width: calc(100% + 1%);
    height: 100%;
    z-index: 2;
    & > * {
      object-fit: cover;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    z-index: 3;
    h1 {
      max-width: 15ch;
    }
    &-text {
      font-size: 1.8rem;
      color: vars.$darker-grey;
    }
    &-bottom {
      margin-top: 0.8rem;
      display: flex;
      gap: 2.3rem;
      align-items: center;
      span {
        font-weight: 800;
        font-size: 2rem;
        color: vars.$lighter-black;
        font-family: vars.$font-gothic-a1;
        max-width: 20ch;
      }
      &-image {
        width: 6rem;
        height: 6rem;
      }
    }
  }
}
</style>
