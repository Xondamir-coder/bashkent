<template>
  <main class="apartments">
    <div class="apartments__top">
      <AppBreadcrumbs :crumbs="crumbs" />
      <h1 class="heading-large apartments__title">{{ $t('layouts') }}</h1>
    </div>
    <div class="apartments__container">
      <div class="apartments__wrapper">
        <img
          :src="`${DOMAIN_URL}/${floor?.schema}`"
          alt="schema"
          class="apartments__wrapper-image"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="`0 0 ${viewBox}`"
          preserveAspectRatio="xMidYMid slice"
          alt="schema"
        >
          <path
            v-for="(apartment, index) in floor?.apartments"
            :key="index"
            :d="apartment.path"
            class="apartments__wrapper-path"
            @click="goToApartment(apartment)"
          />
        </svg>
      </div>
      <div class="apartments__numbers">
        <button
          v-for="number in countdownArray(floors?.length)"
          :key="number"
          class="apartments__number"
          :class="{ active: number === floor?.floor_number }"
          @click="changeSchema(number)"
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

// Viewboxes
// 1: 0 0 500 800
// 4.1: 0 0 401 800
// 4.4 0 0 876 550

// Composables
const { t } = useI18n();
const { activeBuilding, floors } = useAppState();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

// Cookie related
const buildingCookie = useCookie('building_id');
const blockCookie = useCookie('block_id');

const buildingID = ref(route.query.building_id || activeBuilding.value?.id || buildingCookie.value);
const blockID = ref(route.query.block_id || blockCookie.value);

if (!buildingID.value || !blockID.value) {
  useLocaleNavigate('/masterplan');
}

if (!route.query.building_id || !route.query.block_id) {
  router.replace({
    path: localePath(`/floors/${route.params.id}`),
    query: {
      building_id: buildingID.value,
      block_id: blockID.value
    }
  });
}

const floor = computed(() =>
  floors.value?.find(
    d =>
      d.id === +route.params.id &&
      d.building_id === +buildingID.value &&
      d.block_id === +blockID.value
  )
);
const typeName = computed(() => floor.value?.block.building_type.name_en);
const viewBox = computed(() =>
  typeName.value === '4.4' ? '876 550' : typeName.value === '4.1' ? '800 500' : '401 500'
);
const crumbs = computed(() => [
  {
    name: t('masterplan.name'),
    path: '/masterplan'
  },
  {
    name: `${t('building')} ${buildingID.value}`,
    path: `/buildings/${buildingID.value}`
  },
  {
    name: `${t('floor')} ${floor.value?.floor_number}`,
    path: `/floors/${route.params.id}`
  }
]);

const changeSchema = () => {
  // TODO: Change schema by floor number
};
const goToApartment = apt => {
  navigateTo({
    path: localePath(`/apartments/${apt.id}`)
  });
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
    max-width: 90vh;

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
