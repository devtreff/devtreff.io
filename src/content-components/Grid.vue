<template>
  <div class="flex flex-wrap">
    <div
      v-for="(column, index) in contentComponent.columns"
      :key="index"
      :class="`w-${contentComponent.column_size} p-2`"
    >
      <ContentComponentSelector :content-component="column" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Grid",
  props: {
    contentComponent: {
      type: Object,
      required: true
    }
  }
};
</script>
