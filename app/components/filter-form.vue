<template>
  <form class="filter-form" @submit.prevent>
    <FilterRow
      v-model="floorNumber"
      :label="$t('floor')"
      :options="countdownArray(12).reverse()"
      :is-from-api="false"
    />
    <FilterHistogram v-model="area" />
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
    <FilterRow v-model="deadline" :label="$t('deadline')" :options="dates" :is-from-api="false" />
  </form>
</template>

<script setup>
defineEmits(['submit']);

const dates = computed(() => {
  const nextYear = new Date().getFullYear() + 1;
  return Array.from({ length: 3 }, (_, i) => nextYear + i);
});

const deadline = useState('deadline');
const floorNumber = useState('floorNumber');
const roomsCount = useState('roomsCount');
const area = useState('area');

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
    padding-block: 10px;
    padding-inline: 16px;
  }
  &__number {
    @include mix.flex-center;
    flex: 1;
    padding-block: max(0.8rem, 8px);
    border-radius: max(0.6rem, 6px);
    position: relative;
    margin-inline: 2.7rem;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
      &::after {
        display: none;
      }
    }
    &::after {
      content: '';
      position: absolute;
      background-color: #d6d7d7;
      width: 1px;
      height: 100%;
      right: -2.7rem;
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
