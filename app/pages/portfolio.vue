<template>
  <main class="portfolio">
    <PortfolioSection
      v-for="(section, index) in $tm('portfolio.items')"
      :key="index"
      ref="sectionRefs"
      :class="{ active: currentSection === index }"
      :img-src="$rt(section.image)"
      :title="$rt(section.title)"
      :text="$rt(section.text)"
    />
  </main>
</template>

<script setup>
// imports
// import gsap from 'gsap';
import imgSrc1 from '/images/portfolio-1.jpg';
import imgSrc2 from '/images/portfolio-2.jpg';

// state
// let timelines;
const sectionRefs = ref([]);
const currentSection = ref(0);

const data = computed(() => [
  {
    image: imgSrc1,
    title: 'Производственные заводы АГМК в Алмалыке',
    text: 'На территории АГМК в городе Алмалык Ташкентской области расположены современные производственные заводы, обеспечивающие полный цикл переработки и выпуска продукции'
  },
  {
    image: imgSrc2,
    title: 'Университет социальных инноваций, Ташкент',
    text: 'В Ташкенте действует Международный университет социальных инноваций, который готовит специалистов нового поколения в сфере социальных и технологических преобразований'
  }
]);

// scroll/swipe helpers
let startY = 0;
let isLocked = false;
const lockTime = 1000;
const swipeThreshold = 60;
const wheelThreshold = 30;

const lock = () => {
  isLocked = true;
  setTimeout(() => (isLocked = false), lockTime);
};

const atTop = () => window.scrollY === 0;
const atBottom = () =>
  Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

// scroll/swipe handler
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
    if (currentSection.value === data.value.length - 1) {
      useLocaleNavigate('/architecture');
      return lock();
    }
    currentSection.value++;
    lock();
  } else if (deltaY < 0 && atTop()) {
    if (currentSection.value === 0) {
      useLocaleNavigate('/about');
      return lock();
    }
    currentSection.value--;
    lock();
  }
};

// touch start handler
const onTouchStart = e => {
  startY = e.touches[0].clientY;
};

// watchers
watch(currentSection, () => {
  console.log(currentSection.value);
});

// lifecycle
onMounted(() => {
  window.addEventListener('wheel', handleScrollOrSwipe, { passive: false });
  window.addEventListener('touchend', handleScrollOrSwipe, { passive: false });
  window.addEventListener('touchstart', onTouchStart);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleScrollOrSwipe);
  window.removeEventListener('touchend', handleScrollOrSwipe);
  window.removeEventListener('touchstart', onTouchStart);
});

// head
const { locale } = useI18n();
useSeoMeta({
  title: seo[locale.value]['portfolio'].title,
  description: seo[locale.value]['portfolio'].description,
  keywords: seo[locale.value]['portfolio'].keywords
});
</script>

<style lang="scss" scoped>
.portfolio {
  display: grid;
  & > * {
    grid-area: 1/1/2/2;
  }
}
</style>
