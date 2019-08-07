<template>
  <div class="relative" :style="{ width: '300px' }">
    <img
      class="relative z-1"
      :src="src"
      :style="{ width: '100%', height: 'auto', display: 'block' }"
    />
    <div
      class="absolute flex flex-col items-center justify-center z-10 title-overlay text-white"
    >
      <h1 class="font-bold text-lg">{{ title }}</h1>
      <span class="text-sm">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    }
  }
});
</script>

<style lang="scss" scoped>
.title-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
