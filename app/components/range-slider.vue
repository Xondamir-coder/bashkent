<template>
  <div class="range-slider filter-item">
    <!-- Percentage Display -->
    <div class="range-slider__value">{{ model }}%</div>

    <!-- Slider -->
    <input v-model="model" type="range" min="10" max="100" step="1" class="range-slider__input" >

    <!-- Labels -->
    <div class="range-slider__labels">
      <span v-for="n in 10" :key="n">{{ n * 10 }}%</span>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({
  type: String
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
    background: vars.$light-grey; /* light gray */
    outline: none;
    overflow: hidden;
    appearance: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: vars.$teal; /* teal */
      cursor: pointer;
      margin-top: -5px; /* center thumb */
      border: 1px solid #fff;
      box-shadow: -500px 0 0 490px vars.$teal;
    }
    &::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 2px;
      background: vars.$light-grey;
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
  }
  &__labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: max(1.2rem, 12px);
  }
}
</style>
