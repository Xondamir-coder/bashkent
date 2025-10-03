<template>
  <div class="layout">
    <Transition name="page">
      <PageLoader v-if="showPageLoader" />
    </Transition>
    <AppHeader />
    <AppMenu />
    <AppSidebar />
    <slot />
  </div>
</template>

<script setup>
const showPageLoader = useState('showPageLoader');
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100dvh;
  width: 100dvw;
  display: flex;
}
.page-enter-active,
.page-leave-active {
  transition: all 1s;
}
.page-enter-from,
.page-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
