<template>
  <div>
    <h1>Contacts</h1>
  </div>
</template>

<script setup>
const router = useRouter();
useScrollPage(direction => {
  if (direction === 'prev') {
    router.push('/infrastructure');
  }
});
</script>

<style lang="scss" scoped></style>
