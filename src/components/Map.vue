<template>
  <GmapMap :center="{ lat, lng }" :zoom="14" class="w-full h-64" :options="options">
    <GmapMarker
      :position="{ lat, lng }"
      icon="https://img2.storyblok.com/30x30/f/59562/120x120/71b42410c1/devtreff-logo.png"
      @click="open(lat,lng)"
    />
  </GmapMap>
</template>

<script>
export default {
  props: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      options: {
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#e9e9e9"
              },
              {
                lightness: 17
              }
            ]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
              {
                color: "#ededed"
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff"
              },
              {
                lightness: 17
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#ffffff"
              },
              {
                lightness: 29
              },
              {
                weight: 0.2
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff"
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [
              {
                color: "#d1d1d1"
              },
              {
                lightness: 16
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f5f5"
              },
              {
                lightness: 21
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#dedede"
              },
              {
                lightness: 21
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                visibility: "on"
              },
              {
                color: "#ffffff"
              },
              {
                lightness: 16
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                saturation: 36
              },
              {
                color: "#333333"
              },
              {
                lightness: 40
              }
            ]
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              {
                color: "#dddddd"
              },
              {
                lightness: 19
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#fefefe"
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#fefefe"
              },
              {
                lightness: 17
              },
              {
                weight: 1.2
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    open(lat, lng) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,'_blank')
    }
  },
};
</script>

<style>
.vue-map-container > .vue-map {
  height: 100%;
}
</style>
