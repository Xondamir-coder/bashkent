<template>
  <div class="result calculator-box">
    <h2 class="result__title">{{ $t('calculator.results') }}</h2>
    <ul class="result__list">
      <li v-for="(result, i) in results" :key="i" class="result__item">
        <div class="result__item-icon-container">
          <component :is="result.icon" class="result__item-icon" />
        </div>
        <div class="result__item-content">
          <span class="result__item-key">{{ result.key }}</span>
          <span class="result__item-price">{{ formatNumbers(result.val) }} {{ $t('sum') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  results: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.result {
  margin-top: max(4.4rem, 20px);
  &__title {
    align-self: center;
    font-weight: 6 00;
    font-size: max(2.4rem, 14px);
    line-height: 145%;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    align-items: flex-start;
    gap: max(1.6rem, 16px);
  }
  &__item {
    background-color: #fff;
    padding: max(2rem, 14px);
    border-radius: max(1.6rem, 10px);
    display: flex;
    flex-direction: column;
    gap: max(1.6rem, 5px);
    &-content {
      display: flex;
      flex-direction: column;
      gap: max(0.8rem, 6px);
      align-items: center;
    }
    &-key {
      color: #7f8d88;
    }
    &-icon {
      width: max(2.4rem, 20px);
      height: max(2.4rem, 20px);
      &-container {
        @include mix.flex-center;
        background-color: rgba(0, 76, 71, 0.1);
        width: max(4.8rem, 40px);
        height: max(4.8rem, 40px);
        border-radius: 50%;
      }
    }
    &-price {
      font-family: vars.$font-gothic-a1;
      font-weight: 800;
      font-size: max(2.4rem, 20px);
      line-height: 145%;
    }
  }
}
</style>
