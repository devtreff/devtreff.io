<template>
  <div
    class="flex justify-center min-h-screen min-w-full relative h-full w-full overflow-hidden text-white"
  >
    <v-lazy-image :alt="alt" class="absolute full-bg-img" :src="src" />

    <div v-if="hasGradient" class="transparent-gradient" />
    <div v-if="hasVerticalGradient" class="transparent-vertical-gradient" />
    <div class="content absolute h-full w-full">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VLazyImage from "v-lazy-image";

export default Vue.extend({
  components: {
    VLazyImage
  },
  props: {
    hasGradient: Boolean,
    hasVerticalGradient: Boolean,
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.full-bg-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.transparent-gradient {
  position: absolute;
  z-index: 10;
  background: linear-gradient(to right, black, transparent);
  opacity: 0.6;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.transparent-vertical-gradient {
  position: absolute;
  z-index: 10;
  background: linear-gradient(to top, black, transparent);
  opacity: 0.6;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.content {
  z-index: 20;
}
</style>
