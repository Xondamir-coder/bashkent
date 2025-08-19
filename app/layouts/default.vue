<template>
  <div class="layout">
    <AppHeader />
    <AppSidebar />
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
}
</style>
