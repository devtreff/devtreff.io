<template>
  <div class="flex justify-center min-h-screen relative h-full w-full overflow-hidden text-white">
    <div class="absolute full-bg-img" :style="imageStyle"></div>
    <div class="transparent-gradient" v-if="hasGradient"/>
    <div class="transparent-vertical-gradient" v-if="hasVerticalGradient"/>
    <div class="content absolute h-full w-full">
      <slot name="content"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["hasGradient", "hasVerticalGradient", "src"],
  computed: {
    imageStyle() {
      return {
        backgroundImage: `url(${this.src})`
      };
    }
  }
});
</script>

<style lang="scss" scoped>
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
