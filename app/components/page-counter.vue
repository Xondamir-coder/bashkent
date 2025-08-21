<template>
  <div class="page-counter">
    <button class="page-counter__arrow" :disabled="model === 0" @click="changePage(prevPage)">
      <SvgLongArrowRight />
    </button>
    <div class="architecture__page">
      <Transition name="fade">
        <span :key="model">{{ model + 1 }}</span>
      </Transition>
      /
      <span>{{ pages }}</span>
    </div>
    <button
      class="page-counter__arrow"
      :disabled="model === pages - 1"
      @click="changePage(nextPage)"
    >
      <SvgLongArrowRight />
    </button>
  </div>
</template>

<script setup>
// eslint-disable-next-line vue/require-prop-types
const model = defineModel();
const props = defineProps({
  pages: {
    required: true,
    type: Number
  }
});

const prevPage = computed(() => (model.value - 1 <= 0 ? 0 : model.value - 1));
const nextPage = computed(() =>
  model.value + 1 >= props.pages ? props.pages - 1 : model.value + 1
);

const changePage = index => (model.value = index);
</script>

<style lang="scss" scoped>
.page-counter {
  display: flex;
  align-items: center;
  gap: max(1.2rem, 12px);
  padding-block: max(1.3rem, 13px);
  padding-inline: max(1.2rem, 12px);
  border-radius: max(1.2rem, 12px);
  background-color: #fff;
  border: 1px solid #f0f0f0;
  &__arrow {
    width: max(2.4rem, 24px);
    display: flex;
    fill: vars.$lighter-black;
    &:first-of-type {
      transform: rotate(180deg);
    }
    &:disabled {
      fill: vars.$dark-grey-accent;
    }
  }
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    position: absolute;
  }
}
</style>
