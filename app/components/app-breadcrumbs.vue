<template>
  <nav class="breadcrumbs">
    <NuxtLink
      v-for="(crumb, index) in crumbs"
      :key="index"
      :to="crumb.path"
      class="breadcrumbs__link"
    >
      <span>{{ crumb.name }}</span>
      <SvgKeyboardArrowLeft v-if="index !== crumbs.length - 1" class="breadcrumbs__link-icon" />
    </NuxtLink>
  </nav>
</template>

<script setup>
defineProps({
  crumbs: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  gap: max(1rem, 10px);
  &__link {
    font-weight: 500;
    font-size: max(1.4rem, 14px);
    color: vars.$black-medium;
    display: flex;
    align-items: center;
    gap: inherit;
    &:first-child {
      color: vars.$darker-grey;
    }
    &:hover {
      color: vars.$gold;
    }
    &-icon {
      width: max(2rem, 20px);
      transform: rotate(180deg);
    }
  }
}
</style>
