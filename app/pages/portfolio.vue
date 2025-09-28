<template>
  <main class="portfolio">
    <PortfolioSection
      v-for="(section, index) in data"
      :key="index"
      ref="sectionRefs"
      :class="{ active: currentSection === index }"
      :img-src="section.image"
      :title="$rt(section.title)"
      :text="$rt(section.text)"
    />
  </main>
</template>

<script setup>
const { tm } = useI18n();
const sectionRefs = ref([]);
const currentSection = ref(0);

const data = computed(() => [
  tm('portfolio.items').map((item, i) => ({
    ...item,
    image: `portfolio-${i + 1}.jpg`
  }))[0]
]);

/*
// scroll/swipe helpers (disabled as only one block)
let startY = 0;
let isLocked = false;
const lockTime = 1000;
const swipeThreshold = 60;
const wheelThreshold = 30;
const timeoutAfterPageLoader = 1500;

const lock = () => {
  isLocked = true;
  setTimeout(() => (isLocked = false), lockTime);
};

const atTop = () => window.scrollY === 0;
const atBottom = () =>
  Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

const handleScrollOrSwipe = e => {
  if (isLocked) return;

  let deltaY = 0;

  if (e.type === 'wheel') {
    if (Math.abs(e.deltaY) < wheelThreshold) return;
    deltaY = e.deltaY;
  } else if (e.type === 'touchend') {
    const endY = e.changedTouches[0].clientY;
    deltaY = startY - endY;
    if (Math.abs(deltaY) < swipeThreshold) return;
  }

  if (deltaY > 0 && atBottom()) {
    useLocaleNavigate('/architecture');
    return lock();
  } else if (deltaY < 0 && atTop()) {
    useLocaleNavigate('/about');
    return lock();
  }
};

const onTouchStart = e => {
  startY = e.touches[0].clientY;
};

onMounted(() => {
  setTimeout(() => {
    window.addEventListener('wheel', handleScrollOrSwipe, { passive: false });
    window.addEventListener('touchend', handleScrollOrSwipe, { passive: false });
    window.addEventListener('touchstart', onTouchStart);
  }, timeoutAfterPageLoader);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleScrollOrSwipe);
  window.removeEventListener('touchend', handleScrollOrSwipe);
  window.removeEventListener('touchstart', onTouchStart);
});
*/

useScrollPage(direction => {
  if (direction === 'next') {
    useLocaleNavigate('/architecture');
  } else if (direction === 'prev') {
    useLocaleNavigate('/about');
  }
});

useMySEO('portfolio');
</script>
