<template>
  <div class="range-slider filter-item">
    <!-- Value Display -->
    <div class="range-slider__value">{{ model }}%</div>

    <!-- Slider -->
    <input
      v-model="index"
      type="range"
      :min="0"
      :max="steps.length - 1"
      step="1"
      class="range-slider__input"
      :style="{
        background: `linear-gradient(to right, #076962 0%, #076962 ${percentage}%, #f0f0f0 ${percentage}%, #f0f0f0 100%)`
      }"
    >

    <!-- Labels -->
    <div class="range-slider__labels">
      <span v-for="(step, i) in steps" :key="i" :class="{ active: i === index }">
        {{ step }}%
      </span>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({
  type: Number,
  default: 100
});

const props = defineProps({
  steps: {
    type: Array,
    default: () => [20, 30, 40, 50, 75, 100] // ascending order
  }
});

// Internal index (maps the slider position to the step value)
const index = computed({
  get: () => props.steps.indexOf(model.value),
  set: newIndex => {
    const clamped = Math.min(props.steps.length - 1, Math.max(0, newIndex));
    model.value = props.steps[clamped];
  }
});

// Compute gradient percentage based on current position
const percentage = computed(() => {
  return (index.value / (props.steps.length - 1)) * 100;
});
</script>

<style scoped lang="scss">
.range-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: max(2.3rem, 16px);

  &__value {
    font-size: max(2.8rem, 28px);
    font-weight: bold;
    font-family: vars.$font-angst;
  }

  &__input {
    width: 100%;
    height: 6px;
    border-radius: 9999px;
    outline: none;
    appearance: none;
    transition: background 0.25s ease;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: vars.$teal;
      cursor: pointer;
      margin-top: -5px;
      border: 1px solid #fff;
    }

    &::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 2px;
    }
  }

  &__labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: max(1.2rem, 12px);

    @media screen and (max-width: vars.$bp-small-mobile) {
      span {
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s;
        &.active {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
