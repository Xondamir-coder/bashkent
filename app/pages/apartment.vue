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
        <NuxtPicture
          format="avif"
          sizes="(max-width: 640px) 640px, 1280px"
          :src="apartmentData.img"
          alt="apartment banner"
          class="apartment__banner"
        >
          <PageNav v-model="currentPage" :pages="[1, 2, 3, 4]" />
        </NuxtPicture>
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

const currentPage = ref(1);
const { t } = useI18n();

const crumbs = computed(() => [
  {
    name: t('apts'),
    path: '/floors'
  },
  {
    name: t('apt'),
    path: '/floors'
  }
]);

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
