<template>
  <div class="flex justify-center min-h-screen relative h-full w-full overflow-hidden text-white">
    <div class="absolute full-bg-img" :style="imageStyle"></div>
    <div class="transparent-gradient" v-if="hasGradient"/>
    <div class="container mx-auto absolute h-full px-4 pt-0 md:pt-4 lg:pt-6 xl:pt-8">
      <slot name="content"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["hasGradient", "src"],
  computed: {
    imageStyle() {
      return {
        backgroundImage: `url(${this.src})`
      };
    }
  }
});
</script>

<style lang="scss">
.full-bg-img {
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
</style>
