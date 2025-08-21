<template>
  <main class="formula">
    <h2 class="heading-large">Цифры говорят сами за себя:</h2>
    <SvgFadingPattern class="formula__pattern" />
    <ul class="formula__list">
      <li v-for="(item, i) in items" :key="i" class="formula__item">
        <h3 class="formula__item-title">
          {{ item.amount }}
        </h3>
        <p class="formula__item-text">
          {{ item.text }}
        </p>
        <NuxtPicture :src="item.image" :alt="item.text" class="formula__item-image" />
      </li>
    </ul>
  </main>
</template>

<script setup>
import imgSrc from '/images/formula-1.jpg';

const items = [
  {
    image: imgSrc,
    amount: '38',
    text: 'Жилых зданий'
  },
  {
    image: imgSrc,
    amount: '2928',
    text: 'Квартир'
  },
  {
    image: imgSrc,
    amount: '17 890,2 м²',
    text: 'Зелёная зона'
  },
  {
    image: imgSrc,
    amount: '5 451,2 м²',
    text: 'Детские и спортивные площадки'
  },
  {
    image: imgSrc,
    amount: '2',
    text: 'Школа и детский сад'
  },
  {
    image: imgSrc,
    amount: '1',
    text: 'Оздоровительный комплекс'
  },
  {
    image: imgSrc,
    amount: '1',
    text: 'Коммерческие здания'
  },
  {
    image: imgSrc,
    amount: '1 660',
    text: 'Парковочных мест'
  },
  {
    image: imgSrc,
    amount: '1',
    text: 'Коммерческие здания'
  },
  {
    image: imgSrc,
    amount: '4',
    text: 'Подстанции'
  }
];
</script>

<style lang="scss" scoped>
.formula {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5rem;
  position: relative;
  flex: 1;
  overflow: hidden;
  @include mix.block-padding;
  @media screen and (max-width: 900px) {
    gap: 180px;
  }
  h2 {
    @media screen and (min-width: 500px) {
      max-width: 15ch;
    }
  }
  &__pattern {
    z-index: -1;
    width: 64%;
    min-width: 450px;
    position: absolute;
    right: 2.3rem;
    top: 7%;
    @media screen and (max-width: 500px) {
      left: 50%;
      right: auto;
      top: var(--block-padding-top);
      transform: translateX(-50%);
    }
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(max(20rem, 166px), 1fr));
    column-gap: max(1.5rem, 11px);
    row-gap: max(2rem, 11px);
  }
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    aspect-ratio: 232/224;
    border-radius: max(1.2rem, 12px);
    background-color: vars.$light-grey;
    padding: max(1.7rem, 12px);
    position: relative;
    overflow: hidden;
    transition: color vars.$dt;
    &:hover {
      color: #fff;
      .formula__item-text {
        color: #fff;
      }
      .formula__item-image {
        opacity: 1;
        transform: scale(1.1);
        &::after {
          opacity: 1;
        }
      }
    }
    &-title {
      z-index: 2;
      font-family: vars.$font-angst;
      font-weight: bold;
      font-size: max(3.2rem, 24px);
      line-height: 145%;
    }
    &-text {
      z-index: 2;
      font-size: max(1.4rem, 12px);
      color: vars.$darker-grey;
    }
    &-image {
      opacity: 0;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      &::after {
        opacity: 0;
        transition: opacity vars.$dt;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        background: #00000080;
      }
    }
  }
}
</style>
