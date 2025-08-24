<template>
  <div class="layout">
    <!-- <AppPreloader /> -->
    <AppHeader v-if="isHeaderPresent" :is-plan-header="true" @toggle-modal="toggleModal" />
    <slot />
    <Transition name="fade">
      <ContactsModal v-if="showModal" @toggle-modal="toggleModal" />
    </Transition>
  </div>
</template>

<script setup>
const showModal = ref(false);
const route = useRoute();
const isHeaderPresent = computed(() => route.path !== '/select');

const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100dvh;
  min-width: 100dvw;
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
.fade-leave-to > * {
  transform: translateY(50px);
}
</style>
