<template>
  <main class="apartments">
    <div class="apartments__top">
      <AppBreadcrumbs :crumbs="crumbs" />
      <h1 class="heading-large apartments__title">{{ $t('layouts') }}</h1>
    </div>
    <div class="apartments__container">
      <div class="apartments__wrapper">
        <img src="/images/schema.avif" alt="schema" class="apartments__wrapper-image" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 876 550"
          preserveAspectRatio="xMidYMid slice"
          alt="schema"
        >
          <path
            v-for="(path, index) in paths"
            :key="index"
            :d="path"
            class="apartments__wrapper-path"
          />
        </svg>
      </div>
      <div class="apartments__numbers">
        <button
          v-for="number in [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]"
          :key="number"
          class="apartments__number"
          :class="{ active: number === +$route.params.id }"
          @click="changeCurrentPage(number)"
        >
          {{ number }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const route = useRoute();
const router = useRouter();
const cookie = useCookie('building');
const { t } = useI18n();

// SAME ASPECT RATIO
// Type 1.1
// const paths = [
//   'M768.159 44.5117L767.022 263.566L768.159 4.94397H560.062L560.628 264.139L590.223 263.78L588.643 334.672H768.727L767.022 503.264L869.932 504.409L870.501 45.0844L768.159 44.5117Z',
//   'M436.903 334.305L768.676 334.026L768.153 545.421L437.593 546.997L436.903 334.305Z',
//   'M105.647 334.592L437.42 334.313L436.898 545.708L106.337 547.285L105.647 334.592Z',
//   'M106.216 4.86353H314.314L313.746 264.058L107.353 263.486L106.216 4.86353Z',
//   'M184.679 334.593L184.111 262.339L107.352 263.486L106.216 44.4301L3.87305 45.0045L4.44173 504.331L107.352 503.184L105.647 334.593H184.679Z'
// ];

// Type 4.1
const paths = [
  'M 453.805 144.568 L 403.776 144.568 L 403.776 134.674 L 408.039 134.674 L 408.039 111.393 L 345.802 111.393 L 345.802 20.465 L 408.039 20.465 L 408.039 5.119 L 465.803 5.119 L 465.803 23.58 L 527.829 24.52 L 528.039 117.405 L 467.573 117.123 L 467.399 134.674 L 467.517 144.329 L 453.805 144.568 Z',
  'M 651.919 63.325 L 589.857 63.325 L 589.857 43.923 L 531.919 43.923 L 529.979 117.405 L 469.857 117.141 L 469.857 144.329 L 454.551 144.329 L 454.551 204.486 L 575.795 204.486 L 575.795 245.213 L 632.7 245.213 L 632.7 202.39 L 629.59 202.39 L 629.59 146.49 L 651.919 146.49 L 651.919 63.325 Z',
  'M 629.59 344.494 L 452.42 344.494 L 452.42 406.58 L 470.067 406.58 L 470.067 419.759 L 469.857 419.759 L 469.857 528.549 L 527.83 528.549 L 527.83 505.058 L 589.858 505.058 L 589.858 485.69 L 651.92 485.69 L 651.92 419.759 L 651.92 406.58 L 629.59 406.58 L 629.59 344.494 Z',
  'M 452.245 543.861 L 465.803 543.861 L 465.803 416.263 L 466.442 404.584 L 452.245 404.447 L 408.039 404.447 L 408.039 437.413 L 360.934 437.413 L 344.265 437.413 L 344.474 445.558 L 344.474 527.955 L 360.934 527.955 L 408.039 527.955 L 408.039 543.861 L 452.245 543.861 Z',
  'M 341.749 505.058 L 283.95 505.058 L 283.95 485.69 L 221.958 485.69 L 221.958 433.323 L 221.958 406.58 L 238.207 406.58 L 238.207 344.494 L 403.776 344.494 L 403.776 418.78 L 405.374 434.12 L 391.126 434.428 L 342.053 434.46 L 341.749 485.69 L 341.749 505.058 Z',
  'M 403.986 208.541 L 242.435 208.541 L 238.207 208.541 L 238.207 276.22 L 242.435 276.22 L 242.435 339.775 L 403.986 339.775 L 403.986 208.541 Z',
  'M 341.749 43.923 L 283.775 43.923 L 283.775 63.325 L 221.958 63.325 L 221.958 142.435 L 238.207 142.435 L 238.207 204.486 L 403.776 204.486 L 403.776 115.657 L 341.749 115.657 L 341.749 113.525 L 341.749 63.325 L 341.749 43.923 Z'
];

// Type 4.4
// const paths = [
//   'M 454.136 143.094 L 405.486 143.094 L 405.486 133.16 L 409.768 133.16 L 409.768 109.783 L 347.254 109.783 L 347.254 18.486 L 409.768 18.486 L 409.768 3.077 L 467.79 3.077 L 467.79 133.16 L 454.136 133.16 L 454.136 143.094 Z',
//   'M 654.736 61.519 L 592.398 61.519 L 592.398 42.038 L 530.094 42.038 L 530.094 22.557 L 471.862 22.557 L 471.862 42.038 L 471.862 61.519 L 471.862 142.854 L 456.488 142.854 L 456.488 203.256 L 578.273 203.256 L 578.273 244.148 L 635.431 244.148 L 635.431 201.151 L 632.307 201.151 L 632.307 145.024 L 654.736 145.024 L 654.736 61.519 Z',
//   'M 632.306 343.833 L 454.347 343.833 L 454.347 406.173 L 472.072 406.173 L 472.072 419.405 L 471.862 419.405 L 471.862 528.638 L 530.093 528.638 L 530.093 505.051 L 592.397 505.051 L 592.397 485.604 L 654.736 485.604 L 654.736 419.405 L 654.736 406.173 L 632.306 406.173 L 632.306 343.833 Z',
//   'M 454.171 544.012 L 467.79 544.012 L 467.79 415.894 L 454.171 415.894 L 454.171 404.031 L 409.768 404.031 L 409.768 437.131 L 362.454 437.131 L 362.454 445.309 L 347.465 445.309 L 347.465 528.041 L 362.454 528.041 L 409.768 528.041 L 409.768 544.012 L 454.171 544.012 Z',
//   'M 343.183 505.051 L 285.127 505.051 L 285.127 485.604 L 222.858 485.604 L 222.858 433.024 L 222.858 406.173 L 239.18 406.173 L 239.18 343.833 L 405.487 343.833 L 405.487 418.422 L 392.78 418.422 L 392.78 433.024 L 343.183 433.024 L 343.183 485.604 L 343.183 505.051 Z',
//   'M 405.698 207.327 L 243.428 207.327 L 239.181 207.327 L 239.181 275.282 L 243.428 275.282 L 243.428 339.095 L 405.698 339.095 L 405.698 207.327 Z',
//   'M 343.183 42.038 L 284.951 42.038 L 284.951 61.519 L 222.858 61.519 L 222.858 140.952 L 239.18 140.952 L 239.18 203.256 L 405.487 203.256 L 405.487 114.065 L 343.183 114.065 L 343.183 111.924 L 343.183 61.519 L 343.183 42.038 Z'
// ];

const buildingID = computed(() => route.query.building || cookie.value);
const crumbs = computed(() => [
  {
    name: t('masterplan'),
    path: '/masterplan'
  },
  {
    name: `${t('block')} ${buildingID.value}`,
    path: `/buildings/${buildingID.value}`
  }
]);

if (!buildingID.value) useLocaleNavigate('/masterplan');
router.replace({
  query: { ...route.query, building: buildingID.value }
});

const changeCurrentPage = index => {
  navigateTo(`/floors/${index}?building=${buildingID.value}`);
};

onMounted(() => {
  SplitText.create('.apartments__title', {
    type: 'chars',
    mask: 'chars',
    onSplit: self => {
      gsap.from(self.chars, {
        yPercent: 100,
        xPercent: -100,
        stagger: 0.025,
        ease: 'power2.out'
      });
    }
  });
});

definePageMeta({
  layout: 'only-header'
});
</script>

<style lang="scss" scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    scale: 1.05;
  }
}
.apartments {
  padding-top: calc(var(--header-height) + max(3.2rem, 20px));
  padding-inline: var(--block-spacing);
  padding-bottom: var(--block-spacing);
  display: flex;
  flex-direction: column;
  gap: max(4.7rem, 26px);
  &__wrapper {
    display: grid;
    margin-inline: auto;

    &-path {
      fill: transparent;
      transition: fill 0.4s;
      cursor: pointer;
      &:hover {
        fill: vars.$gold;
      }
    }
    & > * {
      grid-area: 1/1/2/2;
      object-fit: contain;
    }
  }
  &__container {
    display: flex;
    gap: max(4.4rem, 25px);
    overflow: hidden;
    @media screen and (max-width: 700px) {
      flex: 1;
    }
  }
  &__numbers {
    display: flex;
    flex-direction: column;
    gap: max(1.4rem, 14px);
  }
  &__banner {
    animation: scale-in 1s backwards 0.2s;
    align-self: center;
    @media screen and (max-width: 700px) {
      transform: rotate(90deg);
      align-self: flex-start;
      margin-top: 27%;
    }
  }
  &__number {
    font-weight: bold;
    font-size: max(1.8rem, 18px);
    border-radius: 50%;
    padding: 6px;
    border: 1px solid #d6d7d7;
    width: max(3.6rem, 36px);
    height: max(3.6rem, 36px);
    animation: slide-from-bottom-20 0.5s backwards;
    @include mix.flex-center;
    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 0.05s + 0.3s;
      }
    }
    &.active,
    &:hover {
      background-color: vars.$gold;
      color: #fff;
      border-color: vars.$gold;
    }
  }
  &__top {
    display: flex;
    flex-direction: column;
    gap: max(1.4rem, 12px);
  }
}
</style>
