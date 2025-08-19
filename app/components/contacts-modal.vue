<template>
  <div class="contacts-modal__container" @click.self="emits('toggle-modal')">
    <div class="contacts-modal">
      <div class="contacts-modal__header">
        <h3 class="contacts-modal__title">Ответим на все вопросы</h3>
        <button @click="emits('toggle-modal')">
          <SvgClose class="contacts-modal__close" />
        </button>
      </div>
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
        <div class="contacts-modal__form-bottom">
          <button class="contacts-modal__button">Отправить</button>
          <p>Я даю согласие на обработку персональных данных</p>
        </div>
      </form>
      <div class="contacts-modal__info">
        <img src="~/assets/images/man.jpg" alt="man" class="contacts-modal__image" />
        <p>Rуководитель отдела продаж Сергей Обозный</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const userData = ref({
  name: '',
  tel: ''
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
  min-width: 36.11111%;
  background-color: vars.$light-grey;
  border-radius: 1.2rem;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  aspect-ratio: 520/480;
  animation: slide-from-bottom-50 vars.$dt backwards;
  transition: transform vars.$dt;

  &__image {
    border-radius: 50%;
    width: 5.6rem;
    height: 5.6rem;
    object-fit: cover;
  }
  &__button {
    padding-block: 1.9rem;
    font-weight: 500;
    background-color: vars.$teal;
    border-radius: 1.2rem;
    color: #fff;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    &-bottom {
      display: flex;
      align-items: center;
      gap: inherit;
      p {
        color: vars.$darker-grey;
        font-size: 1.4rem;
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
    gap: 1.6rem;
    p {
      font-size: 1.4rem;
      max-width: 25ch;
    }
  }
  &__title {
    font-family: vars.$font-gothic-a1;
    font-weight: 800;
    font-size: 2.8rem;
  }
  &__close {
    fill: vars.$black-medium;
    width: 2.4rem;
    transition: transform vars.$dt;
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
    display: grid;
    align-items: flex-end;
    justify-items: flex-start;
    padding-block: 2.4rem;
    padding-left: 9.4rem;
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    overflow-y: auto;
  }
}
</style>
