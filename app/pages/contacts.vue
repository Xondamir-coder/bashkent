<template>
  <main class="contacts">
    <h1 class="heading-large">Рядом с вами</h1>
    <SvgBigPattern class="contacts__pattern" />
    <div class="contacts__list">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="contacts__button"
        :class="{ active: index === currentItem }"
        @click="changeItem(index)"
      >
        <div class="contacts__button-box">
          <component :is="item.icon" class="contacts__button-icon" />
        </div>
        <span>{{ item.name }}</span>
      </button>
    </div>
  </main>
</template>

<script setup>
import {
  SvgBell,
  SvgBuilding,
  SvgCart,
  SvgSchool,
  SvgStraightHam,
  SvgTheatherMasks,
  SvgTrees
} from '#components';

const router = useRouter();

const currentItem = ref(0);

const changeItem = index => {
  currentItem.value = index;
};

const items = computed(() => [
  {
    name: 'Весь список',
    icon: SvgStraightHam
  },
  {
    name: 'ТРК И МАГАЗИНЫ',
    icon: SvgCart
  },
  {
    name: 'ГИМНАЗИИ И ШКОЛЫ',
    icon: SvgBell
  },
  {
    name: 'ПАРКИ И СКВЕРЫ ',
    icon: SvgTrees
  },
  {
    name: 'ВУЗЫ ',
    icon: SvgSchool
  },
  {
    name: 'ТЕАТРЫ ',
    icon: SvgTheatherMasks
  },
  {
    name: 'Культурные объекты и отдых',
    icon: SvgBuilding
  }
]);

useScrollPage(direction => {
  if (direction === 'prev') {
    router.push('/infrastructure');
  }
});
useHead({ title: 'Contacts' });
</script>

<style lang="scss" scoped>
.contacts {
  @include mix.block-padding;
  padding-top: calc(var(--header-height) + max(3.2rem, 30px));
  display: flex;
  flex-direction: column;
  gap: max(3.2rem, 20px);
  position: relative;
  &__pattern {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    width: 56%;
    transform: translate(-15%, 37%);
    @media screen and (max-width: vars.$bp-large-mobile) {
      display: none;
    }
  }
  &__list {
    align-self: flex-start;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: max(3.2rem, 20px);
    @media screen and (max-width: vars.$bp-large-mobile) {
      display: grid;
      align-self: stretch;
      max-width: calc(100vw - (var(--block-spacing) * 2));
      grid-template-columns: repeat(3, minmax(250px, 1fr));
      overflow-x: auto;
      scrollbar-width: 0;
      scroll-snap-type: x mandatory;
      & > * {
        scroll-snap-align: start;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &__button {
    display: flex;
    align-items: center;
    gap: max(1.6rem, 12px);
    font-weight: bold;
    font-size: max(1.8rem, 14px);
    fill: none;
    text-align: left;
    stroke: vars.$black-medium;
    &:hover {
      transform: translateX(10px);
    }
    &.active {
      stroke: #fff;
      color: vars.$gold;
      .contacts__button-box {
        background-color: vars.$gold;
      }
    }
    &-icon {
      width: max(2.4rem, 20px);
    }
    &-box {
      width: max(5.6rem, 38px);
      height: max(5.6rem, 38px);
      border-radius: 50%;
      background-color: vars.$near-white;
      transition: background-color vars.$dt;
      @include mix.flex-center;
    }
  }
}
</style>
