<template>
  <div class="layout">
    <!-- <AppPreloader /> -->
    <AppHeader v-if="isHeaderPresent" @toggle-modal="toggleModal" />
    <Transition name="slide-in">
      <AppMenu v-if="showMenu" @toggle-modal="toggleModal" @toggle-menu="toggleMenu" />
    </Transition>
    <AppSidebar :show-menu="showMenu" @toggle-menu="toggleMenu" />
    <slot />
    <Transition name="fade">
      <ContactsModal v-if="showModal" @toggle-modal="toggleModal" />
    </Transition>
  </div>
</template>

<script setup>
const showMenu = ref(false);
const showModal = ref(false);

const route = useRoute();

const isHeaderPresent = computed(() => route.path !== '/select');

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const toggleModal = () => {
  showMenu.value = false;
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
  min-height: 100dvh;
  min-width: 100dvw;
  display: flex;
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-100%);
  @media screen and (max-width: 900px) {
    transform: scale(1.1);
    opacity: 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity vars.$dt;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-from > * {
  transform: translateX(100%);
}
.fade-leave-to > * {
  transform: translateX(100%);
}
</style>
