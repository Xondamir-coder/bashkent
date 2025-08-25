<template>
  <div class="contacts-modal__container" @click.self="emits('toggle-modal')">
    <div class="contacts-modal">
      <SvgFadingPattern class="contacts-modal__pattern" />
      <button class="contacts-modal__close" @click="emits('toggle-modal')">
        <SvgClose />
      </button>
      <h3 class="contacts-modal__title">Ответим на все вопросы</h3>
      <form class="contacts-modal__form" @submit.prevent="submitForm">
        <FormInput
          id="name-field"
          v-model="userData.name"
          placeholder="Имя"
          type="text"
          required
          @input="sanitizeName"
        />
        <FormInput
          id="tel-field"
          v-model="userData.tel"
          placeholder="Номер телефона"
          type="tel"
          required
        />
        <FormInput
          id="comment-field"
          v-model="userData.comment"
          placeholder="Комментарий"
          :is-text-area="true"
          required
        />
        <div class="contacts-modal__form-bottom">
          <button class="contacts-modal__button">Отправить</button>
          <p>Я даю согласие на обработку персональных данных</p>
        </div>
      </form>
      <div class="contacts-modal__info">
        <img src="~/assets/images/man.jpg" alt="man" class="contacts-modal__image" >
        <p>Rуководитель отдела продаж Сергей Обозный</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const userData = ref({
  name: '',
  tel: '',
  comment: ''
});
const emits = defineEmits(['toggle-modal']);

const submitForm = () => {
  console.log(userData.value);
};
const sanitizeName = () => {
  userData.value.name = userData.value.name.replace(/\d+/g, '');
};
</script>

<style lang="scss" scoped>
.contacts-modal {
  max-width: max(36.11111%, 450px);
  background-color: vars.$light-grey;
  padding: max(2.4rem, 24px);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  transition: all 0.7s;
  position: relative;
  &__pattern {
    position: absolute;
    bottom: max(2.4rem, 24px);
    left: 0;
    @media screen and (min-width: vars.$bp-ipad-pro) and (max-height: 770px) {
      display: none;
    }
  }
  &__image {
    border-radius: 50%;
    width: max(5.6rem, 48px);
    height: max(5.6rem, 48px);
  }
  &__button {
    padding-block: max(1.9rem, 15px);
    font-weight: 500;
    background-color: vars.$teal;
    border-radius: max(1.2rem, 8px);
    color: #fff;
    @media screen and (max-width: vars.$bp-small-mobile) {
      max-width: 207px;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: max(1.6rem, 12px);
    &-bottom {
      display: flex;
      align-items: center;
      gap: inherit;
      @media screen and (max-width: vars.$bp-small-mobile) {
        flex-direction: column;
        align-items: stretch;
      }
      p {
        color: vars.$darker-grey;
        font-size: max(1.4rem, 12px);
      }
      & > * {
        flex: 1;
      }
    }
  }
  &__info {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: max(1.6rem, 16px);
    p {
      font-size: max(1.4rem, 14px);
      max-width: 25ch;
    }
  }
  &__title {
    max-width: 12ch;
    font-weight: bold;
    font-size: max(2.8rem, 28px);
    font-family: vars.$font-angst;
  }
  &__close {
    fill: vars.$black-medium;
    width: max(2.4rem, 24px);
    transition: transform vars.$dt;
    display: flex;
    align-self: flex-end;
    &:hover {
      transform: scale(1.1);
    }
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__container {
    background-color: rgba(#033b36, 0.3);
    position: fixed;
    inset: 0;
    width: 100dvw;
    height: 100dvh;
    z-index: 100;
    overflow-y: auto;
    display: grid;
    justify-items: flex-end;
  }
}
</style>
