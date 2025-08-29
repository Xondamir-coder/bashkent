<template>
  <div class="page-nav">
    <button class="page-nav__arrow" @click="changePage(model - 1)">
      <SvgKeyboardArrowLeft class="page-nav__arrow-icon" />
    </button>
    <div class="page-nav__buttons">
      <button
        v-for="page in pages"
        :key="page"
        class="page-nav__button"
        :class="{ active: page === model }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
    <button class="page-nav__arrow" @click="changePage(model + 1)">
      <SvgKeyboardArrowLeft class="page-nav__arrow-icon" />
    </button>
  </div>
</template>

<script setup>
// eslint-disable-next-line vue/require-prop-types
const model = defineModel();

const changePage = newPage => {
  model.value = newPage;
};

defineProps({
  pages: {
    required: true,
    type: Array
  }
});
</script>

<style lang="scss" scoped>
.page-nav {
  display: flex;
  gap: max(1.2rem, 12px);
  align-self: center;
  &__buttons {
    display: flex;
    gap: max(0.8rem, 8px);
  }
  &__arrow,
  &__button {
    background-color: vars.$light-grey;
    border-radius: max(0.8rem, 8px);
    width: max(4.2rem, 42px);
    height: max(4.2rem, 42px);
    fill: vars.$black-medium;
    font-size: max(1.4rem, 14px);
    @include mix.flex-center;
    &:hover {
      background-color: vars.$gold;
      color: #fff;
      fill: #fff;
    }
  }
  &__button.active {
    background-color: vars.$teal;
    color: #fff;
  }
  &__arrow {
    &:last-child {
      transform: rotate(180deg);
    }
    &-icon {
      width: 50%;
    }
  }
  &__buttons {
    display: flex;
    align-items: center;
    gap: max(0.8rem, 8px);
  }
}
</style>
