<template>
  <main class="apartment">
    <AppBreadcrumbs :crumbs />
    <div class="apartment__wrapper">
      <div class="apartment__top">
        <h1 class="heading-large">{{ apartment?.area }} {{ $t('m-squared') }}</h1>
        <span>{{ $t('total-area') }}</span>
      </div>
      <img
        :src="`${DOMAIN_URL}/${apartment?.image}`"
        alt="apartment"
        width="460"
        height="520"
        class="apartment__banner"
        :class="{ active: isImgLoaded }"
        @load="isImgLoaded = true"
      />
      <ul class="apartment__details">
        <li v-for="(room, index) in apartment?.rooms" :key="index" class="apartment__detail">
          <span class="apartment__detail-index">{{ index + 1 }}</span>
          <span class="apartment__detail-key">{{ room[`key_${$i18n.locale}`] }}:</span>
          <span class="apartment__detail-val">{{ room.val }} {{ $t('m-squared') }}</span>
        </li>
      </ul>
      <div class="apartment__right">
        <div class="apartment__cta">
          <ColoredButton :text="$t('book')" color="teal" @click="showContactsModal = true">
            <SvgLock />
          </ColoredButton>
          <a :href="`tel:${TEL_NUMBER}`">
            <ColoredButton :text="$t('book-meeting')" color="gold">
              <SvgCall />
            </ColoredButton>
          </a>
          <ColoredButton
            :disabled="isDownloading"
            :text="!isDownloading ? $t('download-pdf') : `${$t('loading')}...`"
            color="orange"
            @click="downloadPDF"
          >
            <SvgArticle />
          </ColoredButton>
        </div>
        <img
          width="500"
          :src="`${DOMAIN_URL}/${apartment?.floor_plan_selected_pdf}`"
          alt="selected schema"
          class="apartment__schema"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const { t, locale } = useI18n();
const { fetchApartment, API_URL } = useAppState();

const showContactsModal = useState('showContactsModal');

const isImgLoaded = ref(false);
const isDownloading = ref(false);

const apartment = await fetchApartment(route.params.id);

const downloadPDF = async () => {
  isDownloading.value = true;
  try {
    const res = await $fetch(`${API_URL}/pdf`, {
      responseType: 'arrayBuffer',
      headers: { accept: 'application/pdf' },
      query: {
        block_id: apartment.value?.block_id,
        floor_number: apartment.value?.floor,
        apartment_id: apartment.value?.id,
        lang: locale.value
      }
    });

    const blob = new Blob([res], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = Object.assign(document.createElement('a'), {
      href: url,
      download: `${t('apt').toLowerCase()}-${apartment.value?.unit}.pdf`
    });

    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  } finally {
    isDownloading.value = false;
  }
};

const crumbs = computed(() => [
  {
    name: t('masterplan.name'),
    path: '/masterplan'
  },
  {
    name: `${t('building')} ${apartment.value?.building_id}`,
    path: `/buildings/${apartment.value?.building_id}`
  },
  {
    name: `${t('floor')} ${apartment.value?.floor}`,
    path: `/floors/${apartment.value?.floor}?building_id=${apartment.value?.building_id}&block_id=${apartment.value?.block_id}`
  },
  {
    name: `${t('apt')} ${apartment.value?.unit}`,
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
  position: relative;
  &__right {
    grid-area: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
  &__wrapper {
    flex: 1;
    display: grid;
    grid-auto-columns: 1fr 1.27fr 0.92fr;
    grid-template-areas:
      'top banner right'
      'details banner right';
    gap: max(6.4rem, 32px);
    @media screen and (min-width: vars.$bp-ipad-pro) {
      grid-auto-rows: max-content 1fr;
    }
    @media screen and (max-width: vars.$bp-ipad-pro) {
      gap: max(3.2rem, 32px);
      grid-template-areas:
        'top'
        'banner'
        'details'
        'right';
    }
    & > * {
      animation: slide-from-bottom-20 1s backwards;
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.1s;
        }
      }
    }
  }
  &__details {
    grid-area: details;
    display: flex;
    flex-direction: column;
    gap: max(0.8rem, 4px);
  }
  &__detail {
    display: flex;
    gap: max(1rem, 10px);
    background-color: vars.$near-white;
    align-items: center;
    padding-block: max(1rem, 10px);
    padding-inline: max(2.1rem, 21px);
    border-radius: max(0.8rem, 8px);
    &-index {
      font-size: max(1.4rem, 14px);
      font-weight: 500;
      width: max(2.6rem, 20px);
      height: max(2.6rem, 20px);
      background-color: #fff;
      border-radius: 50%;
      @include mix.flex-center;
    }
    &-val {
      margin-left: auto;
      font-weight: 700;
    }
  }
  &__banner {
    grid-area: banner;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: max(3rem, 20px);
    &.active {
      animation: slide-from-bottom-20 1s;
    }
    @media screen and (max-width: vars.$bp-ipad-pro) {
      margin-block: -15%;
    }
  }
  &__top {
    grid-area: top;
    display: flex;
    flex-direction: column;
    gap: max(0.8rem, 4px);

    span {
      font-weight: 500;
      font-size: max(1.4rem, 14px);
      color: vars.$darker-grey;
    }
  }
  &__left {
    display: flex;
    flex-direction: column;
    gap: max(3.2rem, 32px);
  }
  &__cta {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: max(2.4rem, 20px);
  }
}
</style>
