<template>
  <div class="filter-row">
    <span v-if="label !== ''" class="filter-row__label">{{ label }}</span>
    <div v-if="type === 'dropdown'" class="filter-row__box">
      <button
        type="button"
        class="filter-item"
        :class="{ active: showDropdown }"
        @click="showDropdown = !showDropdown"
      >
        <span>{{ isFromApi ? model?.[`name_${$i18n.locale}`] : model }}</span>
        <SvgKeyboardArrowLeft class="filter-row__arrow" />
      </button>
      <Transition name="slide">
        <div v-if="showDropdown" class="filter-row__dropdown">
          <button
            v-for="option in options"
            :key="option?.id"
            type="button"
            class="filter-row__option"
            :class="{ active: isFromApi ? option?.id === model?.id : option === model }"
            @click="selectOption(option)"
          >
            <span> {{ isFromApi ? option?.[`name_${$i18n.locale}`] : option }}</span>
            <SvgCheck class="filter-row__option-icon" />
          </button>
        </div>
      </Transition>
    </div>
    <slot />
  </div>
</template>

<script setup>
const showDropdown = ref(false);

const model = defineModel({
  type: [Object, Number]
});
defineProps({
  options: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  isFromApi: {
    type: Boolean,
    default: true
  },
  type: {
    default: 'dropdown',
    type: String
  }
});

const selectOption = opt => {
  model.value = opt;
  showDropdown.value = false;
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
