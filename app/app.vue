<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ContactsModal />
</template>

<script setup>
const { fetchFilters } = useAppState();
fetchFilters();
</script>
