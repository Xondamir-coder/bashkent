<template>
  <div class="double-range">
    <div class="double-range__header">
      <span>{{ $t('area') }}</span>
      <span>{{ displayMin }} – {{ displayMax }} {{ $t('m-squared') }}</span>
    </div>

    <div ref="sliderRef" class="double-range__slider">
      <!-- histogram bars -->
      <div
        v-for="(bar, i) in bars"
        :key="i"
        class="double-range__bar"
        :class="{ active: i >= minIndex && i <= maxIndex }"
        :style="{ height: bar + '%' }"
      />

      <!-- background track -->
      <div class="double-range__track" />

      <!-- selected filled track -->
      <div
        class="double-range__track--filled"
        :style="{
          left: minPercent + '%',
          width: maxPercent - minPercent + '%'
        }"
      />

      <!-- handles -->
      <div
        v-for="(percent, i) in [minPercent, maxPercent]"
        :key="i"
        class="double-range__handle"
        :style="{ left: percent + '%' }"
        @pointerdown.prevent="startDrag($event, i)"
      />
    </div>
  </div>
</template>

<script setup>
const model = defineModel({
  type: Object
});
const bars = [11, 14, 14, 22, 38, 63, 63, 100, 86, 57, 41, 85, 41, 30, 21, 11];

const minValue = 25;
const maxValue = 150;
const stepCount = bars.length - 1;
const step = (maxValue - minValue) / stepCount;

const minIndex = ref(0);
const maxIndex = ref(6);

const sliderRef = ref(null);
let dragging = null;

const displayMin = computed(() => Math.round(minValue + minIndex.value * step));
const displayMax = computed(() => Math.round(minValue + maxIndex.value * step));
const minPercent = computed(() => (minIndex.value / stepCount) * 100);
const maxPercent = computed(() => (maxIndex.value / stepCount) * 100);

watchEffect(() => {
  model.value.from = displayMin.value;
});
watchEffect(() => {
  model.value.to = displayMax.value;
});

onMounted(() => {
  window.addEventListener('pointermove', onDrag);
  window.addEventListener('pointerup', stopDrag);
  document.addEventListener('click', handleReset);
});

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDrag);
  window.removeEventListener('pointerup', stopDrag);
  document.removeEventListener('click', handleReset);
});

const startDrag = (e, handle) => {
  dragging = handle;
  e.target.setPointerCapture(e.pointerId);
};

const stopDrag = () => {
  dragging = null;
};

const onDrag = e => {
  if (dragging === null) return;
  const rect = sliderRef.value.getBoundingClientRect();
  const percent = ((e.clientX - rect.left) / rect.width) * 100;
  const index = Math.round((percent / 100) * stepCount);

  if (dragging === 0) {
    minIndex.value = Math.min(index, maxIndex.value - 1);
    if (minIndex.value < 0) minIndex.value = 0;
  } else {
    maxIndex.value = Math.max(index, minIndex.value + 1);
    if (maxIndex.value > stepCount) maxIndex.value = stepCount;
  }
};

const handleReset = e => {
  if (e.target.closest('.sidebar__reset')) {
    minIndex.value = 0;
    maxIndex.value = 6;
  }
};
</script>

<style scoped lang="scss">
.double-range {
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
  }
  &__slider {
    position: relative;
    display: flex;
    align-items: flex-end;
    height: 56px;
    gap: 2px;
    user-select: none;
    align-self: center;
    @media screen and (max-width: 700px) {
      width: 90%;
    }
  }

  &__bar {
    flex: 1;
    background: #d6d7d7;
    border-radius: 2px;
    transition: background 0.2s;

    &.active {
      background: vars.$teal;
    }
  }

  &__track {
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 3px;
    background: #d6d7d7;
    &--filled {
      position: absolute;
      bottom: -4px;
      height: 3px;
      background: vars.$teal;
      transition: all 0.2s;
    }
  }
  &__handle {
    position: absolute;
    bottom: -3px;
    transform: translate(-50%, 50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: vars.$teal;
    border: 2px solid #fff;
    box-shadow: 0px 4px 7px 0px #00000026;
    cursor: grab;
    transition: all 0.2s;

    &:active {
      cursor: grabbing;
      background: vars.$teal;
    }
  }
}
</style>
