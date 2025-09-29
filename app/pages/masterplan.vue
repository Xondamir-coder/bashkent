<template>
  <OverlayMap
    :paths="blocks"
    :image="imageSrc"
    @select-path="selectPath"
    @hover-path="hoverPath"
    @leave-path="isHovering = false"
  >
    <div class="overlay-box-layer">
      <div class="box" ref="boxEl" :class="{ visible: isHovering }">
        <h2 class="box__title">
          <span>{{ $t('house') }}</span>
          <span>&ThinSpace;№{{ hoveredPathData?.name }}</span>
        </h2>
        <div class="box__text" v-if="hoveredPathData">
          <div>
            <span>{{ $t('type') }}: </span>
            <span>{{ hoveredPathData.building_type[`name_${$i18n.locale}`] }}</span>
          </div>
          <div>
            <span>{{ $t('masterplan.floors') }}: </span>
            <span>{{ hoveredPathData.floors.length }}</span>
          </div>
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
const hoveredPathData = ref(null);
const imageSrc = ref('');
const boxEl = ref(null);
const isHovering = ref(false);

const OFFSET_X = 24; // how far to the right of cursor
const OFFSET_Y = 16; // how far below cursor
const EDGE_MARGIN = 8; // keep inside viewport

const selectPath = pathData => {
  navigateTo(localePath(`/buildings/${pathData.building_id}`));
  activeBuilding.value = buildings.value.find(b => b.id === +pathData.building_id);
};
const hoverPath = pathData => {
  hoveredPathData.value = pathData;
  isHovering.value = true;
};

const handlePointer = e => {
  if (!hoveredPathData.value || !boxEl.value) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const boxRect = boxEl.value.getBoundingClientRect();

  let x = e.clientX + OFFSET_X;
  let y = e.clientY + OFFSET_Y;

  // Clamp so box stays inside screen
  const maxX = vw - boxRect.width - EDGE_MARGIN;
  const maxY = vh - boxRect.height - EDGE_MARGIN;
  x = Math.min(x, maxX);
  y = Math.min(y, maxY);

  gsap.to(boxEl.value, {
    left: x,
    top: y,
    duration: 0.25,
    ease: 'power3.out',
    overwrite: true
  });
};

onMounted(() => {
  imageSrc.value =
    window.innerWidth <= 576
      ? '/images/576/masterplan.avif'
      : window.innerWidth >= 1440
      ? '/images/1440/masterplan.avif'
      : '/images/1024/masterplan.avif';

  window.addEventListener('pointermove', handlePointer);
});
onUnmounted(() => {
  window.removeEventListener('pointermove', handlePointer);
});

definePageMeta({
  layout: 'only-header'
});
</script>

<style scoped lang="scss">
.overlay-box-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}

.box {
  position: fixed;
  top: 0;
  left: 0;
  width: max-content;
  pointer-events: none;
  background-color: #fff;
  border-radius: max(1.6rem, 12px);
  padding: max(2.4rem, 24px);
  display: flex;
  flex-direction: column;
  gap: max(2rem, 16px);
  font-weight: 500;
  box-shadow: 0px 4px 32px 0px #0000001f;
  opacity: 0;
  transition: opacity 0.3s;
  &.visible {
    opacity: 1;
  }
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
