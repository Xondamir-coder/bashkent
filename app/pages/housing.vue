<template>
  <main ref="containerRef" class="housing">
    <div class="housing__box">
      <div>Естественное освещение и вентиляция</div>
    </div>
    <div class="housing__box">
      <div>Возможность выбора этажности и вида</div>
    </div>
    <div class="housing__box">
      <div>Эргономичная кухня, балконы, гардеробные</div>
    </div>
    <div class="housing__box">
      <div>Готовность к ремонту / готовый ремонт</div>
    </div>
    <NuxtPicture src="/images/housing-4.jpg" alt="housing 4" class="housing__banner" />
    <NuxtPicture src="/images/housing-3.jpg" alt="housing 3" class="housing__banner" />
    <NuxtPicture src="/images/housing-2.jpg" alt="housing 2" class="housing__banner" />
    <NuxtPicture src="/images/housing.jpg" alt="housing banner" class="housing__banner" />
  </main>
</template>

<script setup>
// const router = useRouter();
const { $gsap } = useNuxtApp();

let tl;
const containerRef = ref();

onMounted(() => {
  tl = $gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top top',
      end: `+=${window.innerHeight * 6} bottom`,
      // markers: true,
      scrub: true
    }
  });

  const firstBanner = containerRef.value.querySelector('.housing__banner:last-of-type');
  const secondBanner = containerRef.value.querySelector('.housing__banner:nth-of-type(3)');
  const thirdBanner = containerRef.value.querySelector('.housing__banner:nth-of-type(2)');

  tl.to(firstBanner, {
    scale: 2.04
  });
  tl.to(firstBanner, { opacity: 0 }, '-=0.4');
  tl.to(secondBanner, {
    opacity: 0,
    scale: 1.15
  });
  tl.to(thirdBanner, {
    opacity: 0,
    scale: 1.15
  });
});

useHead({
  title: 'Housing'
});
// useScrollPage(direction => {
//   if (direction === 'next') {
//     router.push('/infrastructure');
//   } else {
//     router.push('/formula');
//   }
// });
</script>

<style lang="scss" scoped>
.housing {
  position: relative;
  height: 600vh;
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 49%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    z-index: 2;
  }
  &__box {
    font-size: max(4.8rem, 28px);
    font-weight: bold;
    font-family: vars.$font-angst;
    z-index: 3;
    position: absolute;
    color: #fff;
    text-transform: uppercase;
    left: var(--block-padding-left);
    max-width: 19ch;

    // & > * {
    //   &:nth-child(2) {
    //     padding-left: max(3rem, 30px);
    //   }
    //   &:nth-child(3) {
    //     padding-left: max(1.5rem, 15px);
    //   }
    // }
    &:first-child {
      top: var(--block-padding-top);
    }
    &:nth-child(2) {
      top: calc(200vh + var(--block-padding-top));
    }
    &:nth-child(3) {
      top: calc(350vh + var(--block-padding-top));
    }
    &:nth-child(4) {
      top: calc(500vh + var(--block-padding-top));
    }
  }
  &__banner {
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    &:nth-child(5) {
      @media screen and (max-width: vars.$bp-large-mobile) {
        & > * {
          object-position: 10%;
        }
      }
    }
  }
}
</style>
