<template>
  <OverlayMap :paths="floors" :image @select-path="selectPath" />
</template>

<script setup>
const { activeBuilding, buildings } = useAppState();
const route = useRoute();
const localePath = useLocalePath();

const expireYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

const buildingCookie = useCookie('building_id', { expires: expireYear });
const blockCookie = useCookie('block_id', { expires: expireYear });

if (!activeBuilding.value) {
  activeBuilding.value = buildings.value.find(b => b.id === +route.params.id);
}

const floors = computed(() => activeBuilding.value?.blocks.flatMap(b => b.floors));
const image = computed(() => `${DOMAIN_URL}/${activeBuilding.value?.image}`);

const selectPath = pathData => {
  buildingCookie.value = pathData.building_id;
  blockCookie.value = pathData.block_id;

  navigateTo({
    path: localePath(`/floors/${pathData.floor_number}`),
    query: { building_id: pathData.building_id, block_id: pathData.block_id }
  });
};
</script>
