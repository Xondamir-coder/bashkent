<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ContactsModal />
</template>

<script setup>
const { fetchFilters, fetchBuildings } = useAppState();
fetchFilters();
fetchBuildings();
</script>
