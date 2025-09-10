<template>
  <div class="layout">
    <AppHeader :is-plan-header="true" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100dvh;
  max-width: 100dvw;
  display: flex;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity vars.$dt;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-from > *,
.fade-leave-to > * {
  transform: translateX(20%);
  opacity: 0;
}
</style>
