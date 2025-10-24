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
  $anim-duration: 3.5s;
  $anim-delay: calc($anim-duration / 2);
  background-color: #fff;
  fill: vars.$teal;
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
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    );
    width: 100%;
    height: 100%;
    animation: radiate $anim-duration infinite linear;
  }
  &::after {
    animation-delay: $anim-delay;
  }
  &__icon {
    display: flex;
    width: 57.2%;
  }
}

@keyframes radiate {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.29);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.57);
    opacity: 0;
  }
}
</style>
