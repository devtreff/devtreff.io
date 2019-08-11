<template>
  <component
    :is="contentComponent.link ? 'a' : 'div'"
    :href="contentComponent.link && contentComponent.link.url"
    class="bg-gray-100 flex"
  >
    <img class="h-24 w-24 object-cover" :src="contentComponent.image" />
    <div class="p-2">
      <div class="text-xs">{{ contentComponent.small_title }}</div>
      <div class="mt-1 font-bold">{{ contentComponent.title }}</div>
    </div>
  </component>
</template>

<script>
export default {
  name: "FeatureGridItem",
  props: {
    contentComponent: {
      type: Object,
      required: true
    }
  }
};
</script>
