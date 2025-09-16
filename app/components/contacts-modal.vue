<template>
  <Transition name="slide-in">
    <div
      v-if="showContactsModal"
      class="contacts-modal__container"
      @click.self="toggleContactsModal"
    >
      <div class="contacts-modal">
        <SvgFadingPattern class="contacts-modal__pattern" />
        <button class="contacts-modal__close" @click="toggleContactsModal">
          <SvgClose />
        </button>
        <h3 class="contacts-modal__title">{{ $t('modal.title') }}</h3>
        <form class="contacts-modal__form" @submit.prevent="submitForm">
          <FormInput
            id="name-field"
            v-model="userData.name"
            :placeholder="$t('modal.form.name')"
            type="text"
            required
            @input="sanitizeName"
          />
          <FormInput
            id="tel-field"
            v-model="userData.tel"
            :placeholder="$t('modal.form.phone')"
            type="tel"
            maxlength="17"
            required
            @click="prependCountry"
            @focus="prependCountry"
            @input="validateInput"
          />
          <FormInput
            id="comment-field"
            v-model="userData.comment"
            :placeholder="$t('modal.form.message')"
            :is-text-area="true"
            required
          />
          <div class="contacts-modal__form-bottom">
            <button class="contacts-modal__button" :disabled="isLoading || !isFormValid">
              <span v-if="!isLoading && !successMessage"> {{ $t('modal.form.submit') }}</span>
              <span v-else-if="isLoading">{{ $t('modal.form.loading') }}</span>
              <span v-else-if="successMessage">{{ successMessage }}</span>
            </button>
            <p>{{ $t('modal.form.copyright') }}</p>
          </div>
        </form>
        <div class="contacts-modal__info">
          <img src="~/assets/images/man.jpg" alt="man" class="contacts-modal__image" />
          <p>{{ $t('modal.form.author') }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { locale } = useI18n();

const showContactsModal = ref(false);
const isLoading = ref(false);
const successMessage = ref('');
const userData = ref({
  name: '',
  tel: '',
  comment: ''
});
const isFormValid = computed(
  () => userData.value.name && userData.value.tel.length === 17 && userData.value.comment
);

const toggleContactsModal = () => {
  showContactsModal.value = !showContactsModal.value;
};

const COUNTRY_CODE = '+998 ';
const LENGTHS_WITH_SPACE = [7, 11, 14];

const prependCountry = () =>
  userData.value.tel.includes(COUNTRY_CODE) || (userData.value.tel = COUNTRY_CODE);
const validateInput = e => {
  // Validate
  const regex = /^[\d\s+]+$/;
  if (!regex.test(userData.value.tel)) {
    userData.value.tel = userData.value.tel.slice(0, -1);
  }

  // Always prepend country
  if (userData.value.tel.length < COUNTRY_CODE.length) {
    userData.value.tel = COUNTRY_CODE;
  }

  // Don't add space on deletion
  if (e.inputType === 'deleteContentBackward') {
    return;
  }

  // Add spaces
  if (LENGTHS_WITH_SPACE.includes(userData.value.tel.length)) {
    userData.value.tel = `${userData.value.tel} `;
  }
};
const submitForm = async () => {
  const url = 'https://api.projectview.uz/api/front/enquiry';
  const strippedPhone = userData.value.tel.replace(/\s|\+/g, '');
  try {
    isLoading.value = true;
    const res = await $fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: objectToFormData({
        name: userData.value.name,
        phone: strippedPhone,
        comment: userData.value.comment
      })
    });
    successMessage.value = res.message[locale.value];
  } catch (error) {
    console.error(error);
  } finally {
    userData.value.comment = '';
    userData.value.name = '';
    userData.value.tel = '';
    isLoading.value = false;
    setTimeout(() => {
      successMessage.value = '';
      toggleContactsModal();
    }, 1000);
  }
};
const sanitizeName = () => {
  userData.value.name = userData.value.name.replace(/\d+/g, '');
};
</script>

<style lang="scss" scoped>
.contacts-modal {
  width: 100%;
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
    &:disabled {
      opacity: 0.5;
    }
    &:not(:disabled):hover {
      background-color: vars.$teal-dark;
    }
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
    max-width: 15ch;
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
.slide-in-enter-active,
.slide-in-leave-active {
  transition: opacity 0.5s;
}
.slide-in-enter-from,
.slide-in-leave-to {
  opacity: 0;
}
.slide-in-enter-from > *,
.slide-in-leave-to > * {
  transform: translateX(20%);
  opacity: 0;
}
</style>
