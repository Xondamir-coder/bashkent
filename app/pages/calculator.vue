<template>
  <main class="calculator">
    <AppBreadcrumbs :crumbs />
    <div class="calculator__header">
      <h1 class="heading-large">{{ $t('calculator.label') }}</h1>
      <span>{{ $t('calculator.text') }}</span>
    </div>
    <ClientOnly>
      <Transition name="slide-in">
        <div v-if="group" class="calculator__container">
          <div class="calculator__plan calculator-box">
            <span class="calculator__label">{{ $t('calculator.desired-layout') }}</span>
            <CalculatorDropdown v-model="selectedApartment" :apartments />
            <div class="calculator__plan-box">
              <img
                :src="`${DOMAIN_URL}/${selectedApartment?.image}`"
                alt="apartment"
                class="calculator__plan-image"
              >
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
              v-model="floorNumber"
              :label="$t('floor')"
              :options="countdownArray(12).reverse()"
              :is-from-api="false"
            />
            <FilterRow type="numbers" :label="$t('deadline')">
              <div class="filter-form__numbers filter-item">
                <button
                  v-for="date in dates"
                  :key="date"
                  type="button"
                  class="filter-form__number"
                  :class="{ active: date === deadline }"
                  @click="deadline = date"
                >
                  {{ date }}
                </button>
              </div>
            </FilterRow>
            <FilterRow type="numbers" :label="$t('pre-payment')">
              <RangeSlider v-model="prePayment" :steps="[20, 30, 40, 50, 75, 100]" />
            </FilterRow>
            <div class="calculator__params-bottom">
              <span
                >{{ $t('calculator.discount') }}:
                <span class="clr-teal">{{ discount }}%</span></span
              >
              <span>{{ $t('calculator.included') }}</span>
            </div>
          </div>
          <button class="calculator__button" @click="calculateResults">
            {{ $t('calculator.calculate-price') }}
          </button>
        </div>
      </Transition>
      <Transition name="slide-in">
        <CalculatorResult v-if="showResults" :results />
      </Transition>
      <Transition name="slide-in">
        <div v-if="group" class="calculator__bottom">
          <ColoredButton color="teal" :text="$t('print')" @click="printPage">
            <SvgPrint />
          </ColoredButton>
          <ColoredButton color="orange" :text="$t('download-pdf')" @click="downloadPDF">
            <SvgArticle />
          </ColoredButton>
          <ColoredButton color="teal" :text="$t('share')" @click="sharePage">
            <SvgShare />
          </ColoredButton>
          <ColoredButton color="gold" :text="$t('leave-enquiry')" @click="showContactsModal = true">
            <SvgCall />
          </ColoredButton>
        </div>
      </Transition>
    </ClientOnly>
  </main>
</template>

<script setup>
import { SvgPercentage, SvgRuler, SvgDiscount } from '#components';
import table from '~/assets/data/table.json';

const { t, locale } = useI18n();
const { FRONT_API_URL, filters } = useAppState();
const { query } = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const showContactsModal = useState('showContactsModal');

// Dates considering next 3 years
const dates = computed(() => {
  const nextYear = new Date().getFullYear() + 1;
  return Array.from({ length: 3 }, (_, i) => nextYear + i);
});

// API fetched data
const group = ref();
const selectedApartment = ref();

// Show results
const showResults = ref(Boolean(query.show_results) || false);
let isMounted = false;

// Filters
const prePayment = ref(+query.pre_payment || 20);
const deadline = ref(+query.deadline || dates.value[0]);
const floorNumber = useState('floorNumber', () => +query.floor || 1);

// Computed vals
const discount = computed(
  () => table[selectedApartment.value?.rooms_number]?.discountRates[`${prePayment.value}%`]
);
const planDetails = computed(() => [
  {
    key: t('just-area'),
    val: `${selectedApartment.value?.area} ${t('m-squared')}`
  },
  {
    key: t('rooms'),
    val: selectedApartment.value?.rooms_number
  },
  {
    key: t('type'),
    val: selectedApartment.value?.buildingTypeName
  },
  {
    key: t('condition'),
    val: filters.value?.conditions.find(c => c.id === selectedApartment.value?.condition_id)?.[
      `name_${locale.value}`
    ]
  }
]);
const apartments = computed(() =>
  group.value?.flatMap(g =>
    g.floors[0].apartments.map(a => ({
      ...a,
      buildingTypeName: g.building_type[`name_${locale.value}`]
    }))
  )
);
const results = computed(() => {
  const basePrice = selectedApartment.value?.price;
  const discountVal = (discount.value / 100) * selectedApartment.value?.price;
  const discountedPrice = basePrice - discountVal;
  const paymentPerSquare = Math.round(discountedPrice / selectedApartment.value?.area);

  return [
    {
      key: t('calculator.your-discount-x', { x: discount.value }),
      val: discountVal,
      icon: SvgPercentage
    },
    {
      key: t('calculator.price-with-discount'),
      val: discountedPrice,
      icon: SvgDiscount
    },
    {
      key: t('calculator.price-per-m2'),
      val: paymentPerSquare,
      icon: SvgRuler
    }
  ];
});
const newParams = computed(() => ({
  path: localePath('/calculator'),
  query: {
    id: selectedApartment.value?.id,
    pre_payment: prePayment.value,
    deadline: deadline.value,
    floor: floorNumber.value,
    show_results: showResults.value
  }
}));
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

// Watchers
watch(floorNumber, () => {
  fetchGroup();
});
watch([selectedApartment, prePayment, deadline, floorNumber], () => {
  router.replace(newParams.value);

  // Close results when changing filters
  if (showResults.value && isMounted) {
    showResults.value = false;
  }

  isMounted = true;
});

// Functions
const printPage = () => {
  window.print();
};
const downloadPDF = () => {
  window.print();
};
const sharePage = () => {
  if (navigator.share) {
    navigator
      .share({
        title: document.title,
        text: document.description,
        url: window.location.href
      })
      .then(() => console.log('Page shared successfully'))
      .catch(err => console.warn('Share canceled or failed', err));
  } else {
    // Fallback for unsupported browsers
    const fullUrl = url || window.location.href;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Your browser does not support sharing.'));
  }
};
const calculateResults = () => {
  showResults.value = true;
  router.replace(newParams.value);
};
const fetchGroup = async (isMounted = false) => {
  try {
    if (isMounted) {
      const { data } = await useFetch(`${FRONT_API_URL}/group`, {
        query: { floor_number: floorNumber.value }
      });
      group.value = data.value;
      selectedApartment.value = query.id
        ? apartments.value?.find(a => a.id === +query.id)
        : apartments.value?.[0];
    } else {
      const res = await $fetch(`${FRONT_API_URL}/group`, {
        query: { floor_number: floorNumber.value }
      });
      group.value = res;
      selectedApartment.value = apartments.value?.[0];
    }
  } catch (error) {
    console.log(error);
  }
};
fetchGroup(true);

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
  @media print {
    padding-inline: 0;
    padding-top: 0;
  }
  &__bottom {
    display: flex;
    margin-top: max(1.6rem, 4px);
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
    gap: max(6rem, 20px);
    flex-wrap: wrap;
    @media print {
      display: none;
    }
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
    grid-template-columns: 1.06fr 1fr;
    @media print {
      // grid-template-columns: 1fr;
    }
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
      gap: 10px;
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
    @media print {
      display: none;
    }
    span {
      font-weight: 500;
      font-size: max(1.4rem, 14px);
      color: vars.$darker-grey;
    }
  }
}
.filter-form {
  &__numbers {
    display: flex;
    gap: 1.5rem;
    padding-block: max(1rem, 8px);
  }
  &__divider {
    width: 1px;
    background-color: #d6d7d7;
    height: 100%;
  }
  &__number {
    flex: 1;
    padding-block: max(0.8rem, 8px);
    border-radius: max(0.6rem, 6px);
    position: relative;
    @include mix.flex-center;
    &:not(:last-child) {
      margin-right: 1.5rem;
      &::after {
        content: '';
        width: 1px;
        height: 100%;
        background-color: #d6d7d7;
        right: -1.5rem;
        top: 0;
        position: absolute;
      }
    }
    &.active {
      background-color: vars.$teal;
      color: #fff;
    }
  }
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: opacity 0.5s;
}
.slide-in-enter-from,
.slide-in-leave-to {
  opacity: 0;
}
</style>
