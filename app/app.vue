<template>
  <AppPreloader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ContactsModal />
</template>

<script setup>
const { fetchFilters, fetchBuildings, fetchFloors } = useAppState();

const buildingID = useCookie('building_id');
const blockID = useCookie('block_id');

fetchFilters();
fetchBuildings();
fetchFloors({ blockID, buildingID });
</script>
