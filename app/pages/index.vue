<template>
  <main class="home">
    <!-- <HomeSection1 /> -->
    <HomeSection2 />
  </main>
</template>

<script setup></script>

<style lang="scss" scoped>
.home {
  flex: 1;
  & > * {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
