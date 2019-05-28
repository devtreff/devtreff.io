<template>
  <button class="relative">
    <div class="background absolute"/>
    <div class="container relative">
      <slot/>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Button"
});
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  z-index: 10;
  background: orange;
  top: 0;
  bottom: 0;
  left: 0;
  max-width: 10px;
  width: 100%;
  transition: max-width 200ms ease-in-out;
}

button {
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
