<template>
  <button
    class="bg-transparent border border-white px-4 hover:text-gray-900 hover:bg-white"
    v-if="variant == 'hollow'"
  >
    <slot/>
  </button>
  <button class="relative" v-else>
    <div class="background bg-orange-500 absolute"/>
    <div class="container relative">
      <slot/>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Button",
  props: ["variant"]
});
</script>

<style lang="scss" scoped>
.background {
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  max-width: 10px;
  width: 100%;
  transition: max-width 200ms ease-in-out;
}

button {
  transition: all 200ms ease-in-out;
  &:hover,
  &:focus {
    .background {
      max-width: 100%;
    }
  }
}

.container {
  padding: 10px 20px;
  z-index: 20;
}
</style>
