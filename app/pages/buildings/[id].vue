<template>
  <div class="buildings">
    <OverlayMap
      class="overlay--buildings"
      :paths="floors"
      :image
      @select-path="selectPath"
      @hover-path="hoverPath"
      @leave-path="leavePath"
    >
      <InfoBox
        :title="`${$t('house')} №${hoveredPathData?.block_id}`"
        :texts="[`${$t('floor')}: ${hoveredPathData?.floor_number}`]"
        :is-active="isInfoBoxActive"
      />
    </OverlayMap>
    <button class="buildings__button" @click="goToFloor">
      <span>{{ $t('select-floor') }}</span>
      <SvgChevronDown class="buildings__button-icon" />
    </button>
    <div class="buildings__nav">
      <button class="buildings__nav-button" @click="goUp">
        <SvgChevronDown />
      </button>
      <span class="buildings__nav-number">{{ currentFloor.toString().padStart(2, '0') }}</span>
      <button class="buildings__nav-button" @click="goDown">
        <SvgChevronDown />
      </button>
    </div>
  </div>
</template>

<script setup>
const { activeBuilding, buildings } = useAppState();
const route = useRoute();
const localePath = useLocalePath();
const { locale } = useI18n();

// cookies
const expireYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
const buildingCookie = useCookie('building_id', { expires: expireYear });
const blockCookie = useCookie('block_id', { expires: expireYear });

// reactive state
const hoveredPathData = ref();
const isInfoBoxActive = ref(false);
const currentFloor = ref(1);
const currentBlock = ref();

// initialize active building
if (!activeBuilding.value) {
  activeBuilding.value = buildings.value.find(b => b.id === Number(route.params.id));
}

// pick the middle block as default
const middleIndex = Math.floor(activeBuilding.value.blocks.length / 2);
currentBlock.value = activeBuilding.value.blocks[middleIndex].id;

// computed data
const floors = computed(() => activeBuilding.value?.blocks.flatMap(b => b.floors));

const image = computed(() => `${DOMAIN_URL}/${activeBuilding.value?.image}`);

// DOM helpers
const getPathElement = () => {
  const selector = `.overlay__container-path[data-floor="${currentFloor.value}"][data-block="${currentBlock.value}"]`;
  return document.querySelector(selector);
};

const deactivatePaths = () => {
  document
    .querySelectorAll('.overlay__container-path.active')
    .forEach(p => p.classList.remove('active'));
};

const activateCurrentPath = () => {
  deactivatePaths();
  const path = getPathElement();
  if (path) path.classList.add('active');
};

// path data helpers
const updateHoveredPathData = () => {
  hoveredPathData.value = floors.value.find(
    f => f.floor_number === currentFloor.value && f.block_id === currentBlock.value
  );
};

const handlePathChange = () => {
  updateHoveredPathData();
  activateCurrentPath();
  positionInfoBox();
};

// floor navigation
const goUp = () => {
  currentFloor.value = currentFloor.value % 12 === 0 ? 1 : currentFloor.value + 1;
  handlePathChange();
};

const goDown = () => {
  currentFloor.value = currentFloor.value === 1 ? 12 : currentFloor.value - 1;
  handlePathChange();
};

// navigation to floor details
const goToFloor = () => {
  if (!hoveredPathData.value) return;

  buildingCookie.value = hoveredPathData.value.building_id;
  blockCookie.value = hoveredPathData.value.block_id;

  navigateTo({
    path: localePath(`/floors/${hoveredPathData.value.floor_number}`),
    query: {
      building_id: hoveredPathData.value.building_id,
      block_id: hoveredPathData.value.block_id
    }
  });
};

// info box positioning
let boxDimensions = null;

const getBoxDimensions = () => {
  const infoBox = document.querySelector('.info-box');
  if (!infoBox) return null;
  const rect = infoBox.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
};

const positionInfoBox = () => {
  isInfoBoxActive.value = true;
  const boxMargin = 16;

  const path = document.querySelector(
    `.overlay__container-path[data-floor="${currentFloor.value}"][data-block="${currentBlock.value}"]`
  );
  const infoBox = document.querySelector('.info-box');
  if (!path || !infoBox) return;

  // Measure only once (lazy initialization)
  if (!boxDimensions) {
    boxDimensions = getBoxDimensions();
  }

  const rect = path.getBoundingClientRect();
  const boxWidth = boxDimensions.width;
  const boxHeight = boxDimensions.height;

  // Center horizontally above the path
  let x = rect.left + rect.width / 2 - boxWidth / 2;
  let y = rect.top - boxHeight - boxMargin;

  // Clamp to viewport
  if (x < boxMargin) x = boxMargin;
  if (x + boxWidth > window.innerWidth - boxMargin) x = window.innerWidth - boxWidth - boxMargin;
  if (y < boxMargin) y = rect.bottom + boxMargin; // flip below if not enough space above

  // Apply position
  infoBox.style.position = 'absolute';
  infoBox.style.left = `${x}px`;
  infoBox.style.top = `${y}px`;
};

// path interaction
const selectPath = pathData => {
  if (window.innerWidth < 1280) {
    deactivatePaths();
    event?.target?.classList.add('active');

    currentFloor.value = pathData.floor_number;
    currentBlock.value = pathData.block_id;
    hoveredPathData.value = pathData;

    positionInfoBox();
    return;
  }

  goToFloor();
};

const leavePath = () => {
  if (window.innerWidth < 1280) return;
  isInfoBoxActive.value = false;
};
const hoverPath = pathData => {
  if (window.innerWidth < 1280) return;
  isInfoBoxActive.value = true;
  hoveredPathData.value = pathData;
};

// lifecycle
onMounted(() => {
  if (window.innerWidth < 1280) {
    updateHoveredPathData();
    activateCurrentPath();
  }
});

// SEO data
const getSEOData = id => {
  const seo = {
    en: {
      title: `Building ${id} – Explore Floors & Apartments`,
      description: `Explore Building ${id}. Select floors from the interactive plan and view apartment layouts and availability.`
    },
    ru: {
      title: `Здание ${id} – Этажи и квартиры`,
      description: `Исследуйте здание ${id}. Выберите этажи на интерактивном плане и смотрите планировки и доступные квартиры.`
    },
    uz: {
      title: `Bino ${id} – Qavatlar va xonadonlar`,
      description: `Bino ${id}ni ko‘ring. Interaktiv rejadan qavatlarni tanlab, xonadon joylashuvi va mavjudligini bilib oling.`
    }
  };

  return seo[locale.value];
};

useSeoMeta({
  ...getSEOData(activeBuilding.value?.id),
  ogSiteName: 'Bashkent Residence',
  ogImage: image.value
});

definePageMeta({ layout: 'only-header' });
</script>

<style scoped lang="scss">
.buildings {
  &__nav {
    position: fixed;
    right: 16px;
    top: 50%;
    translate: 0 -50%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 9px;
    border-radius: 8px;
    @media screen and (min-width: 1280px) {
      display: none;
    }
    &-number {
      border-block: 1px solid #d6d7d7;
      padding-block: 10px;
      text-align: center;
      font-weight: 500;
    }
    &-button {
      display: flex;
      width: 20px;
      stroke: #181a1a;
      &:first-child {
        rotate: 180deg;
      }
    }
  }
  &__button {
    position: fixed;
    bottom: 30px;
    left: 16px;
    right: 16px;
    z-index: 15;
    background-color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    padding-block: 9px;
    justify-content: center;
    font-weight: 500;
    @media screen and (min-width: 1280px) {
      display: none;
    }
    &-icon {
      stroke: #181a1a;
      width: 20px;
      rotate: -90deg;
    }
  }
}
</style>
