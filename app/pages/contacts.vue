<template>
  <main class="contacts">
    <div class="contacts__content">
      <h1 class="heading-large">{{ $t('contacts.title') }}</h1>
      <SvgBigPattern class="contacts__pattern" />
      <div class="contacts__list">
        <button
          v-for="marker in markers"
          :key="marker.id"
          class="contacts__button"
          :class="{ active: currentMarkers.includes(marker.id) }"
          @click="changeItem(marker.id)"
        >
          <div class="contacts__button-box">
            <component :is="marker.icon" class="contacts__button-icon" />
          </div>
          <span>{{ marker.name }}</span>
        </button>
      </div>
    </div>
    <ContactsMap v-model="currentMarkers" :markers :center />
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

const { tm, rt } = useI18n();

const currentMarkers = ref([0]);

const changeItem = index => {
  if (index !== 0 && currentMarkers.value.includes(0)) {
    currentMarkers.value.splice(0, 1);
  }
  if (currentMarkers.value.includes(index)) {
    currentMarkers.value = currentMarkers.value.filter(i => i !== index);
    return;
  }
  currentMarkers.value.push(index);
};

const center = [39.766295, 64.433676];
const data = computed(() => [
  {
    icon: SvgStraightHam,
    coords: [39.749189, 64.42201]
  },
  {
    icon: SvgCart,
    coords: [39.768567, 64.438233]
  },
  {
    icon: SvgBell,
    coords: [39.801709, 64.402136]
  },
  {
    icon: SvgTrees,
    coords: [39.753328, 64.354371]
  },
  {
    icon: SvgSchool,
    coords: [39.841044, 64.47802]
  },
  {
    icon: SvgTheatherMasks,
    coords: [39.704466, 64.435547]
  },
  {
    icon: SvgBuilding,
    coords: [39.745586, 64.611865]
  }
]);

const names = computed(() => tm('contacts.names'));
const markers = computed(() =>
  data.value.map((obj, i) => ({
    ...obj,
    id: i,
    name: rt(names.value[i])
  }))
);

useScrollPage(direction => {
  if (direction === 'prev') {
    useLocaleNavigate('/infrastructure');
  }
});
useHead({ title: 'Contacts' });
</script>

<style lang="scss" scoped>
.contacts {
  @include mix.block-padding;
  padding-top: calc(var(--header-height) + max(3.2rem, 30px));
  position: relative;
  overflow: hidden;
  display: flex;
  &__content {
    display: flex;
    flex-direction: column;
    gap: max(3.2rem, 20px);
  }
  &__pattern {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 6;
    width: 56%;
    transform: translate(-15%, 37%);
    z-index: 11;
    @media screen and (max-width: vars.$bp-large-mobile) {
      display: none;
    }
  }
  &__list {
    z-index: 12;
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
