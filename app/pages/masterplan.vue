<template>
  <OverlayMap
    :paths="blocks"
    :image="imageSrc"
    @select-path="selectPath"
    @hover-path="hoverPath"
    @leave-path="isInfoBoxActive = false"
  >
    <InfoBox
      :title="`${$t('house')} №${hoveredPathData?.name}`"
      :texts="[
        `${$t('type')}: ${hoveredPathData?.building_type[`name_${$i18n.locale}`]}`,
        `${$t('masterplan.floors')}: ${hoveredPathData?.floors.length}`
      ]"
      :is-active="isInfoBoxActive"
    />
  </OverlayMap>
</template>

<script setup>
const { buildings, activeBuilding } = useAppState();
const localePath = useLocalePath();

const blocks = computed(() => buildings.value?.flatMap(d => d.blocks));
const hoveredPathData = ref(null);
const imageSrc = ref('');

const isInfoBoxActive = ref(false);

const selectPath = pathData => {
  navigateTo(localePath(`/buildings/${pathData.building_id}`));
  activeBuilding.value = buildings.value.find(b => b.id === +pathData.building_id);
};
const hoverPath = pathData => {
  hoveredPathData.value = pathData;
  isInfoBoxActive.value = true;
};

onMounted(() => {
  imageSrc.value =
    window.innerWidth <= 576
      ? '/images/576/masterplan.avif'
      : window.innerWidth >= 1440
      ? '/images/1440/masterplan.avif'
      : '/images/1024/masterplan.avif';
});

definePageMeta({
  layout: 'only-header'
});
</script>
