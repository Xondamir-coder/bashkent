<template>
  <div class="layout">
    <AppHeader @toggle-modal="toggleModal" />
    <Transition name="slide-in">
      <AppMenu v-if="showMenu" />
    </Transition>
    <AppSidebar :show-menu="showMenu" @toggle-menu="toggleMenu" />
    <slot />
    <Transition name="fade">
      <ContactsModal v-if="showModal" @toggle-modal="toggleModal" />
    </Transition>
    <AppPreloader />
  </div>
</template>

<script setup>
const showMenu = ref(false);
const showModal = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const toggleModal = () => {
  showModal.value = !showModal.value;
};

if (import.meta.client) {
  document.addEventListener('click', e => {
    if (showMenu.value && !e.target.closest('.menu') && !e.target.closest('.sidebar__ham')) {
      showMenu.value = false;
    }
  });
}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 1s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-100%);
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
