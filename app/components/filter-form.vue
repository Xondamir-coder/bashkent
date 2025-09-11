<template>
  <form class="filter-form" @submit.prevent="submitForm">
    <FilterRow
      v-model="selectedFloor"
      :label="$t('floor')"
      :options="floors"
      :is-from-api="false"
    />
    <FilterRow v-model="layoutType" :label="$t('layout-type')" :options="filters.types" />
    <FilterRow type="range" :label="$t('area')">
      <div class="filter-form__rangebox">
        <div class="filter-item">
          <input
            id="area-from"
            v-model="area.start"
            type="number"
            name="area"
            class="filter-form__input"
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
            class="filter-form__input"
            :placeholder="$t('to')"
          />
          <span>{{ $t('m') }}²</span>
        </div>
      </div>
    </FilterRow>
    <FilterRow type="numbers" :label="$t('number-of-rooms')">
      <div class="filter-form__numbers filter-item">
        <button
          v-for="number in 4"
          :key="number"
          class="filter-form__number"
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
</template>

<script setup>
const { filters } = useAppState();

const floors = Array.from({ length: 12 }, (_, i) => i + 1);

const selectedFloor = useState('selectedFloor');
const selectedNumber = useState('selectedNumber');
const area = useState('area');
const layoutType = useState('layoutType');
const condition = useState('condition');

const changeNumber = number => {
  selectedNumber.value = number;
};
</script>

<style lang="scss" scoped>
.filter-form {
  display: flex;
  flex-direction: column;
  gap: max(1.6rem, 12px);

  &__numbers {
    display: flex;
    gap: 1.5rem;
    padding-block: max(1rem, 8px);
  }
  &__divider {
    width: 1px;
    background-color: #d6d7d7;
    height: 100%;
  }
  &__number {
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
  &__rangebox {
    gap: max(1rem, 8px);
    display: flex;
    & > * {
      flex: 1;
    }
  }
  &__input {
    -moz-appearance: textfield; /* Firefox */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
  }
  &__row {
    display: flex;
    flex-direction: column;
    gap: max(1.2rem, 10px);
  }
  &__arrow {
    width: max(2.4rem, 24px);
    transform: rotate(-90deg);
  }
  &__label {
    align-self: flex-start;
  }
}
</style>
