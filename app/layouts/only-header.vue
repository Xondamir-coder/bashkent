<template>
  <div class="layout">
    <AppHeader :is-plan-header="true" @toggle-modal="toggleModal" />
    <slot />
    <Transition name="fade">
      <ContactsModal v-if="showModal" @toggle-modal="toggleModal" />
    </Transition>
  </div>
</template>

<script setup>
const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

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
