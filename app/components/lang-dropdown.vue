<template>
  <Transition name="fade">
    <div v-if="model" class="lang-dropdown">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        class="lang-dropdown__item"
        :class="{ active: button.code === $i18n.locale }"
        @click="changeLang(button.code)"
      >
        <component :is="button.flag" class="lang-dropdown__item-icon" />
        <span class="lang-dropdown__item-text">{{ button.text }}</span>
        <SvgCheck class="lang-dropdown__item-check" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { SvgFlagEn, SvgFlagRu, SvgFlagUz } from '#components';

const { setLocale } = useI18n();
const model = defineModel({
  type: Boolean
});

const changeLang = code => {
  setLocale(code);
  model.value = false;
};

const buttons = [
  {
    flag: SvgFlagRu,
    text: 'Русский',
    code: 'ru'
  },
  {
    flag: SvgFlagUz,
    text: 'Oʻzbekcha',
    code: 'uz'
  },
  {
    flag: SvgFlagEn,
    text: 'English',
    code: 'en'
  }
];

onMounted(() => {
  document.addEventListener('click', e => {
    const { target } = e;
    const langDropdown = target.closest('[data-lang-dropdown]');

    if (langDropdown) return;
    model.value = false;
  });
});
</script>

<style lang="scss" scoped>
.lang-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 50px 0px #00000033;
  border-radius: max(0.8rem, 8px);
  overflow: hidden;
  border: 1px solid #f0f0f0;
  background-color: #fff;
  &__item {
    gap: max(1rem, 10px);
    padding-block: max(1.3rem, 13px);
    padding-inline: max(1.6rem, 16px);
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: center;
    &:not(.active):hover {
      transform: translateX(5px);
    }
    &.active {
      background-color: #f7f7f7;
      color: vars.$teal;
      .lang-dropdown__item-check {
        transform: scale(1);
      }
    }
    &-text {
      font-weight: 500;
      text-align: left;
      font-size: max(1.4rem, 14px);
    }
    &-check {
      width: max(2rem, 20px);
      transform: scale(0);
    }
    &-icon {
      width: max(2.4rem, 24px);
      border-radius: 6px;
    }
  }
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
}
</style>
