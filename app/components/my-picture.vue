<template>
  <picture class="my-picture">
    <!-- 0–575 -->
    <source
      :srcset="`/images/576/${src.split('.')[0]}.avif`"
      type="image/avif"
      media="(max-width: 575px)"
    >

    <!-- 576–1023 -->
    <source
      :srcset="`/images/1024/${src.split('.')[0]}.avif`"
      type="image/avif"
      media="(min-width: 576px) and (max-width: 1023px)"
    >

    <!-- ≥1024 -->
    <source
      :srcset="`/images/1440/${src.split('.')[0]}.avif`"
      type="image/avif"
      media="(min-width: 1024px)"
    >

    <!-- Fallback original -->
    <img
      :src="`/images/original/${src}`"
      :alt="alt"
      :class="imageClass"
      class="my-picture__image"
    >
  </picture>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  imageClass: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.my-picture {
  display: flex;
  overflow: hidden;
}
</style>
