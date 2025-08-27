<template>
  <main class="architecture" :class="{ hidden: showPreloader || showPageLoader }">
    <NuxtPicture src="/images/architecture-bg.jpg" alt="banner" class="architecture__banner" />
    <div class="architecture__content">
      <h2 class="heading-large">Просторные террасы для отдыха и встреч</h2>
      <p class="architecture__content-text">
        Наслаждайтесь панорамными видами и свежим воздухом на просторных террасах, расположенных
        прямо над коммерческими помещениями — идеальное место для отдыха, встреч и приятного
        времяпрепровождения
      </p>
    </div>
    <div class="architecture__bottom">
      <div class="architecture__nav">
        <button
          v-for="(name, i) in blockLinks"
          :key="i"
          class="architecture__nav-item"
          :class="{ active: currentPage === i }"
          @click="changePage(i)"
        >
          {{ name }}
        </button>
      </div>
      <PageCounter v-model="currentPage" :pages="blockLinks.length" />
    </div>
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const { showPreloader, showPageLoader } = useLoader();
const router = useRouter();

const currentPage = ref(0);

const blockLinks = [
  'Террасы',
  'Панорамные окна',
  'Фасадная подсветка',
  'Велодорожки',
  'Зона отдыха',
  'Автостоянки'
];
let tl;

watch([showPreloader, showPageLoader], () => {
  if (!showPreloader.value && !showPageLoader.value) tl.restart();
});

onMounted(() => {
  tl = gsap.timeline();

  SplitText.create('.architecture h2', {
    type: 'words',
    mask: 'words',
    onSplit: self => {
      tl.from(self.words, {
        yPercent: 120,
        rotationX: -90,
        opacity: 0,
        transformOrigin: '50% 100%',
        ease: 'back.out(1.7)',
        stagger: 0.08,
        duration: 0.8
      });
    }
  });

  SplitText.create('.architecture .architecture__content-text', {
    type: 'lines',
    mask: 'lines',
    onSplit: self => {
      tl.from(
        self.lines,
        {
          yPercent: 120,
          opacity: 0,
          ease: 'elastic.out(1, 0.5)',
          duration: 1.2,
          stagger: 0.1
        },
        '-=0.6'
      );
    }
  });
});

const changePage = index => (currentPage.value = index);

useScrollPage(direction => {
  if (direction === 'next') {
    router.push('/formula');
  } else {
    router.push('/portfolio');
  }
});

useHead({
  title: 'Architecture'
});
</script>

<style lang="scss" scoped>
.architecture {
  @include mix.block-padding;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: max(2.4rem, 16px);
  &.hidden {
    .architecture__banner > * {
      opacity: 0;
      transform: scale(1.1);
    }
    .architecture__bottom > * {
      @for $i from 1 through 2 {
        &:nth-child(#{$i}) {
          transform: translateY(25px);
          opacity: 0;
        }
      }
    }
  }
  &__banner {
    z-index: -1;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    & > * {
      transition: all 1s;
      object-position: 34%;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    & > * {
      transition-property: opacity, transform;
      transition-duration: 0.5s;
      @for $i from 1 through 2 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 0.2s + 0.5s;
        }
      }
    }
    @media screen and (max-width: vars.$bp-ipad-pro) {
      justify-content: center;
    }
  }
  &__nav {
    display: flex;
    gap: max(2.4rem, 14px);
    padding-inline: 2.4rem;
    border-radius: 1.2rem;
    background-color: #fff;
    position: relative;
    @media screen and (max-width: vars.$bp-ipad-pro) {
      display: none;
    }

    &-item {
      font-weight: 500;
      color: vars.$darker-grey;
      position: relative;
      padding-block: 1.4rem;
      &.active::after {
        transform: translateX(-50%) scaleX(1);
      }
      &::after {
        content: '';
        position: absolute;
        bottom: max(0.1rem, 1px);
        left: 50%;
        transition: transform 0.5s;
        transform: translateX(-50%) scaleX(0);
        width: 122.2222%;
        height: 3px;
        background-color: vars.$teal;
        border-top-left-radius: 2.2rem;
        border-top-right-radius: 2.2rem;
      }
    }
  }
  &__content {
    min-width: max(343px, 34.3rem);
    margin-block: auto;
    display: flex;
    flex-direction: column;
    gap: max(2.4rem, 24px);
    color: #fff;
    @media screen and (min-width: vars.$bp-large-mobile) {
      max-width: 42%;
    }
    @media screen and (max-width: vars.$bp-large-mobile) {
      margin-top: auto;
      margin-bottom: max(6rem, 60px);
    }
    &-text {
      font-size: max(1.8rem, 14px);
    }
  }

  &__page {
    min-width: 4.1rem;
    font-size: max(1.6rem, 16px);
    text-align: center;
  }
}
</style>
