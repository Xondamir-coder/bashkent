<template>
  <div class="layout">
    <Transition name="slide-out">
      <AppPreloader v-if="showPreloader" />
    </Transition>
    <ClientOnly>
      <Transition name="page">
        <PageLoader v-if="showPageLoader" :data="pageLoaderData" />
      </Transition>
    </ClientOnly>
    <AppHeader />
    <Transition name="slide-in">
      <AppMenu v-if="showMenu" @toggle-menu="toggleMenu" />
    </Transition>
    <AppSidebar :show-menu="showMenu" @toggle-menu="toggleMenu" />
    <slot />
  </div>
</template>

<script setup>
const { showPreloader, showPageLoader } = useLoader();
const { tm, rt } = useI18n();

const newPageName = useState('newPageName');
const pages = useState('pages');

// menu
const showMenu = ref(false);
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// page loader
const data = computed(() =>
  pages.value.map((page, i) => ({
    name: page,
    title: rt(tm('page-loader')[i].title),
    texts: tm('page-loader')[i].texts,
    color: i % 2 === 0 ? 'yellow' : ''
  }))
);
const pageLoaderData = computed(() => {
  return data.value.find(item => item.name === newPageName.value) || {};
});

onMounted(() => {
  document.addEventListener('click', e => {
    if (showMenu.value && !e.target.closest('.menu') && !e.target.closest('.ham__container')) {
      showMenu.value = false;
    }
  });
});
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100dvh;
  width: 100dvw;
  display: flex;
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-20%);
  opacity: 0;
  @media screen and (max-width: 900px) {
    transform: scale(1.1);
    opacity: 0;
  }
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

.scale-out-enter-active,
.scale-out-leave-active {
  transition: all 1s ease;
}
.scale-out-enter-from,
.scale-out-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
.slide-out-enter-active,
.slide-out-leave-active {
  transition: all 0.6s ease;
}
.slide-out-enter-from,
.slide-out-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
