<template>
  <div class="filter-row">
    <div class="filter-row__box">
      <button
        type="button"
        class="filter-item calculator__item"
        :class="{ active: showDropdown }"
        @click="showDropdown = !showDropdown"
      >
        <div class="calculator__row">
          <img :src="`${DOMAIN_URL}/${model?.image}`" alt="" class="calculator__row-image" />
          <span>
            {{ `${model?.rooms_number} ${$t('rooms')}. ${model?.area} ${$t('m-squared')}` }}
          </span>
        </div>
        <SvgKeyboardArrowLeft class="filter-row__arrow" />
      </button>
    </div>
    <div class="filter-row__dropdown calculator__dropdown" :class="{ active: showDropdown }">
      <button
        v-for="option in apartments"
        :key="option?.id"
        type="button"
        class="filter-row__option calculator__option"
        :class="{ active: option?.id == model?.id }"
        @click="selectOption(option)"
      >
        <div class="calculator__row">
          <img :src="`${DOMAIN_URL}/${option?.image}`" alt="" class="calculator__row-image" />
          <span>{{
            `${option?.rooms_number} ${$t('rooms')}. ${option?.area} ${$t('m-squared')}`
          }}</span>
        </div>
        <SvgCheck class="filter-row__option-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  apartments: {
    required: true,
    type: Array
  }
});
const model = defineModel({
  type: Object
});

const showDropdown = ref(false);
const selectOption = opt => {
  model.value = opt;
  showDropdown.value = false;
};
</script>

<style scoped lang="scss">
.calculator {
  &__dropdown {
    transition: opacity 0.5s, transform 0.5s;
    &:not(.active) {
      opacity: 0;
      transform: translateY(20px);
      pointer-events: none;
    }
  }
  &__option,
  &__item {
    padding-block: 10px;
  }
  &__row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    font-size: max(1.6rem, 14px);
    text-transform: lowercase;
    &-image {
      width: max(4.2rem, 38px);
    }
  }
}
</style>
