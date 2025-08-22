<template>
  <main class="infrastructure">
    <SvgFadingPattern class="infrastructure__pattern" />
    <SvgFadingPattern class="infrastructure__pattern" />
    <NuxtPicture class="infrastructure__picture" src="/images/picnic.jpg" alt="picnic" />
    <NuxtPicture class="infrastructure__picture" src="/images/hugging.jpg" alt="hugging" />
    <NuxtPicture class="infrastructure__picture" src="/images/camera.png" alt="cameras" />
    <div class="infrastructure__content">
      <h2 class="heading-large">Безопасность нового поколения</h2>
      <p class="infrastructure__content-text">
        Современные технологии, которые обеспечат защиту вашего дома и круглосуточный контроль за
        территорией, создавая максимальный комфорт и безопасность для жителей.
      </p>
    </div>
    <PageCounter v-model="currentPage" :pages="6" />
    <div class="infrastructure__box">
      <NuxtPicture class="infrastructure__box-picture" src="/images/street.jpg" alt="street" />
      <NuxtPicture class="infrastructure__box-picture" src="/images/tree.png" alt="tree" />
    </div>
  </main>
</template>

<script setup>
const currentPage = ref(0);
</script>

<style lang="scss" scoped>
.infrastructure {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  overflow: hidden;
  @media screen and (max-width: 900px) {
    padding-inline: var(--block-spacing);
  }
  &__picture {
    width: max(32rem, 160px);
    &:first-of-type {
      bottom: 19.1%;
      right: 3.2rem;
      @media screen and (max-width: 900px) {
        bottom: max(2.8rem, 28px);
        right: -10%;
      }
    }
    &:nth-of-type(2) {
      left: 16.2%;
      bottom: 6.3%;
      @media screen and (max-width: 900px) {
        left: -15%;
        bottom: max(9.2rem, 92px);
      }
    }
    &:nth-of-type(3) {
      width: max(22rem, 160px);
      right: 18%;
      top: 13.8%;
      @media screen and (max-width: 900px) {
        right: max(2rem, 20px);
        top: 22.4%;
      }
    }
  }
  &__picture,
  &__pattern {
    position: absolute;
  }
  &__box {
    top: 12.6%;
    left: 11.2%;
    position: absolute;
    display: grid;
    width: max(32.5rem, 142px);
    @media screen and (max-width: 900px) {
      top: 22.4%;
      left: max(1.6rem, 16px);
    }
    & > * {
      grid-area: 1/1/2/2;
      &:first-child {
        border-top-left-radius: 11rem;
      }
      &:last-child {
        width: 50%;
        align-self: flex-start;
        justify-self: flex-end;
        transform: translate(40%, 20%);
      }
    }
  }
  &__pattern {
    width: max(56.4%, 437px);
    left: 50%;
    transform: translate(-50%, 0);
    &:first-of-type {
      top: var(--header-height);
    }
    &:last-of-type {
      bottom: 1.9%;
      transform: translate(-50%, 0) rotate(180deg);
    }
  }
  &__content + div {
    z-index: 3;
    padding-bottom: max(3.2rem, 16px);
  }
  &__content {
    z-index: 3;
    margin-block: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: max(2.4rem, 24px);
    text-align: center;
    @media screen and (min-width: 768px) {
      max-width: max(53.3rem, 343px);
    }
    @media screen and (max-width: 900px) {
      transform: translateY(10vh);
      background-color: rgba(#fff, 0.3);
      backdrop-filter: blur(5px);
      border-radius: 12px;
    }
    &-text {
      font-size: max(1.8rem, 14px);
      color: rgba(vars.$darker-grey, 0.7);
    }
  }
}
</style>
