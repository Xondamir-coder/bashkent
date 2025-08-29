<template>
  <div class="filter-row">
    <span v-if="label !== ''" class="filter-row__label">{{ label }}</span>
    <div v-if="type === 'dropdown'" class="filter-row__box">
      <div class="filter-item">
        <span>{{ fakeSelected }}</span>
        <SvgKeyboardArrowLeft class="filter-row__arrow" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
const model = defineModel({
  type: String
});

defineProps({
  type: {
    default: 'dropdown',
    type: String
  },
  label: {
    default: '',
    type: String
  },
  fakeSelected: {
    default: '',
    type: String
  }
});
</script>

<style lang="scss" scoped>
.filter-row {
  display: flex;
  flex-direction: column;
  gap: max(1.2rem, 10px);
  &__arrow {
    width: max(2.4rem, 24px);
    transform: rotate(-90deg);
  }
  &__label {
    font-weight: 500;
    align-self: flex-start;
  }
}
</style>
