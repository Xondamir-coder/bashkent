<template>
  <li class="details-item">
    <span>{{ detail.name }}:</span>
    <span>{{ detail.value }}</span>
  </li>
</template>

<script setup>
defineProps({
  detail: {
    required: true,
    type: Object
  }
});
</script>

<style lang="scss" scoped>
.details-item {
  padding-block: max(2.5rem, 15px);
  padding-inline: max(2.1rem, 21px);
  border-radius: max(0.8rem, 8px);
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr max-content;
  background-color: vars.$near-white;
  animation: slide-from-bottom-20 0.5s backwards;
  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: $i * 0.05s;
    }
  }
  span:last-child {
    font-weight: bold;
  }
}
</style>
