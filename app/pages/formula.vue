<template>
  <main class="formula" :class="{ hidden: showPreloader || showPageLoader }">
    <h2 class="heading-large">{{ $t('formula.title') }}</h2>
    <SvgFadingPattern class="formula__pattern" />
    <ul class="formula__list">
      <li v-for="(item, i) in items" :key="i" class="formula__item">
        <h3 class="formula__item-title">
          {{ $rt(item.amount) }}
        </h3>
        <p class="formula__item-text">
          {{ $rt(item.text) }}
        </p>
        <NuxtPicture
          format="avif"
          sizes="(max-width: 640px) 640px, 1280px"
          :src="item.image"
          :alt="$rt(item.text)"
          class="formula__item-image"
        />
      </li>
    </ul>
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import imgSrc1 from '/images/formula-1.jpg';
import imgSrc2 from '/images/formula-2.jpg';
import imgSrc3 from '/images/formula-3.jpg';
import imgSrc4 from '/images/formula-4.jpg';
import imgSrc5 from '/images/formula-5.jpg';
import imgSrc6 from '/images/formula-6.jpg';
import imgSrc7 from '/images/formula-7.jpg';
import imgSrc8 from '/images/formula-8.jpg';
import imgSrc9 from '/images/formula-9.jpg';
import imgSrc10 from '/images/formula-10.jpg';

const { showPageLoader, showPreloader } = useLoader();
const { tm } = useI18n();

const images = [
  imgSrc1,
  imgSrc2,
  imgSrc3,
  imgSrc4,
  imgSrc5,
  imgSrc6,
  imgSrc7,
  imgSrc8,
  imgSrc9,
  imgSrc10
];
const items = computed(() =>
  images.map((img, i) => ({
    amount: tm('formula.items')[i].amount,
    text: tm('formula.items')[i].text,
    image: img
  }))
);

watch([showPreloader, showPageLoader], () => {
  if (!showPreloader.value && !showPageLoader.value) tl.restart();
});

let tl;
onMounted(() => {
  tl = gsap.timeline();

  SplitText.create('.formula h2', {
    type: 'words',
    mask: 'words',
    onSplit: self => {
      tl.from(self.words, {
        yPercent: 150,
        skewY: 20,
        opacity: 0,
        ease: 'power4.out',
        stagger: 0.15,
        duration: 1
      });
    }
  });
  SplitText.create('.formula__item-title', {
    type: 'chars',
    mask: 'chars',
    onSplit: self => {
      tl.from(
        self.chars,
        {
          duration: 0.6,
          yPercent: 'random([-100, 100])',
          xPercent: 'random([-100, 100])',
          stagger: {
            from: 'random',
            amount: 0.2
          },
          ease: 'power3.out'
        },
        '-=0.5'
      );
    }
  });
});
onUnmounted(() => {
  tl.kill();
});

useScrollPage(direction => {
  if (direction === 'next') {
    useLocaleNavigate('/housing');
  } else {
    useLocaleNavigate('/architecture');
  }
});

useHead({
  title: 'Formula for Success',
  meta: [
    {
      name: 'description',
      content:
        'Discover Bashkent Residence in Bukhara by the numbers: 38 buildings, 2928 apartments, green zones, sports grounds, schools, wellness complex, parking.'
    },
    {
      name: 'keywords',
      content:
        'Bashkent Residence numbers, residential buildings Bukhara, apartments Bukhara, green zones, sports grounds, school, wellness complex, parking spaces'
    },
    {
      name: 'author',
      content: 'https://spacelabs.studio'
    },
    {
      name: 'publisher',
      content: 'Spacelabs'
    },
    // Open Graph
    {
      property: 'og:title',
      content: 'Formula for Success – Bashkent Residence in Numbers'
    },
    {
      property: 'og:description',
      content:
        'Explore Bashkent Residence in Bukhara: 38 buildings, 2928 apartments, green zones, sports grounds, schools, wellness complex, and parking.'
    },
    {
      property: 'og:url',
      content: 'https://bashkent-residence.uz/formula-for-success'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: 'imgSrc'
    }
  ],
  link: [{ rel: 'canonical', href: 'https://bashkent-residence.uz/formula-for-success' }]
});
</script>

<style lang="scss" scoped>
.formula {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: max(3rem, 20px);
  position: relative;
  flex: 1;
  overflow: hidden;
  @include mix.block-padding;
  h2 {
    @media screen and (min-width: 500px) {
      max-width: 15ch;
    }
  }
  &__pattern {
    z-index: -1;
    width: 64%;
    min-width: 450px;
    position: absolute;
    right: 2.3rem;
    top: 7%;
    @media screen and (max-width: 500px) {
      left: 50%;
      right: auto;
      top: var(--block-padding-top);
      transform: translateX(-50%);
    }
  }
  &__list {
    display: grid;
    // align-content: flex-end;
    grid-template-columns: repeat(auto-fit, minmax(max(20rem, 166px), 1fr));
    grid-auto-rows: min(21.6rem, 22vh);
    column-gap: max(1.5rem, 11px);
    row-gap: max(2rem, 11px);
    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(auto-fit, minmax(max(20rem, 120px), 1fr));
      grid-auto-rows: auto;
      & > * {
        aspect-ratio: 166/120;
      }
    }
  }
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // aspect-ratio: 232/224;
    border-radius: max(1.2rem, 12px);
    background-color: vars.$light-grey;
    padding: max(1.7rem, 12px);
    position: relative;
    overflow: hidden;
    transition: color vars.$dt;
    &:hover {
      color: #fff;
      .formula__item-text {
        color: #fff;
      }
      .formula__item-image {
        opacity: 1;
        transform: scale(1.1);
        &::after {
          opacity: 1;
        }
      }
    }
    &-title {
      z-index: 2;
      font-family: vars.$font-angst;
      font-weight: bold;
      font-size: max(3.2rem, 24px);
      line-height: 145%;
    }
    &-text {
      z-index: 2;
      font-size: max(1.4rem, 12px);
      color: vars.$darker-grey;
    }
    &-image {
      opacity: 0;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transition: all vars.$dt;
      &::after {
        opacity: 0;
        transition: opacity vars.$dt;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        background: #00000080;
      }
    }
  }
}
</style>
