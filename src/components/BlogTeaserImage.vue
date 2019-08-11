<template>
  <a
    :href="href"
    class="block image-container overflow-hidden relative cursor-pointer"
    :style="{ width: '300px' }"
  >
    <img
      class="relative z-1"
      :src="src"
      :style="{ width: '100%', height: 'auto', display: 'block' }"
    />
    <div class="absolute overlay top-0 bottom-0">
      <div class="absolute z-10 inset-0 bg-orange-500 opacity-75"></div>
      <div
        class="relative h-full flex flex-col items-center justify-center z-20 title-overlay text-white"
      >
        <h1 class="font-bold text-lg">{{ title }}</h1>
        <span class="text-sm">{{ subtitle }}</span>
      </div>
    </div>
  </a>
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
    },
    href: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.overlay {
  left: -100%;
  right: 100%;
  opacity: 0;
  transition: all ease-in-out 0.2s;
}
.image-container {
  &:hover {
    .overlay {
      right: 0;
      left: 0;
      opacity: 1;
    }
  }
}
</style>
