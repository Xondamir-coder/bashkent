<template>
  <picture class="my-picture">
    <!-- Small -->
    <source
      :srcset="`/images/576/${src.split('.')[0]}.avif`"
      type="image/avif"
      media="(max-width: 576px)"
    >

    <!-- Medium -->
    <source
      :srcset="`/images/1024/${src.split('.')[0]}.avif`"
      type="image/avif"
      media="(max-width: 1024px)"
    >

    <!-- Large and above -->
    <source
      :srcset="`/images/1440/${src.split('.')[0]}.avif`"
      type="image/avif"
      media="(min-width: 1025px)"
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
