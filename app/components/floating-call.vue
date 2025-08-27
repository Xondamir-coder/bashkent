<template>
  <div v-if="!clickable" class="floating-call">
    <SvgCall class="floating-call__icon" />
  </div>
  <a v-else href="tel:+998 78 148 55 55" class="floating-call">
    <SvgCall class="floating-call__icon" />
  </a>
</template>

<script setup>
defineProps({
  clickable: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped lang="scss">
.floating-call {
  background-color: vars.$gold;
  width: max(3.8rem, 38px);
  height: max(3.8rem, 38px);
  border-radius: 50%;
  transition-property: background-color, transform;
  transition-duration: vars.$dt;
  @include mix.flex-center;
  @media screen and (max-width: 900px) {
    width: max(3.8rem, 48px);
    height: max(3.8rem, 48px);
  }
  &__icon {
    fill: #fff;
    width: 50%;
  }
}
</style>
