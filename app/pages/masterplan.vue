<template>
  <OverlayMap
    :paths="blocks"
    image="/images/masterplan.avif"
    @select-path="selectPath"
    @hover-path="hoverPath"
  >
    <div class="box">
      <h2 class="box__title">
        <span>{{ $t('house') }}</span>
        <span>&ThinSpace;№{{ hoveredPathData?.name }}</span>
      </h2>
      <div class="box__text">
        <div>
          <span>{{ $t('type') }}: </span>
          <span>{{ hoveredPathData?.building_type[`name_${$i18n.locale}`] }}</span>
        </div>
        <div>
          <span>{{ $t('masterplan.floors') }}: </span>
          <span>{{ hoveredPathData?.floors.length }}</span>
        </div>
      </div>
    </div>
  </OverlayMap>
</template>

<script setup>
import gsap from 'gsap';

const { buildings, activeBuilding } = useAppState();
const localePath = useLocalePath();

const blocks = computed(() => buildings.value?.flatMap(d => d.blocks));
const hoveredPathData = ref();

const selectPath = pathData => {
  navigateTo(localePath(`/buildings/${pathData.building_id}`));
  activeBuilding.value = buildings.value.find(b => b.id === +pathData.building_id);
};

const hoverPath = pathData => (hoveredPathData.value = pathData);
const handleParallax = e => {
  gsap.to('.box', {
    x: e.offsetX - 50,
    y: e.offsetY - 50,
    duration: 0.5,
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

useMySEO('masterplan');
</script>

<style scoped lang="scss">
.box {
  width: max-content;
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
  opacity: 0;
  transition: opacity 0.3s;
  &__text {
    font-size: max(1.6rem, 14px);
    line-height: 1.35;
    font-weight: 500;
  }
  &__title {
    font-family: vars.$font-angst;
    font-size: max(2.8rem, 24px);
    font-weight: bold;
    color: vars.$gold;
  }
}
</style>
