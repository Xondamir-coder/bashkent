<template>
  <div class="result calculator-box">
    <h2 class="result__title">Результаты расчета</h2>
    <ul class="result__list">
      <li v-for="(item, i) in items" :key="i" class="result__item">
        <div class="result__item-header">
          <h3 class="result__item-header-title">{{ item.title }}</h3>
          <p class="result__item-label">{{ item.desc }}</p>
        </div>
        <div class="result__item-top">
          <span class="result__item-label">Стоимость квартиры</span>
          <span class="result__item-top-price">{{ item.price }}</span>
        </div>
        <div class="result__item-content">
          <span class="result__item-label">в том числе:</span>
          <ul class="result__item-list">
            <DetailsItem v-for="(detail, index) in item.details" :key="index" :detail />
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const items = computed(() => [
  {
    title: 'Классическая рассрочка',
    desc: 'Простая и понятная схема',
    price: '712 286 080 сум',
    details: [
      {
        name: 'Скидка',
        value: '97 129 920 сум'
      },
      {
        name: 'Первоначальный взнос',
        value: '213 685 824 сум'
      },
      {
        name: 'Ежемесячно (19 мес.)',
        value: '26 242 119 сум'
      },
      {
        name: 'Сумма выплат по графику',
        value: '26 242 119 сум'
      },
      {
        name: 'Остаточный платеж',
        value: '-'
      },
      {
        name: 'Цена за 1м²',
        value: '26 242 119 сум'
      }
    ]
  },
  {
    title: 'Классическая рассрочка',
    desc: 'Простая и понятная схема',
    price: '712 286 080 сум',
    details: [
      {
        name: 'Скидка',
        value: '97 129 920 сум'
      },
      {
        name: 'Первоначальный взнос',
        value: '213 685 824 сум'
      },
      {
        name: 'Ежемесячно (19 мес.)',
        value: '26 242 119 сум'
      },
      {
        name: 'Сумма выплат по графику',
        value: '26 242 119 сум'
      }
    ]
  },
  {
    title: 'Классическая рассрочка',
    desc: 'Простая и понятная схема',
    price: '712 286 080 сум',
    details: [
      {
        name: 'Скидка',
        value: '97 129 920 сум'
      },
      {
        name: 'Первоначальный взнос',
        value: '213 685 824 сум'
      }
    ]
  }
]);
</script>

<style lang="scss" scoped>
.result {
  margin-top: max(4.4rem, 20px);
  &__title {
    align-self: center;
    font-weight: 6 00;
    font-size: max(2.4rem, 14px);
    line-height: 145%;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    align-items: flex-start;
    gap: max(1.6rem, 16px);
  }
  &__item {
    background-color: #fff;
    padding-block: max(2rem, 16px);
    border-radius: max(1.2rem, 12px);
    display: flex;
    flex-direction: column;
    gap: max(3.2rem, 24px);
    &-list {
      display: flex;
      flex-direction: column;
      gap: max(0.8rem, 8px);
      & > * {
        padding-block: max(1.7rem, 14px);
        padding-inline: max(1.6rem, 12px);
        font-size: max(1.4rem, 14px);
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      gap: max(1.2rem, 12px);
      & > span {
        align-self: center;
      }
      @media screen and (max-width: vars.$bp-small-mobile) {
        gap: 16px;
      }
    }
    &-top {
      align-self: center;
      display: flex;
      flex-direction: column;
      gap: max(0.4rem, 4px);
      align-items: center;
      text-align: center;
      &-price {
        font-family: vars.$font-gothic-a1;
        font-weight: 800;
        font-size: max(2.4rem, 20px);
        line-height: 145%;
      }
    }
    &-label {
      font-size: max(1.4rem, 12px);
    }
    &-header {
      display: flex;
      flex-direction: column;
      gap: max(0.4rem, 4px);
      padding-bottom: max(2rem, 16px);
      border-bottom: 1px solid #d6d7d7;
      &-title {
        font-weight: 900;
        font-size: max(1.8rem, 16px);
      }
    }
    & > * {
      padding-inline: max(2rem, 16px);
    }
  }
}
</style>
