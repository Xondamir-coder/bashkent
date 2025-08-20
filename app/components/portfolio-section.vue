<template>
  <div class="portfolio-section">
    <SvgPattern class="pattern portfolio-section__pattern" />
    <div class="portfolio-section__content">
      <h2 class="heading-large">{{ title }}</h2>
      <p class="portfolio-section__content-text">
        {{ text }}
      </p>
    </div>
    <NuxtPicture :src="imgSrc" alt="section banner" class="portfolio-section__image" />
  </div>
</template>

<script setup>
defineProps({
  imgSrc: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  text: {
    required: true,
    type: String
  }
});
</script>

<style lang="scss" scoped>
.portfolio-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
  overflow: hidden;

  &:first-child {
    .portfolio-section__content {
      padding-left: calc(var(--block-spacing-desktop) - 6rem);
    }
    .portfolio-section__pattern {
      bottom: -44%;
      left: 5%;
      transform: rotate(40deg);
      @media screen and (max-width: 900px) {
        position: static;
        order: 3;
        // bottom: 0;
        margin-top: -10%;
        transform: rotate(40deg) translate(0, 50%);
        // left: 0%;
      }
    }
  }
  &:last-child {
    .portfolio-section__image {
      order: -1;
    }
    .portfolio-section__pattern {
      right: -32%;
      top: -25%;
      transform: rotate(-165deg);
      @media screen and (max-width: 900px) {
        right: -70%;
        top: 55%;
        transform: rotate(-150deg) translate(0, -50%);
      }
    }
  }
  @media screen and (max-width: 900px) {
    gap: max(3.2rem, 32px);
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    padding-block: max(1.6rem, 16px);
  }
  &__pattern {
    position: absolute;
    min-width: 340px;
    width: 56.4%;
  }
  &__content {
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-inline: 6rem;
    @media screen and (max-width: 900px) {
      align-self: flex-start;
      padding: 0;
      margin-inline: var(--inline-spacing-desktop);
    }
    &-text {
      max-width: 75%;
      min-width: 343px;
      color: vars.$darker-grey;
      opacity: 0.7;
      font-size: max(1.8rem, 14px);
    }
  }
  &__image {
    height: 100vh;
    @media screen and (max-width: 900px) {
      order: -1;
      max-height: 420px;
      aspect-ratio: 375/420;
    }
  }
}
</style>
