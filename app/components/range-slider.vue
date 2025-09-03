<template>
  <div class="range-slider filter-item">
    <!-- Percentage Display -->
    <div class="range-slider__value">{{ model }}%</div>

    <!-- Slider -->
    <input
      v-model="model"
      type="range"
      min="10"
      max="100"
      step="1"
      class="range-slider__input"
      :style="{
        background: `linear-gradient(to right, #076962 0%, #076962 ${percentage}%, #f0f0f0 ${percentage}%, #f0f0f0 100%)`
      }"
    >

    <!-- Labels -->
    <div class="range-slider__labels">
      <span v-for="n in 10" :key="n" :class="{ active: n * 10 == Math.floor(model / 10) * 10 }">
        {{ n * 10 }}%
      </span>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({
  type: String
});

const min = 10;
const max = 100;

const percentage = computed(() => ((model.value - min) / (max - min)) * 100);
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
    // background: vars.$light-grey; /* light gray */
    outline: none;
    appearance: none;
    // overflow: hidden;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: vars.$teal;
      cursor: pointer;
      margin-top: -5px; /* center thumb */
      border: 1px solid #fff;
    }
    &::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 2px;
      // background: vars.$light-grey;
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
/* Firefox */
// &::-moz-range-thumb {
//   height: 16px;
//   width: 16px;
//   border-radius: 50%;
//   background: vars.$teal;
//   cursor: pointer;
//   border: 2px solid #fff;
// }

// &::-moz-range-track {
//   height: 6px;
//   border-radius: 2px;
//   background: vars.$light-grey;
// }
</style>
