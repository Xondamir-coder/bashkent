<template>
  <main class="home">
    <SvgBigPattern class="home__pattern" />
    <NuxtPicture src="/images/home/wave.png" alt="wave" class="home__image" />
    <NuxtPicture src="/images/home/building-small.png" alt="small building" class="home__image" />
    <NuxtPicture src="/images/home/tree.png" alt="tree" class="home__image" />
    <NuxtPicture src="/images/home/building-big.png" alt="big building" class="home__image" />
    <NuxtPicture src="/images/home/rotated-tree.png" alt="rotated tree" class="home__image" />
    <div class="home__content">
      <p class="home__content-text">Новый этап архитектуры.</p>
      <h1 class="heading-extra-large">жизни Город Бухара</h1>
      <div class="home__content-bottom">
        <img
          src="~/assets/images/home-flower.jpg"
          alt="home flower"
          class="home__content-bottom-image"
        />
        <span>Новая философия городской </span>
      </div>
    </div>
  </main>
</template>

<script setup>
const router = useRouter();

useScrollPage(direction => {
  if (direction === 'next') {
    router.push('/about');
  }
});

useHead({
  title: 'Home'
});
</script>

<style lang="scss" scoped>
.home {
  @include mix.block-padding;
  background: linear-gradient(180deg, #ffffff 15.8%, #f9e9d8 100%);
  display: flex;
  position: relative;
  overflow: hidden;
  &__pattern {
    position: absolute;
    z-index: 1;
    width: 56.3%;
    right: 1.7%;
    top: 2.4%;
    @media screen and (max-width: vars.$bp-large-mobile) {
      min-width: 65vh;
      left: 50%;
      top: 60%;
      right: auto;
      transform: translate(-50%, -50%);
    }
  }
  &__image {
    position: absolute;
    z-index: 1;
    bottom: 0;
    &:first-of-type {
      right: 0;
      width: 100%;
      min-width: 132vh;
      @media screen and (max-width: vars.$bp-large-mobile) {
        transform: translate(12%, 10%);
      }
    }
    &:nth-of-type(2) {
      left: 18%;
      width: 32%;
      @media screen and (max-width: vars.$bp-large-mobile) {
        display: none;
      }
    }
    &:nth-of-type(3) {
      left: 0;
      width: 32.5%;
      min-width: 226px;
      z-index: 2;
    }
    &:nth-of-type(4) {
      right: 0;
      width: 51%;
      min-width: 60vh;
      @media screen and (max-width: vars.$bp-large-mobile) {
        transform: translateX(30%);
      }
    }
    &:last-of-type {
      top: 0;
      bottom: auto;
      right: 0;
      width: 21%;
      min-width: 125px;
    }
  }
  &__content {
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    gap: max(1.2rem, 8px);
    z-index: 3;
    h1 {
      max-width: 15ch;
    }
    &-text {
      font-size: max(1.8rem, 12px);
      color: vars.$darker-grey;
    }
    &-bottom {
      margin-top: max(0.8rem, 4px);
      display: flex;
      gap: max(2.3rem, 12px);
      align-items: center;
      span {
        font-weight: 800;
        font-size: max(2rem, 12px);
        color: vars.$lighter-black;
        font-family: vars.$font-gothic-a1;
        max-width: 20ch;
      }
      &-image {
        width: max(6rem, 32px);
        height: max(6rem, 32px);
      }
    }
  }
}
</style>
