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
.filter-row {
  display: flex;
  flex-direction: column;
  gap: max(1.2rem, 10px);
  position: relative;
  &__option {
    display: flex;
    padding: max(1.6rem, 14px);
    font-size: max(1.6rem, 14px);
    align-items: center;
    justify-content: space-between;
    &-icon {
      display: none;
      width: max(2rem, 20px);
    }
    &:hover {
      background-color: vars.$light-grey;
    }
    &.active {
      background-color: vars.$light-grey;
      color: vars.$teal;
      .filter-row__option-icon {
        display: block;
      }
    }
  }
  &__box {
    display: flex;
    & > * {
      flex: 1;
      border: 1px solid transparent;
      &.active {
        color: vars.$teal;
        fill: vars.$teal;
        border-color: #d6d7d7;

        .filter-row__arrow {
          transform: rotate(90deg);
        }
      }
    }
  }
  &__dropdown {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    width: 100%;
    z-index: 5;
    background-color: vars.$near-white;
    display: flex;
    flex-direction: column;
    border-radius: max(1.2rem, 10px);
    box-shadow: 0px 2px 50px 0px #00000033;
    max-height: 300px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__arrow {
    width: max(2.4rem, 24px);
    transform: rotate(-90deg);
    transition: transform vars.$dt;
  }
  &__label {
    font-weight: 500;
    align-self: flex-start;
  }
}
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
