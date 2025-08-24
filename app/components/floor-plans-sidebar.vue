<template>
  <div class="sidebar">
    <button class="sidebar__button">
      <span>Фильтры</span>
      <SvgFilter class="sidebar__button-icon" />
    </button>
    <div class="sidebar__top">
      <span class="sidebar__label">Фильтры</span>
      <button @click="resetFilters">Сбросить фильтры</button>
    </div>
    <form class="sidebar__form" @submit.prevent="submitForm">
      <div class="sidebar__form-row">
        <span class="sidebar__form-label">Этаж</span>
        <div class="sidebar__form-box">
          <div class="sidebar__form-select sidebar__form-style">
            <span>1</span>
            <SvgKeyboardArrowLeft class="sidebar__form-arrow" />
          </div>
        </div>
      </div>
      <div class="sidebar__form-row">
        <span class="sidebar__form-label">Тип планировки</span>
        <div class="sidebar__form-box">
          <div class="sidebar__form-select sidebar__form-style">
            <span>Студия</span>
            <SvgKeyboardArrowLeft class="sidebar__form-arrow" />
          </div>
        </div>
      </div>
      <div class="sidebar__form-row">
        <span class="sidebar__form-label">Площадь - м²</span>
        <div class="sidebar__form-rangebox">
          <div class="sidebar__form-style">
            <input
              id="area-ffrom"
              type="number"
              name="area"
              class="sidebar__form-input"
              placeholder="от"
            />
            <span>м²</span>
          </div>
          <div class="sidebar__form-style">
            <input
              id="area-to"
              type="number"
              name="area"
              class="sidebar__form-input"
              placeholder="до"
            />
            <span>м²</span>
          </div>
        </div>
      </div>
      <div class="sidebar__form-row">
        <span class="sidebar__form-label">Кол-во комнат</span>
        <div class="sidebar__form-numbers sidebar__form-style">
          <button
            v-for="number in 4"
            :key="number"
            class="sidebar__form-number"
            :class="{ active: number === selectedNumber }"
            @click="changeNumber(number)"
          >
            {{ number }}
          </button>
        </div>
      </div>
      <div class="sidebar__form-row">
        <span class="sidebar__form-label">Тип жилья</span>
        <div class="sidebar__form-box">
          <div class="sidebar__form-select sidebar__form-style">
            <span>С ремонтом</span>
            <SvgKeyboardArrowLeft class="sidebar__form-arrow" />
          </div>
        </div>
      </div>
      <div class="sidebar__form-row">
        <span class="sidebar__form-label">Срок сдачи</span>
        <div class="sidebar__form-box">
          <div class="sidebar__form-select sidebar__form-style">
            <span>2025</span>
            <SvgKeyboardArrowLeft class="sidebar__form-arrow" />
          </div>
        </div>
      </div>
    </form>
    <button class="sidebar__submit" @click="submitForm">Подбор</button>
  </div>
</template>

<script setup>
const selectedNumber = ref(1);

const submitForm = () => {
  console.log(selectedNumber.value);
};
const changeNumber = number => {
  selectedNumber.value = number;
};
const resetFilters = () => {
  selectedNumber.value = 1;
};
</script>

<style lang="scss" scoped>
.sidebar {
  align-self: flex-start;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 700px) {
    gap: max(2.4rem, 16px);
    background-color: vars.$near-white;
    padding-inline: max(2rem, 16px);
    padding-block: max(2.4rem, 20px);
    border-radius: max(2rem, 18px);
    min-width: 300px;
  }
  @media screen and (max-width: 700px) {
    & > *:not(.sidebar__button) {
      display: none;
    }
  }
  &__button {
    padding-inline: max(2rem, 11.5px);
    padding-block: max(2.4rem, 16px);
    border-radius: max(2rem, 8px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: vars.$near-white;
    @media screen and (min-width: 700px) {
      display: none;
    }
    &:hover {
      background-color: vars.$light-grey;
    }
    &-icon {
      width: max(2.4rem, 24px);
    }
  }
  &__label {
    font-weight: bold;
    font-size: max(2rem, 14px);
  }
  &__submit {
    padding-block: max(1.7rem, 14px);
    background-color: vars.$teal;
    color: #fff;
    border-radius: max(1.2rem, 10px);
    &:hover {
      background-color: vars.$teal-dark;
    }
  }
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      color: vars.$darker-grey;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: max(1.6rem, 12px);

    &-style {
      padding: max(1.6rem, 14px);
      background-color: #fff;
      border-radius: max(1.2rem, 10px);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-numbers {
      display: flex;
      gap: 1.5rem;
      padding-block: max(1rem, 8px);
    }
    &-divider {
      width: 1px;
      background-color: #d6d7d7;
      height: 100%;
    }
    &-number {
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
    &-rangebox {
      gap: max(1rem, 8px);
      display: flex;
      & > * {
        flex: 1;
      }
    }
    &-row {
      display: flex;
      flex-direction: column;
      gap: max(1.2rem, 10px);
    }
    &-arrow {
      width: max(2.4rem, 24px);
      transform: rotate(-90deg);
    }
    &-label {
      align-self: flex-start;
    }
  }
}
</style>
