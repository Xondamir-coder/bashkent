<template>
  <button class="glass-button" @click="$emit('click')">
    <div class="glass-button__icon">
      <slot />
    </div>
  </button>
</template>

<script setup>
defineEmits(['click']);
</script>

<style lang="scss" scoped>
.glass-button {
  background-color: #fff;
  width: max(4.2rem, 42px);
  height: max(4.2rem, 42px);
  border-radius: max(0.8rem, 8px);
  position: relative;
  @include mix.flex-center;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: inherit;
    border: 0.6px solid #ffffff;
  }
  &::after {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    );
    width: 129%;
    height: 129%;
    opacity: 0.6;
  }
  &::before {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    );
    width: 157%;
    height: 157%;
    opacity: 0.1;
  }
  &__icon {
    display: flex;
    width: 57.2%;
    fill: vars.$teal;
  }
}
</style>
