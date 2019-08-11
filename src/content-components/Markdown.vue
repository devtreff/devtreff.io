<template>
  <vue-simple-markdown
    class="markdown-container"
    :source="contentComponent.body"
  />
</template>

<script>
export default {
  name: "Markdown",
  props: {
    contentComponent: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.markdown-container {
  @apply leading-relaxed;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply text-xl font-bold mt-8 mb-4;
  }

  img {
    @apply mt-8 mb-4;
  }
}
</style>
