<template>
  <NuxtLink :to="$localePath('/apartment')" class="item">
    <div class="item__top">
      <span class="item__label">
        {{ data.type }}
      </span>
      <p class="item__desc">
        {{ data.desc }}
      </p>
    </div>
    <img :src="data.image" class="item__image" />
    <span class="item__area">
      {{ data.area }}
    </span>
    <div class="item__divider" />
    <div class="item__tags">
      <span
        v-for="(tag, tagIndex) in data.tags"
        :key="tagIndex"
        class="item__tag"
        :style="{ backgroundColor: tag.color }"
      >
        {{ tag.text }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  data: {
    required: true,
    type: Object
  }
});
</script>

<style lang="scss" scoped>
.item {
  padding: max(1.6rem, 16px);
  border-radius: max(1.2rem, 12px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: max(1.6rem, 12px);
  transition: all vars.$dt;
  &:hover {
    box-shadow: 0px 4px 32px 0px #0000001f;
  }
  &__tags {
    display: flex;
    gap: max(1rem, 10px);
  }
  &__image {
    aspect-ratio: 237/174;
  }
  &__tag {
    padding-block: max(0.6rem, 6px);
    padding-inline: max(1rem, 10px);
    font-size: max(1rem, 10px);
    color: #fff;
    border-radius: max(2.8rem, 28px);
    font-weight: 500;
  }
  &__divider {
    align-self: stretch;
    height: 1px;
    background-color: #d6d7d7;
  }
  &__area {
    font-weight: bold;
    font-size: max(2.4rem, 20px);
  }
  &__top {
    display: flex;
    flex-direction: column;
    gap: max(0.8rem, 8px);
  }
  &__label {
    font-weight: bold;
    font-size: max(1.6rem, 14px);
  }
}
</style>
