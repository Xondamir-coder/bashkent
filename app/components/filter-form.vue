<template>
  <form class="filter-form" @submit.prevent>
    <FilterRow
      v-model="floorNumber"
      :label="$t('floor')"
      :options="countdownArray(13).reverse()"
      :is-from-api="false"
    />
    <FilterRow v-model="layoutType" :label="$t('layout-type')" :options="filters.types" />
    <FilterRow type="range" :label="$t('area')">
      <div class="filter-form__rangebox">
        <div class="filter-item">
          <input
            id="area-from"
            v-model="area.from"
            type="number"
            name="area"
            class="filter-form__input"
            :placeholder="$t('from')"
          />
          <span>{{ $t('m-squared') }}</span>
        </div>
        <div class="filter-item">
          <input
            id="area-to"
            v-model="area.to"
            type="number"
            name="area"
            class="filter-form__input"
            :placeholder="$t('to')"
          />
          <span>{{ $t('m-squared') }}</span>
        </div>
      </div>
    </FilterRow>
    <FilterRow type="numbers" :label="$t('number-of-rooms')">
      <div class="filter-form__numbers filter-item">
        <button
          v-for="number in 3"
          :key="number"
          type="button"
          class="filter-form__number"
          :class="{ active: number === roomsCount }"
          @click="changeNumber(number)"
        >
          {{ number }}
        </button>
      </div>
    </FilterRow>
    <FilterRow v-model="condition" :label="$t('type-of-housing')" :options="filters.conditions" />
    <FilterRow v-model="deadline" :label="$t('deadline')" :options="dates" :is-from-api="false" />
  </form>
</template>

<script setup>
const { filters } = useAppState();

defineEmits(['submit']);

const dates = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear + i);
});

const deadline = useState('deadline');
const floorNumber = useState('floorNumber');
const roomsCount = useState('roomsCount');
const area = useState('area');
const layoutType = useState('layoutType');
const condition = useState('condition');

const changeNumber = number => {
  roomsCount.value = number;
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
