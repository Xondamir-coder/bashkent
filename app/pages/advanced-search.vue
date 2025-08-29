<template>
  <main class="floor-plans">
    <div class="floor-plans__top">
      <AppBreadcrumbs :crumbs="crumbs" />
      <h1 class="heading-large" id="floor-plans-title">Планировки</h1>
    </div>
    <div class="floor-plans__wrapper">
      <FloorPlansSidebar />
      <div class="floor-plans__container">
        <span class="floor-plans__label">Доступно 99 квартир</span>
        <div class="floor-plans__list">
          <FloorPlansItem v-for="(item, index) in items" :key="index" :data="item" />
        </div>
        <button class="floor-plans__button">
          <span>Смотреть ещё 87</span>
          <SvgKeyboardArrowLeft class="floor-plans__arrow" />
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { SplitText } from 'gsap/SplitText';
import imgSrc from '/images/apt-banner.png';
import gsap from 'gsap';

const crumbs = computed(() => [
  {
    name: 'Выбрать квартиру',
    path: '/select'
  },
  {
    name: 'Планировки',
    path: '/advanced-search'
  }
]);
const items = computed(() =>
  Array(6).fill({
    type: 'Студия',
    desc: '10к1 , 6 секц., 4 из 12 этаж',
    area: '25,79 м²',
    image: imgSrc,
    tags: [
      { text: 'Комфорт', color: '#076962' },
      { text: 'Отделка: Чистовая', color: '#EB8331' }
    ]
  })
);

onMounted(() => {
  SplitText.create('#floor-plans-title', {
    type: 'chars',
    mask: 'chars',
    onSplit: self => {
      gsap.from(self.chars, {
        yPercent: 100,
        xPercent: -100,
        stagger: 0.025,
        ease: 'power2.out'
      });
    }
  });
});

definePageMeta({
  layout: 'only-header'
});

useHead({
  title: 'Floor plans'
});
</script>

<style lang="scss" scoped>
.floor-plans {
  padding-top: calc(var(--header-height) + max(3.2rem, 21px));
  padding-inline: var(--block-spacing);
  padding-bottom: max(2rem, 20px);
  display: flex;
  flex-direction: column;
  gap: max(2.4rem, 20px);
  @media screen and (min-width: vars.$bp-small-mobile) {
    padding-bottom: 24px;
  }
  &__button {
    padding-block: max(1.4rem, 12px);
    gap: max(1rem, 10px);
    background-color: vars.$teal;
    fill: #fff;
    color: #fff;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: max(1.2rem, 8px);
    &:hover {
      background-color: vars.$teal-dark;
    }
  }
  &__arrow {
    width: max(2.4rem, 24px);
    transform: rotate(-90deg);
  }
  &__label {
    font-weight: bold;
    font-size: max(2rem, 14px);
  }
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 2.25fr;
    gap: max(2rem, 16px);
    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }
  &__container {
    animation: slide-from-bottom-50 0.5s backwards 0.4s;
    display: flex;
    flex-direction: column;
    gap: max(2.4rem, 16px);
    background-color: vars.$near-white;
    padding-inline: max(2rem, 11.5px);
    padding-block: max(2.4rem, 16px);
    border-radius: max(2rem, 8px);
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(max(25rem, 250px), 1fr));
    row-gap: max(2.4rem, 11px);
    column-gap: max(1.1rem, 11px);
  }
  &__top {
    display: flex;
    flex-direction: column;
    gap: max(1.6rem, 12px);
  }
}
</style>
