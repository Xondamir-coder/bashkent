<template>
  <button class="colored-button" :class="`colored-button--${color}`">
    <div class="colored-button__box">
      <div class="colored-button__icon">
        <slot />
      </div>
    </div>
    <span>{{ text }}</span>
  </button>
</template>

<script setup>
defineProps({
  color: {
    required: true,
    type: String
  },
  text: {
    required: true,
    type: String
  }
});
</script>

<style lang="scss" scoped>
.colored-button {
  display: flex;
  align-items: center;
  gap: max(1rem, 10px);
  font-weight: 500;
  text-wrap: nowrap;
  font-size: max(1.4rem, 14px);
  animation: slide-from-right-20 0.5s backwards;
  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      animation-delay: $i * 0.1s;
    }
  }

  &--teal {
    &:hover {
      color: vars.$teal;
      .colored-button__icon {
        fill: vars.$teal;
      }
    }
    .colored-button__box {
      background-color: vars.$teal;
    }
  }
  &--gold {
    &:hover {
      color: vars.$gold;
      .colored-button__icon {
        fill: vars.$gold;
      }
    }
    .colored-button__box {
      background-color: vars.$gold;
    }
  }
  &--orange {
    &:hover {
      color: vars.$orange;
      .colored-button__icon {
        fill: vars.$orange;
      }
    }
    .colored-button__box {
      background-color: vars.$orange;
    }
  }
  &:hover {
    .colored-button__box {
      background-color: #fff;
    }
  }
  &__box {
    width: max(3.8rem, 38px);
    height: max(3.8rem, 38px);
    border-radius: 50%;
    transition: background-color vars.$dt;
    @include mix.flex-center;
  }
  &__icon {
    width: 47.4%;
    fill: #fff;
    transition: fill vars.$dt;
    display: flex;
  }
}
</style>
