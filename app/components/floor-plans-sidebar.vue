<template>
  <div class="sidebar">
    <button class="sidebar__button" @click="toggleMobileFilter">
      <span>{{ $t('filters') }}</span>
      <SvgFilter class="sidebar__button-icon" />
    </button>
    <div class="sidebar__top">
      <span class="sidebar__label">{{ $t('filters') }}</span>
      <button class="sidebar__reset" @click="resetFilters">{{ $t('reset-filters') }}</button>
    </div>
    <FilterForm />
    <button class="sidebar__submit" @click="submitForm">{{ $t('apply-filter') }}</button>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="showMobileFilter" class="mobile-filter__overlay" @click.self="toggleMobileFilter">
        <div class="mobile-filter">
          <div class="mobile-filter__top">
            <h2 class="heading-large">
              {{ $t('filters') }}
            </h2>
            <SvgReplay class="mobile-filter__icon" @click="resetFilters" />
            <SvgClose class="mobile-filter__icon" @click="toggleMobileFilter" />
          </div>
          <FilterForm />
          <button class="sidebar__submit" @click="submitForm">{{ $t('apply-filter') }}</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const { filters } = useAppState();

const showMobileFilter = ref(false);

const layoutType = useState('layoutType', () => filters.value?.types[0]);
const condition = useState('condition', () => filters.value?.conditions[0]);
const selectedFloor = useState('selectedFloor', () => 1);
const selectedNumber = useState('selectedNumber', () => 1);
const area = useState('area', () => ({
  start: null,
  end: null
}));

const toggleMobileFilter = () => {
  showMobileFilter.value = !showMobileFilter.value;
  document.body.classList.toggle('no-scroll', showMobileFilter.value);
};
const submitForm = () => {};
const resetFilters = () => {
  selectedNumber.value = 1;
  layoutType.value = filters.value.types[0];
  condition.value = filters.value.conditions[0];
  area.value.start = null;
  area.value.end = null;
  selectedFloor.value = 1;
};
</script>

<style lang="scss" scoped>
@keyframes slide-from-bottom {
  from {
    transform: translateY(100%);
  }
}
.sidebar {
  align-self: flex-start;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  animation: slide-from-bottom-50 0.5s backwards 0.3s;
  @media screen and (min-width: 700px) {
    gap: max(2.4rem, 16px);
    background-color: vars.$near-white;
    padding-inline: max(2rem, 16px);
    padding-block: max(2.4rem, 20px);
    border-radius: max(2rem, 18px);
    min-width: 300px;
  }
  @media screen and (max-width: 700px) {
    & > *:not(.sidebar__button) {
      display: none;
    }
  }
  &__reset {
    color: vars.$darker-grey;
    &:hover {
      color: vars.$teal;
    }
  }
  &__button {
    padding-inline: max(2rem, 11.5px);
    padding-block: max(2.4rem, 16px);
    border-radius: max(2rem, 8px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: vars.$near-white;
    @media screen and (min-width: 700px) {
      display: none;
    }
    &:hover {
      background-color: vars.$light-grey;
    }
    &-icon {
      width: max(2.4rem, 24px);
    }
  }
  &__label {
    font-weight: bold;
    font-size: max(2rem, 14px);
  }
  &__submit {
    padding-block: max(1.7rem, 14px);
    background-color: vars.$teal;
    color: #fff;
    border-radius: max(1.2rem, 10px);
    &:hover {
      background-color: vars.$teal-dark;
    }
  }
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.mobile-filter {
  background-color: vars.$light-grey;
  width: 100%;
  padding: max(1.6rem, 16px);
  border-top-left-radius: max(1.6rem, 16px);
  border-top-right-radius: max(1.6rem, 16px);
  animation: slide-from-bottom 0.5s;
  display: flex;
  flex-direction: column;
  gap: max(2rem, 20px);
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  &__top {
    display: flex;
    gap: max(1.6rem, 16px);
  }
  &__icon {
    width: max(2.4rem, 24px);
    &:first-of-type {
      margin-left: auto;
    }
  }
  &__overlay {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 100;
    background-color: #000000cc;
    backdrop-filter: blur(10px);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>
