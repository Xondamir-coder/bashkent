<template>
  <button class="ham__container" :class="{ active: showMenu }">
    <div class="ham">
      <div class="ham__bar" />
    </div>
    <span class="ham__text">Меню</span>
  </button>
</template>

<script setup>
defineProps({
  showMenu: Boolean
});
</script>

<style lang="scss" scoped>
.ham {
  position: relative;
  width: max(2.4rem, 24px);
  height: max(2.4rem, 24px);
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: max(1.2rem, 8px);
    padding: max(1.2rem, 5px);
    transition: letter-spacing vars.$dt;
    &:not(.active):hover {
      letter-spacing: 4px;
      .ham {
        &::before {
          transform-origin: right;
        }
        &::after {
          transform-origin: left;
        }
      }
    }
    &.active {
      .ham {
        &::before {
          top: 50%;
          left: 50%;
          transform: scaleX(1) rotate(45deg) translate(-50%, -50%);
        }
        &::after {
          bottom: 50%;
          right: 50%;
          transform: scaleX(1) rotate(-45deg) translate(50%, 50%);
        }
      }
      .ham__bar {
        opacity: 0;
      }
    }
  }
  &__text {
    color: #fff;
    font-weight: 500;
    line-height: 135%;
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  &::before {
    top: 22%;
    left: 0;
    transform: scaleX(0.667);
    transform-origin: top left;
  }
  &::after {
    bottom: 22%;
    right: 0;
    transform: scaleX(0.71);
    transform-origin: bottom right;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    background-color: #fff;
    transition: all vars.$dt;
    width: 100%;
  }
  &__bar {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transform: translateY(-50%);
    transition: opacity vars.$dt;
  }
}
</style>
