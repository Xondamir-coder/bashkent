<template>
  <nav class="breadcrumbs">
    <div v-for="(crumb, index) in crumbs" :key="index" class="breadcrumbs__link">
      <NuxtLink :to="$localePath(crumb.path)">{{ crumb.name }}</NuxtLink>
      <SvgKeyboardArrowLeft v-if="index !== crumbs.length - 1" class="breadcrumbs__link-icon" />
    </div>
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
  flex-wrap: wrap;
  gap: max(1rem, 10px);
  &__link {
    text-wrap: nowrap;
    font-weight: 500;
    font-size: max(1.4rem, 14px);
    color: vars.$black-medium;
    display: flex;
    align-items: center;
    gap: inherit;
    animation: slide-from-left-20 0.5s backwards;
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: ($i - 1) * 0.1s;
      }
    }
    &:last-child {
      pointer-events: none;
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
