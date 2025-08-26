<template>
  <div>
    <h1>Housing</h1>
  </div>
</template>

<script setup>
const router = useRouter();
useScrollPage(direction => {
  if (direction === 'next') {
    router.push('/infrastructure');
  } else {
    router.push('/formula');
  }
});
</script>

<style lang="scss" scoped></style>
