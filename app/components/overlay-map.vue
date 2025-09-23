<template>
  <main class="overlay">
    <GlassButton class="overlay__close" @click="$router.back()">
      <SvgClose />
    </GlassButton>

    <div class="overlay__wrapper">
      <img :src="image" alt="overlay banner" class="overlay__picture" />
      <svg
        class="overlay__container"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          v-for="(path, index) in paths"
          :key="index"
          :d="path.d"
          class="overlay__container-path"
          @click="goIn(path)"
          @pointerenter="assignData(path)"
        />
      </svg>

      <!-- Custom content slot (tooltip, etc) -->
      <slot name="overlay-content" :data="data" :pointer="pointer" />
    </div>
  </main>
</template>

<script setup>
import gsap from 'gsap';

const props = defineProps({
  image: { type: String, required: true },
  paths: { type: Array, required: true },
  toWhere: { type: String, required: true }
});

const route = useRoute();
const cookie = useCookie('building');

const data = ref(null);
const pointer = reactive({ x: 0, y: 0 });

const assignData = path => {
  data.value = path;
};

const goIn = path => {
  if (route.name.includes('buildings')) {
    cookie.value = route.params.id;
    useLocaleNavigate(`/${props.toWhere}/${path.id}?building=${route.params.id}`);
  } else {
    useLocaleNavigate(`/${props.toWhere}/${path.id}`);
  }
};

const handleParallax = e => {
  const xVal = (e.clientX / window.innerWidth) * 2 - 1;
  const yVal = (e.clientY / window.innerHeight) * 2 - 1;

  pointer.x = e.clientX + 20;
  pointer.y = e.clientY + 20;

  gsap.to('.overlay__wrapper', {
    x: -xVal * window.innerWidth * 0.1,
    y: -yVal * window.innerHeight * 0.1,
    duration: 0.8,
    ease: 'power3.out'
  });
};

onMounted(() => {
  if (window.innerWidth < 1280) return;
  window.addEventListener('pointermove', handleParallax);
});
onUnmounted(() => {
  if (window.innerWidth < 1280) return;
  window.removeEventListener('pointermove', handleParallax);
});
</script>

<style lang="scss">
.overlay {
  user-select: none;
  position: relative;
  overflow: hidden;
  &:has(.overlay__container path:hover) .box {
    opacity: 1;
  }
  &__box {
    pointer-events: none;
    background-color: #fff;
    border-radius: max(1.6rem, 12px);
    padding: max(2.4rem, 24px);
    display: flex;
    flex-direction: column;
    gap: max(2rem, 16px);
    position: absolute;
    z-index: 15;
    font-weight: 500;
    box-shadow: 0px 4px 32px 0px #0000001f;
    transition: transform 0.05s, opacity 0.3s;
    top: 0;
    left: 0;
    opacity: 0;
    translate: -110% 10%;

    &-title {
      font-family: vars.$font-angst;
      font-size: max(2.8rem, 24px);
      font-weight: bold;
      color: vars.$gold;
    }
  }
  &__wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 1280px) {
      overflow: auto;
    }
  }
  &__close {
    position: absolute !important;
    right: var(--block-spacing);
    top: calc(var(--header-height) + max(3.2rem, 20px));
    z-index: 5;
  }
  &__container {
    z-index: 2;
    &-path {
      cursor: pointer;
      transition: fill vars.$dt;
      fill: transparent;
      &:hover {
        fill: #ffff0080;
      }
    }
  }
  &__picture,
  &__container {
    position: absolute;
    inset: 0;
    width: auto;
    height: 100%;
    @media screen and (min-width: 1280px) {
      top: 50%;
      left: 55%;
      width: 120%;
      height: 120%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
