<template>
  <NuxtLink :to="$localePath(`/apartments/${data?.id}`)" class="item">
    <div class="item__top">
      <span class="item__label">
        {{ data?.type[`name_${$i18n.locale}`] }}
      </span>
      <p class="item__desc">
        {{ data?.[`name_${$i18n.locale}`] }}, ?,
        {{
          $t('x-floor-of-y', {
            x: data?.floor,
            y: 13
          })
        }}
      </p>
    </div>
    <img :src="`${DOMAIN_URL}/${data?.image}`" class="item__image" />
    <span class="item__area"> {{ data?.area }} {{ $t('m-squared') }} </span>
    <div class="item__divider" />
    <div class="item__rooms">
      <span
        v-for="(room, roomIndex) in data?.rooms"
        :key="roomIndex"
        class="item__room"
        :style="{ backgroundColor: stringToColor(room.key_en) }"
      >
        {{ room[`key_${$i18n.locale}`] }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup>
const COLORS = [
  '#05312b', // $teal-dark
  '#076962', // $teal
  '#609e99', // $teal-light
  '#c1eae7', // $teal-very-light
  '#d3ad48', // $gold
  '#181a1a', // $black-medium
  '#eb8331' // $orange
];

const stringToColor = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};
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

  &:hover {
    box-shadow: 0px 4px 32px 0px #0000001f;
  }
  &__rooms {
    display: flex;
    gap: max(1rem, 10px);
    flex-wrap: wrap;
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
  &__divider {
    align-self: stretch;
    height: 1px;
    background-color: #d6d7d7;
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
