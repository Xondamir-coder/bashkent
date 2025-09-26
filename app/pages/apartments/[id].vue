<template>
  <main class="apartment">
    <AppBreadcrumbs :crumbs="crumbs" />
    <div class="apartment__wrapper">
      <div class="apartment__left">
        <div class="apartment__left-top">
          <h1 class="heading-large">№ 814</h1>
          <span>{{ $t('apt') }}</span>
        </div>
        <ul class="apartment__details apartment__details--desktop">
          <DetailsItem v-for="(detail, index) in apartmentDetails" :key="index" :detail />
        </ul>
      </div>
      <div class="apartment__middle">
        <img
          :src="`${DOMAIN_URL}/${activeApartment?.image}`"
          alt="apartment"
          width="460"
          height="520"
        />
        <PageNav v-model="currentPage" :pages="[1, 2, 3, 4]" />
      </div>
      <ul class="apartment__details apartment__details--mobile">
        <li v-for="(detail, index) in apartmentDetails" :key="index" class="apartment__detail">
          <span>{{ detail.name }}:</span>
          <span>{{ detail.value }}</span>
        </li>
      </ul>
      <div class="apartment__cta">
        <ColoredButton :text="$t('book')" color="teal">
          <SvgLock />
        </ColoredButton>
        <ColoredButton :text="$t('book-meeting')" color="gold">
          <SvgCall />
        </ColoredButton>
        <ColoredButton :text="$t('download-pdf')" color="orange">
          <SvgArticle />
        </ColoredButton>
      </div>
    </div>
  </main>
</template>

<script setup>
import imgSrc from '/images/apt.png';

const FRONT_API_URL = `${DOMAIN_URL}/api/front`;

const { activeApartment, activeBuilding, activeFloor } = useAppState();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

// Cookie related
const buildingCookie = useCookie('building_id');
const blockCookie = useCookie('block_id');
const floorCookie = useCookie('floor_id');

const buildingID = ref(route.query.building_id || activeBuilding.value?.id || buildingCookie.value);
const blockID = ref(route.query.block_id || activeFloor.value?.block_id || blockCookie.value);
const floorID = ref(route.query.floor_id || activeFloor.value?.id || floorCookie.value);

if (!buildingID.value || !blockID.value || !floorID.value) {
  useLocaleNavigate('/masterplan');
}

if (!route.query.building_id || !route.query.block_id || !route.query.floor_id) {
  router.replace({
    path: localePath(`/apartments/${route.params.id}`),
    query: {
      building_id: buildingID.value,
      block_id: blockID.value,
      floor_id: floorID.value
    }
  });
}

if (!activeApartment.value) {
  const { data } = await useFetch(`${FRONT_API_URL}/floors`, {
    query: {
      building_id: buildingID.value
    }
  });

  activeApartment.value = data.value?.find(
    d =>
      d.id === +route.params.id &&
      d.building_id === +buildingID.value &&
      d.block_id === +blockID.value &&
      d.floor_id === +floorID.value
  );
}

console.log(activeApartment.value);

const currentPage = ref(1);
const { t } = useI18n();

const apartmentData = ref({
  block: 4,
  floor: 6,
  type: 'STUDIO',
  area: 72.9,
  price: '987 720 000',
  img: imgSrc
});
const apartmentDetails = computed(() => [
  {
    name: 'Блок',
    value: apartmentData.value.block
  },
  {
    name: 'Этаж',
    value: apartmentData.value.floor
  },
  {
    name: 'Этаж',
    value: apartmentData.value.floor
  },
  {
    name: 'Тип',
    value: apartmentData.value.type
  },
  {
    name: 'Площадь',
    value: apartmentData.value.area
  },
  {
    name: 'Стоимость',
    value: apartmentData.value.price
  }
]);
const crumbs = computed(() => [
  {
    name: t('masterplan.name'),
    path: '/masterplan'
  },
  {
    name: `${t('masterplan.house')} ${buildingID.value}`,
    path: `/buildings/${buildingID.value}`
  },
  {
    name: `${t('floor')} ${activeApartment.value?.floor}`,
    path: `/floors/${floorID.value}?building_id=${buildingID.value}&block_id=${blockID.value}`
  },
  {
    name: `${t('apt')} ${activeApartment.value?.unit}`,
    path: `/apartments/${route.params.id}`
  }
]);

useHead({
  title: 'Apartment'
});
definePageMeta({
  layout: 'only-header'
});
</script>

<style lang="scss" scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
}
.apartment {
  padding-top: calc(var(--header-height) + max(3.2rem, 20px));
  padding-inline: var(--block-spacing);
  display: flex;
  flex-direction: column;
  gap: max(1.2rem, 12px);
  padding-bottom: max(3rem, 24px);
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1.27fr 0.92fr;
    gap: max(7.2rem, 32px);
    @media screen and (max-width: vars.$bp-ipad-pro) {
      gap: max(3.2rem, 32px);
      grid-template-columns: 1fr;
    }
  }
  &__details {
    display: flex;
    flex-direction: column;
    gap: max(0.8rem, 4px);
    &--desktop {
      @media screen and (max-width: vars.$bp-ipad-pro) {
        display: none;
      }
    }
    &--mobile {
      @media screen and (min-width: vars.$bp-ipad-pro) {
        display: none;
      }
    }
  }
  &__banner {
  }
  &__middle {
    // max-width: 35%;
    display: flex;
    flex-direction: column;
    gap: max(3rem, 20px);
    & > * {
      animation: scale-in 0.5s backwards;
      @for $i from 1 through 2 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.1s;
        }
      }
    }
  }
  &__left {
    display: flex;
    flex-direction: column;
    gap: max(3.2rem, 32px);
    &-top {
      display: flex;
      flex-direction: column;
      gap: max(0.8rem, 4px);
      animation: slide-from-left-20 0.5s backwards;

      span {
        font-weight: 500;
        font-size: max(1.4rem, 14px);
        color: vars.$darker-grey;
      }
    }
  }
  &__cta {
    display: flex;
    flex-direction: column;
    gap: max(2.4rem, 20px);
  }
}
</style>
