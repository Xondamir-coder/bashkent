<template>
  <div class="contacts__map">
    <LMap
      ref="map"
      :zoom="14"
      :center="center"
      :use-global-leaflet="false"
      style="height: 100%; width: 100%"
    >
      <!-- Map background -->
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      <!-- Category markers -->
      <LMarker v-for="(marker, idx) in filteredMarkers" :key="idx" :lat-lng="marker.coords">
        <LIcon>
          <div class="poi-marker">
            <component :is="marker.icon" class="poi-icon" />
          </div>
        </LIcon>
        <LPopup>
          <h2 style="font-family: 'Gotham', sans-serif">{{ marker.name }}</h2>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
// Active category (can be controlled externally)
const model = defineModel({
  type: Array
});

const props = defineProps({
  center: {
    required: true,
    type: Array
  },
  markers: {
    type: Array,
    required: true
  }
});

// Only show markers of the active category
const filteredMarkers = computed(() =>
  model.value.includes(0) ? props.markers : props.markers.filter(m => model.value.includes(m.id))
);
</script>

<style lang="scss">
.contacts__map {
  overflow: hidden;
  position: absolute;
  right: 0;
  @media screen and (min-width: vars.$bp-large-mobile) {
    top: 0;
    width: 59%;
    height: 100%;
  }
  @media screen and (max-width: vars.$bp-large-mobile) {
    overflow: visible;
    bottom: 0;
    position: relative;
  }
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    background: linear-gradient(270deg, rgba(255, 255, 255, 0) 36.36%, #fff 85.5%);
    left: 0;
    top: 0;
    z-index: 6;
    pointer-events: none;
    @media screen and (max-width: vars.$bp-large-mobile) {
      background: linear-gradient(0, rgba(255, 255, 255, 0) 36.36%, #fff 85.5%);
      height: 80%;
      width: 100%;
      top: -1%;
    }
  }
}

.leaflet-container {
  z-index: 5;
}
.leaflet-control-attribution.leaflet-control {
  display: none;
}
.leaflet-control-zoom.leaflet-bar.leaflet-control {
  display: none;
}

/* Central marker */
.central-marker {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #076962;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* POI markers */
.poi-marker {
  background-color: vars.$teal;
  border-radius: 50%;
  width: max(5.6rem, 48px);
  height: max(5.6rem, 48px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include mix.flex-center;
  .poi-icon {
    width: 42%;
    stroke: #fff;
    fill: none;
  }
}

.leaflet-marker-icon {
  background-color: transparent;
  border: none;
}
</style>
