<template>
  <Title class="mb-8">{{ contentComponent.title }}</Title>
</template>

<script>
import Title from "../components/Title.vue";

export default {
  name: "ContentTitle",
  components: {
    Title
  },
  props: {
    contentComponent: {
      type: Object,
      required: true
    }
  }
};
</script>
