<template>
  <div class="sidebar">
    <button class="sidebar__button">
      <span>{{ $t('filters') }}</span>
      <SvgFilter class="sidebar__button-icon" />
    </button>
    <div class="sidebar__top">
      <span class="sidebar__label">{{ $t('filters') }}</span>
      <button @click="resetFilters">{{ $t('reset-filters') }}</button>
    </div>
    <form class="sidebar__form" @submit.prevent="submitForm">
      <FilterRow
        v-model="selectedFloor"
        :label="$t('floor')"
        :options="floors"
        :is-from-api="false"
      />
      <FilterRow v-model="layoutType" :label="$t('layout-type')" :options="filters.types" />
      <FilterRow type="range" :label="$t('area')">
        <div class="sidebar__form-rangebox">
          <div class="filter-item">
            <input
              id="area-from"
              v-model="area.start"
              type="number"
              name="area"
              class="sidebar__form-input"
              :placeholder="$t('from')"
            />
            <span>{{ $t('m') }}²</span>
          </div>
          <div class="filter-item">
            <input
              id="area-to"
              v-model="area.end"
              type="number"
              name="area"
              class="sidebar__form-input"
              :placeholder="$t('to')"
            />
            <span>{{ $t('m') }}²</span>
          </div>
        </div>
      </FilterRow>
      <FilterRow type="numbers" :label="$t('number-of-rooms')">
        <div class="sidebar__form-numbers filter-item">
          <button
            v-for="number in 4"
            :key="number"
            class="sidebar__form-number"
            :class="{ active: number === selectedNumber }"
            @click="changeNumber(number)"
          >
            {{ number }}
          </button>
        </div>
      </FilterRow>
      <FilterRow v-model="condition" :label="$t('type-of-housing')" :options="filters.conditions" />
      <FilterRow :label="$t('deadline')" />
    </form>
    <button class="sidebar__submit" @click="submitForm">{{ $t('apply-filter') }}</button>
  </div>
</template>

<script setup>
const floors = Array.from({ length: 12 }, (_, i) => i + 1);

const selectedNumber = ref(1);
const selectedFloor = ref();
const layoutType = ref();
const condition = ref();
const area = ref({
  start: null,
  end: null
});

const { filters } = useAppState();

const submitForm = () => {
  console.log(selectedNumber.value);
};
const changeNumber = number => {
  selectedNumber.value = number;
};
const resetFilters = () => {
  selectedNumber.value = 1;
  layoutType.value = filters.value.types[0];
  condition.value = filters.value.conditions[0];
  area.value.start = null;
  area.value.end = null;
};
</script>

<style lang="scss" scoped>
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
    button {
      color: vars.$darker-grey;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: max(1.6rem, 12px);

    &-numbers {
      display: flex;
      gap: 1.5rem;
      padding-block: max(1rem, 8px);
    }
    &-divider {
      width: 1px;
      background-color: #d6d7d7;
      height: 100%;
    }
    &-number {
      flex: 1;
      padding-block: max(0.8rem, 8px);
      border-radius: max(0.6rem, 6px);
      position: relative;
      @include mix.flex-center;
      &:not(:last-child) {
        margin-right: 1.5rem;
        &::after {
          content: '';
          width: 1px;
          height: 100%;
          background-color: #d6d7d7;
          right: -1.5rem;
          top: 0;
          position: absolute;
        }
      }
      &.active {
        background-color: vars.$teal;
        color: #fff;
      }
    }
    &-rangebox {
      gap: max(1rem, 8px);
      display: flex;
      & > * {
        flex: 1;
      }
    }
    &-input {
      -moz-appearance: textfield; /* Firefox */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
      }
    }
    &-row {
      display: flex;
      flex-direction: column;
      gap: max(1.2rem, 10px);
    }
    &-arrow {
      width: max(2.4rem, 24px);
      transform: rotate(-90deg);
    }
    &-label {
      align-self: flex-start;
    }
  }
}
</style>
