<template>
  <div
    class="inline-flex relative bg-gray-900 text-white text-center px-6 py-1"
  >
    <div class="strip absolute bg-orange-500 h-full"></div>
    <component :is="tag" class="font-bold">
      <slot />
    </component>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "h1"
    }
  }
};
</script>

<style lang="scss" scoped>
.strip {
  width: 10px;
  left: 0;
  top: 0;
}
</style>
