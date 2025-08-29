<template>
  <main class="apartments">
    <div class="apartments__top">
      <AppBreadcrumbs :crumbs="crumbs" />
      <h1 class="heading-large apartments__title">Планировки</h1>
    </div>
    <div class="apartments__container">
      <NuxtPicture src="/images/apts.png" alt="apartments banner" class="apartments__banner" />
      <div class="apartments__numbers">
        <button
          v-for="number in 10"
          :key="number"
          class="apartments__number"
          :class="{ active: number - 1 === currentPage }"
        >
          {{ number }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const crumbs = computed(() => [
  {
    name: 'Plans',
    path: '/apartments'
  },
  {
    name: 'Plans',
    path: '/apartments'
  }
]);

const currentPage = ref(0);

onMounted(() => {
  SplitText.create('.apartments__title', {
    type: 'chars',
    mask: 'chars',
    onSplit: self => {
      gsap.from(self.chars, {
        yPercent: 100,
        xPercent: -100,
        stagger: 0.025,
        ease: 'power2.out'
      });
    }
  });
});

useHead({
  title: 'Apartments'
});
definePageMeta({
  layout: 'only-header'
});
</script>

<style lang="scss" scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    scale: 1.05;
  }
}
.apartments {
  padding-top: calc(var(--header-height) + max(3.2rem, 20px));
  padding-inline: var(--block-spacing);
  padding-bottom: var(--block-spacing);
  display: flex;
  flex-direction: column;
  gap: max(4.7rem, 26px);
  &__container {
    display: flex;
    gap: max(4.4rem, 25px);
    overflow: hidden;
    @media screen and (max-width: 700px) {
      flex: 1;
    }
  }
  &__numbers {
    display: flex;
    flex-direction: column;
    gap: max(1.4rem, 14px);
  }
  &__banner {
    animation: scale-in 1s backwards 0.2s;
    align-self: center;
    @media screen and (max-width: 700px) {
      transform: rotate(90deg);
      align-self: flex-start;
      margin-top: 27%;
    }
  }
  &__number {
    font-weight: bold;
    font-size: max(1.8rem, 18px);
    border-radius: 50%;
    padding: 6px;
    border: 1px solid #d6d7d7;
    width: max(3.6rem, 36px);
    height: max(3.6rem, 36px);
    animation: slide-from-bottom-20 0.5s backwards;
    @include mix.flex-center;
    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 0.05s + 0.3s;
      }
    }
    &.active {
      background-color: vars.$gold;
      color: #fff;
      border-color: vars.$gold;
    }
  }
  &__top {
    display: flex;
    flex-direction: column;
    gap: max(1.4rem, 12px);
  }
}
</style>
