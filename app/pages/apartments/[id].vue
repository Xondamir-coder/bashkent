<template>
  <main class="apartment">
    <AppBreadcrumbs :crumbs="crumbs" />
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
      />
      <ul class="apartment__details">
        <li v-for="(room, index) in apartment?.rooms" :key="index" class="apartment__detail">
          <span class="apartment__detail-index">{{ index + 1 }}</span>
          <span class="apartment__detail-key">{{ room[`key_${$i18n.locale}`] }}:</span>
          <span class="apartment__detail-val">{{ room.val }} {{ $t('m-squared') }}</span>
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
const { fetchApartment } = useAppState();
const route = useRoute();

const apartment = await fetchApartment(route.params.id);

const { t } = useI18n();

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
    path: `/floors/${apartment.value?.floor_id}?building_id=${apartment.value?.building_id}&block_id=${apartment.value?.block_id}`
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
  &__wrapper {
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
    @media screen and (max-width: vars.$bp-ipad-pro) {
      margin-block: -15%;
    }
    & > * {
      animation: scale-in 0.5s backwards;
      @for $i from 1 through 2 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.1s;
        }
      }
    }
  }
  &__top {
    grid-area: top;
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
  &__left {
    display: flex;
    flex-direction: column;
    gap: max(3.2rem, 32px);
  }
  &__cta {
    grid-area: right;
    display: flex;
    flex-direction: column;
    gap: max(2.4rem, 20px);
  }
}
</style>
