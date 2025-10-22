<template>
  <NuxtLink :to="$localePath(`/apartments/${data?.id}`)" class="item">
    <div class="item__top">
      <span class="item__label">
        {{ data?.type[`name_${$i18n.locale}`] }}
      </span>
      <p class="item__desc">
        {{ data?.[`name_${$i18n.locale}`] }}, {{ `${data?.rooms.length} ${$t('sect')}` }},
        {{
          $t('x-floor-of-y', {
            x: data?.floor,
            y: data?.block.floors_count
          })
        }}
      </p>
    </div>
    <img :src="`${DOMAIN_URL}/${data?.image}`" class="item__image" />
    <span class="item__area"> {{ data?.area }} {{ $t('m-squared') }} </span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  data: {
    required: true,
    type: Object
  }
});
</script>

<style lang="scss" scoped>
.item {
  padding: max(1.6rem, 16px);
  border-radius: max(1.2rem, 12px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: max(1.6rem, 12px);
  transition: all vars.$dt;
  animation: slide-from-bottom-20 0.7s backwards;
  border: 1px solid transparent;
  &:hover {
    border-color: #076962;
    box-shadow: 0px 27px 40px -10px #0c4b2440;
  }
  &__image {
    aspect-ratio: 237/174;
    object-fit: contain;
  }
  &__room {
    padding-block: max(0.6rem, 6px);
    padding-inline: max(1rem, 10px);
    font-size: max(1rem, 10px);
    color: #fff;
    border-radius: max(2.8rem, 28px);
    font-weight: 500;
  }
  &__area {
    font-weight: bold;
    font-size: max(2.4rem, 20px);
  }
  &__top {
    display: flex;
    flex-direction: column;
    gap: max(0.8rem, 8px);
  }
  &__desc {
    font-size: max(1.4rem, 12px);
    color: vars.$darker-grey;
  }
  &__label {
    font-weight: bold;
    font-size: max(1.6rem, 14px);
  }
}
</style>
