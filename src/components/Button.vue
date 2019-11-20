<template>
  <component
    :is="tag"
    v-if="variant == 'hollow'"
    class="tag bg-transparent border border-white px-4 hover:text-gray-900 hover:bg-white"
  >
    <slot />
  </component>
  <component :is="tag" v-else class="tag relative">
    <div class="background absolute" />
    <div class="container relative">
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Button",
  props: {
    variant: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: "button"
    }
  }
});
</script>

<style lang="scss" scoped>
.background {
  @apply bg-orange-500;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  max-width: 10px;
  width: 100%;
  transition: max-width 200ms ease-in-out;
}

.tag {
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover,
  &:focus {
    @apply text-gray-900;
    .background {
      @apply bg-orange-300;
      max-width: 100%;
    }
  }
}

.container {
  padding: 10px 20px;
  z-index: 20;
}
</style>
