<template>
  <main class="advanced-search">
    <div class="advanced-search__top">
      <AppBreadcrumbs :crumbs />
      <h1 id="advanced-search-title" class="heading-large">{{ $t('layouts') }}</h1>
    </div>
    <div class="advanced-search__wrapper">
      <AdvancedSearchSidebar />
      <div class="advanced-search__container">
        <span v-if="!apartments" class="advanced-search__label">
          {{ $t('start-searching-apartments') }}
        </span>
        <span v-else-if="apartments?.length > 0" class="advanced-search__label">
          {{ $t('available-x-apartments', { count: apartments?.length }) }}
        </span>
        <span v-else class="advanced-search__label">
          {{ $t('no-apartments-found') }}
        </span>
        <div v-if="apartments?.length" class="advanced-search__list">
          <AdvancedSearchItem
            v-for="apartment in slicedApartments"
            :key="apartment?.id"
            :data="apartment"
            class="search-item"
          />
        </div>
        <button
          v-if="apartments?.length > MAX_ITEMS_COUNT && maxSlice < apartments.length"
          class="advanced-search__button"
          @click="maxSlice = apartments.length"
        >
          <span>{{ $t('see-more-x', { count: apartments.length - MAX_ITEMS_COUNT }) }}</span>
          <SvgKeyboardArrowLeft class="advanced-search__arrow" />
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';

const { t } = useI18n();
const { apartments } = useAppState();

const MAX_ITEMS_COUNT = 6;
const maxSlice = ref(MAX_ITEMS_COUNT);

const crumbs = computed(() => [
  {
    name: t('select-apt'),
    path: '/select'
  },
  {
    name: t('advanced-search'),
    path: '/advanced-search'
  }
]);
const slicedApartments = computed(() => apartments.value?.slice(0, maxSlice.value));

onMounted(() => {
  SplitText.create('#advanced-search-title', {
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

useMySEO('advanced-search');
</script>

<style lang="scss" scoped>
.advanced-search {
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
