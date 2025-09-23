<template>
  <main class="calculator">
    <AppBreadcrumbs :crumbs />
    <div class="calculator__header">
      <h1 class="heading-large">{{ $t('calculator.label') }}</h1>
      <span>{{ $t('calculator.text') }}</span>
    </div>
    <div class="calculator__container">
      <div class="calculator__plan calculator-box">
        <span class="calculator__label">{{ $t('calculator.desired-layout') }}</span>
        <FilterRow :no-label="true" />
        <div class="calculator__plan-box">
          <NuxtPicture
            format="avif"
            sizes="(max-width: 640px) 640px, 1280px"
            src="/images/calc-apt.png"
            alt="apartment"
            class="calculator__plan-image"
          />
          <ul class="calculator__plan-details">
            <DetailsItem
              v-for="(detail, i) in planDetails"
              :key="i"
              :detail
              class="calculator__plan-detail"
            />
          </ul>
        </div>
      </div>
      <div class="calculator__params calculator-box">
        <span class="calculator__label">{{ $t('calculator.params') }}</span>
        <FilterRow
          v-model="selectedFloor"
          :label="$t('floor')"
          :options="floors"
          :is-from-api="false"
        />
        <FilterRow :label="$t('deadline')" />
        <RangeSlider v-model="percentage" />
        <div class="calculator__params-bottom">
          <span>{{ $t('calculator.discount') }}: <span class="clr-teal">16%</span></span>
          <span>{{ $t('calculator.included') }}</span>
        </div>
      </div>
      <button class="calculator__button">{{ $t('calculator.calculate-price') }}</button>
    </div>
    <CalculatorResult />
    <div class="calculator__bottom">
      <ColoredButton color="teal" :text="$t('print')">
        <SvgPrint />
      </ColoredButton>
      <ColoredButton color="orange" :text="$t('download-pdf')">
        <SvgArticle />
      </ColoredButton>
      <ColoredButton color="teal" :text="$t('share')">
        <SvgShare />
      </ColoredButton>
      <ColoredButton color="gold" :text="$t('leave-enquiry')">
        <SvgCall />
      </ColoredButton>
    </div>
  </main>
</template>

<script setup>
const { t } = useI18n();

const planDetails = computed(() => [
  {
    name: t('just-area'),
    value: '48,76 м2'
  },
  {
    name: t('rooms'),
    value: 'Тип 3.3'
  },
  {
    name: t('type'),
    value: '1 комн.'
  },
  {
    name: t('condition'),
    value: ' Готовый ремонт'
  }
]);
const crumbs = computed(() => [
  {
    name: t('select-apt'),
    path: '/select'
  },
  {
    name: t('calculator.label'),
    path: '/calculator'
  }
]);
const floors = Array.from({ length: 12 }, (_, i) => i + 1);

const percentage = ref('10');
const selectedFloor = useState('selectedFloor', () => 1);

definePageMeta({
  layout: 'only-header'
});
useMySEO('calculator');
</script>

<style lang="scss" scoped>
.calculator {
  padding-top: calc(var(--header-height) + max(3.2rem, 20px));
  padding-inline: var(--block-spacing);
  display: flex;
  flex-direction: column;
  gap: max(1.6rem, 12px);
  padding-bottom: max(3rem, 24px);
  &__bottom {
    display: flex;
    margin-top: max(1.6rem, 4px);
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
    gap: max(6rem, 20px);
    flex-wrap: wrap;
    @media screen and (max-width: vars.$bp-small-mobile) {
      flex-direction: column;
    }
  }
  &__button {
    background-color: vars.$teal;
    padding-block: max(1.4rem, 12px);
    color: #fff;
    border-radius: max(1.2rem, 8px);
    @media screen and (min-width: vars.$bp-large-mobile) {
      grid-column: span 2;
    }
    &:hover {
      background-color: vars.$teal-dark;
    }
  }
  &__params-bottom {
    display: flex;
    flex-direction: column;
    font-size: max(1.2rem, 12px);
    gap: max(0.4rem, 4px);
  }
  &__label {
    font-weight: 600;
    font-size: max(2rem, 14px);
  }
  &__container {
    margin-top: max(2rem, 12px);
    display: grid;
    row-gap: max(3.2rem, 16px);
    column-gap: max(2rem, 16px);
    grid-template-columns: 1.241fr 1fr;
    @media screen and (max-width: vars.$bp-large-mobile) {
      grid-template-columns: 1fr;
    }
  }
  &__plan {
    &-box {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: max(1.6rem, 16px);
      border-radius: max(1.2rem, 12px);
    }
    &-detail {
      padding-block: max(1.8rem, 14px);
      padding-inline: max(1.6rem, 16px);
      font-size: max(1.4rem, 14px);
      @media screen and (max-width: vars.$bp-small-mobile) {
        padding-inline: 21px;
      }
    }
    &-image {
      align-self: center;
      @media screen and (min-width: vars.$bp-large-mobile) {
        max-width: 58%;
      }
    }
    &-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(279px, 1fr));
      row-gap: max(1.6rem, 4px);
      column-gap: max(0.8rem, 4px);
    }
  }
  &__header {
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
</style>
