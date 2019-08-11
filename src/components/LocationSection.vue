<template>
  <section
    :class="[
      'relative flex pt-8 pb-8 lg:py-16 items-center justify-end overflow-hidden flex-col lg:flex-row',
      hasWhiteBackground ? '' : 'bg-gray-100'
    ]"
  >
    <div
      :class="[
        'lg:max-w-2xl w-full px-5 z-10 lg:pr-12',
        hasWhiteBackground ? '' : 'bg-gray-100'
      ]"
    >
      <div class="mb-8">
        <Title class="lg:text-xl">Die Location</Title>
      </div>
      <p class="text-gray-600">{{ location.content.city }}</p>
      <h1 class="text-4xl font-bold">{{ location.content.title }}</h1>
      <div class="whitespace-pre-line leading-relaxed">
        <vue-simple-markdown
          class="markdown-container"
          :source="location.content.description"
        ></vue-simple-markdown>
      </div>
      <p class="text-gray-600 pt-5">
        {{ location.content.street }}, {{ location.content.postcode }}
        {{ location.content.city }}
      </p>
    </div>
    <div :style="{ 'max-width': '500px' }" class="flex-1"></div>
  </section>
</template>

<script>
import Title from "./Title";

export default {
  components: {
    Title
  },
  props: {
    location: {
      type: Object,
      required: true
    },
    hasWhiteBackground: Boolean
  }
};
</script>
