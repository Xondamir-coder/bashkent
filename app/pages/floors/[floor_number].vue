<template>
  <main class="floors">
    <div class="floors__top">
      <AppBreadcrumbs :crumbs />
      <h1 class="heading-large">{{ $t('layouts') }}</h1>
    </div>
    <div class="floors__container">
      <div
        class="floors__wrapper"
        :style="{ aspectRatio: viewBox.split(' ').join('/') }"
        :class="{
          fourfour: typeName === '4.4',
          fourone: typeName === '4.1',
          one: typeName === '1'
        }"
      >
        <img :src="imageSrc" alt="schema" class="floors__wrapper-image" width="1000" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="`0 0 ${viewBox}`"
          preserveAspectRatio="xMidYMid meet"
          alt="schema"
          class="floors__wrapper-svg"
        >
          <NuxtLink
            v-for="(apartment, index) in floor?.apartments"
            :key="index"
            :to="$localePath(`/apartments/${apartment.id}`)"
            @pointerenter="showInfoBox(apartment)"
            @pointerleave="hideInfoBox"
          >
            <path :d="apartment.path" class="floors__wrapper-path" />
          </NuxtLink>
        </svg>
      </div>
      <div class="floors__numbers">
        <button
          v-for="number in countdownArray(floors?.length)"
          :key="number"
          class="floors__number"
          :class="{ active: number === floor?.floor_number }"
          @click="changeSchema(number)"
        >
          {{ number }}
        </button>
      </div>
    </div>
    <InfoBox
      :is-active="isInfoBoxActive"
      :title="`№${hoveredData?.unit}`"
      :texts="[`${hoveredData?.area} ${$t('m-squared')}`]"
    />
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Composables
const { t } = useI18n();
const { floors, fetchFloors, activeBuilding } = useAppState();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

// Info box related
const isInfoBoxActive = ref(false);
const hoveredData = ref();
const showInfoBox = apt => {
  hoveredData.value = apt;
  isInfoBoxActive.value = true;
};
const hideInfoBox = () => {
  isInfoBoxActive.value = false;
};

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
    path: localePath(`/floors/${route.params.floor_number}`),
    query: {
      building_id: buildingID.value,
      block_id: blockID.value
    }
  });
}

if (!floors.value) {
  fetchFloors({ buildingID: buildingID.value, blockID: blockID.value });
}

// Current floor
const floor = computed(() =>
  floors.value?.find(d => d.floor_number === +route.params.floor_number)
);
const typeName = computed(() => floor.value?.block.building_type.name_en);
const viewBox = computed(() =>
  typeName.value === '4.4' ? '876 550' : typeName.value === '4.1' ? '401 500' : '800 500'
);
const imageSrc = computed(() => `${DOMAIN_URL}/${floor.value?.schema}`);
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
    name: `${t('floor')} ${route.params.floor_number}`,
    path: `/floors/${route.params.floor_number}`
  }
]);

const changeSchema = num => {
  navigateTo({
    path: localePath(`/floors/${num}`),
    query: {
      building_id: buildingID.value,
      block_id: blockID.value
    }
  });
};

onMounted(() => {
  SplitText.create('.heading-large', {
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
.floors {
  padding-top: calc(var(--header-height) + max(3.2rem, 20px));
  padding-inline: var(--block-spacing);
  padding-bottom: var(--block-spacing);
  display: flex;
  flex-direction: column;
  gap: max(4.7rem, 26px);
  &__wrapper {
    position: relative;
    margin-inline: auto;
    height: 100%;
    width: auto;
    &.fourfour {
      @media screen and (max-width: 1200px) {
        height: auto;
        width: 100%;
      }
      @media screen and (max-width: 600px) {
        & > * {
          transform: scale(2);
        }
      }
    }
    &.fourone {
      @media screen and (max-width: 600px) {
        height: auto;
        width: 100%;
      }
    }
    &.one {
      @media screen and (max-width: 1200px) {
        height: auto;
        width: 100%;
      }
      @media screen and (max-width: 500px) {
        transform: rotate(90deg) scale(1.5);
      }
    }
    & > * {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &-svg {
      z-index: 1;
    }
    &-path {
      fill: transparent;
      transition: fill 0.4s;
      cursor: pointer;
      &:hover {
        fill: vars.$gold;
      }
    }
  }
  &__container {
    display: flex;
    gap: max(4.4rem, 25px);
    overflow: hidden;
  }
  &__numbers {
    display: flex;
    flex-direction: column;
    gap: max(1.4rem, 14px);
  }
  &__number {
    font-weight: bold;
    font-size: max(1.8rem, 18px);
    border-radius: 50%;
    padding: 6px;
    border: 1px solid #d6d7d7;
    width: max(3.6rem, 36px);
    height: max(3.6rem, 36px);
    @include mix.flex-center;
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
