<template>
  <div class="menu">
    <div class="menu__top">
      <h2 class="heading-large">Меню</h2>
      <nav class="menu__nav">
        <NuxtLink to="/" class="menu__link" active-class="active">Главная</NuxtLink>
        <NuxtLink to="/infrastructure" class="menu__link" active-class="active"
          >Инфраструктура</NuxtLink
        >
        <NuxtLink to="/plans" class="menu__link" active-class="active">Планировки</NuxtLink>
        <NuxtLink to="/catalog" class="menu__link" active-class="active">Каталог</NuxtLink>
        <NuxtLink to="/contacts" class="menu__link" active-class="active">Контакты</NuxtLink>
      </nav>
    </div>
    <div class="menu__bottom">
      <div class="menu__bottom-header">
        <h3 class="menu__subtitle">SOTUV OFISI</h3>
        <p>
          100073, O‘zbekiston, Toshkent shahri, <br />
          Yashnobod tumani, Jarqo‘rg‘on ko‘chasi, 47
        </p>
        <p>Dushanba-Yakshanba: 9:00 dan 19:00 gacha</p>
      </div>
      <div class="menu__list">
        <a class="menu__item" href="https://maps.app.goo.gl/jJozY1KSuyT9hoWu8" target="_blank">
          <SvgPin class="menu__item-icon" />
          <span>Адрес:</span>
          <span>г. Бухара,</span>
        </a>
        <a class="menu__item" href="tel:+998 78 148 55 55">
          <SvgCallEnd class="menu__item-icon" />
          <span>Телефон:</span>
          <span>(78) 148-55-55</span>
        </a>
        <a class="menu__item" href="https://t.me/bashkent_residence">
          <SvgTelegram class="menu__item-icon" />
          <span>Telegram:</span>
          <span>@bashkent_residence</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SvgCallEnd, SvgTelegram } from '#components';
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  left: 0;
  top: 0;
  background: #012320cc;
  backdrop-filter: blur(10px);
  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  color: #fff;
  padding-block: 3.2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10rem;
  min-width: 45%;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
  padding-left: 7%;
  padding-right: 4.3rem;
  z-index: 15;
  h2,
  .menu__link,
  .menu__bottom {
    padding-left: 3.2rem;
  }
  &__subtitle {
    font-family: vars.$font-angst;
    font-size: 3.2rem;
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    &-header {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
  &__nav {
    display: flex;
    flex-direction: column;
  }
  &__item {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding-block: 1.7rem;
    border-top: 1px solid #ffffff1f;
    border-bottom: 1px solid #ffffff1f;
    span {
      &:last-of-type {
        margin-left: auto;
      }
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
  }
  &__link {
    font-size: 2rem;
    font-family: vars.$font-gothic-a1;
    font-weight: 800;
    padding-block: 1.8rem;
    position: relative;
    &::before {
      content: '';
      left: 0;
      top: 0;
      position: absolute;
      width: 2px;
      height: 100%;
      background-color: vars.$teal-light;
      transition: transform vars.$dt;
      transform: scaleY(0);
      transform-origin: bottom;
    }
    &.active {
      background: linear-gradient(90deg, rgba(39, 162, 154, 0) 0%, rgba(39, 162, 154, 0.2) 100%);
      &::before {
        transform: scaleY(1);
      }
    }
  }
  &__item {
    &-icon {
      width: 2.4rem;
    }
  }
}
</style>
