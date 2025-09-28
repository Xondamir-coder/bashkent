<template>
  <section class="portfolio-section">
    <SvgPattern class="pattern portfolio-section__pattern" />
    <div class="portfolio-section__content">
      <h2 ref="titleRef" class="heading-large">{{ title }}</h2>
      <p ref="textRef" class="portfolio-section__content-text">
        {{ text }}
      </p>
    </div>
    <MyPicture :src="imgSrc" alt="section banner" class="portfolio-section__image" />
  </section>
</template>

<script setup>
import { SplitText } from 'gsap/SplitText';

const titleRef = ref();
const textRef = ref();
const wordsSplit = ref([]);
const linesSplit = ref([]);

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
defineExpose({
  titleRef,
  textRef,
  wordsSplit,
  linesSplit
});

onMounted(() => {
  wordsSplit.value = SplitText.create(titleRef.value, {
    type: 'words',
    mask: 'words'
  });
  linesSplit.value = SplitText.create(textRef.value, {
    type: 'lines',
    mask: 'lines'
  });
});
</script>

<style lang="scss" scoped>
.portfolio-section {
  display: grid;
  position: relative;
  overflow: hidden;
  grid-template-columns: 1.12fr 1fr;
  transition: opacity 0.5s;

  &:first-child {
    &:not(.active) {
      .portfolio-section__content {
        transform: translateY(15%);
      }
      .portfolio-section__image {
        transform: translateY(-15%);
      }
    }
  }
  &:nth-child(2) {
    &:not(.active) {
      .portfolio-section__content {
        transform: translateY(100%);
      }
      .portfolio-section__image {
        transform: translateY(-10%);
        clip-path: inset(0 0 100% 0);
      }
    }
  }
  &:nth-child(2) .portfolio-section__content {
    background-color: #fff;
  }
  &:first-child {
    .portfolio-section__content {
      padding-left: var(--block-padding-left);
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
  &:nth-child(2) {
    z-index: 5;
    .portfolio-section__content {
      padding-inline: var(--block-spacing);
    }
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
  & > * {
    transition: all 1.3s;
  }
  &__pattern {
    z-index: 5;
    position: absolute;
    min-width: 340px;
    width: 56.4%;
  }
  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 2.4rem;
    @media screen and (max-width: 900px) {
      align-self: flex-start;
    }
    &-text {
      max-width: 38ch;
      min-width: 343px;
      color: vars.$darker-grey;
      opacity: 0.7;
      font-size: max(1.8rem, 14px);
    }
  }
  &__image {
    height: 100dvh;
    clip-path: inset(0 0 0 0);

    @media screen and (max-width: 900px) {
      height: auto;
      order: -1;
      aspect-ratio: 375/420;
    }
  }
}
</style>
