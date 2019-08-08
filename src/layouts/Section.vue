<template>
  <section
    :class="[
      'relative flex pt-8 lg:py-16 items-center justify-end overflow-hidden',
      isReversed ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row',
      showWhiteBackground ? 'bg-white' : 'bg-gray-200'
    ]"
  >
    <img
      v-if="!isReversed && showDots"
      class="absolute"
      src="../images/dots_small.svg"
      :style="{ left: '-50px', top: 0 }"
    />
    <img
      v-if="isReversed && showDots"
      class="absolute"
      src="../images/dots_small.svg"
      :style="{ right: '-50px', top: '-150px' }"
    />
    <div
      :class="[
        'lg:max-w-2xl w-full px-5 z-10',
        isReversed ? 'lg:pl-12 bg-white' : 'lg:pr-12',
        showWhiteBackground ? 'bg-white' : 'bg-gray-200'
      ]"
    >
      <div class="mb-8">
        <Title class="lg:text-xl">{{ title }}</Title>
      </div>
      <div class="whitespace-pre-line leading-relaxed">
        <vue-simple-markdown
          class="markdown-container"
          :source="description"
        ></vue-simple-markdown>
      </div>
    </div>
    <div v-if="image" class="mt-6 lg:mt-0 z-10">
      <g-image :src="image" />
    </div>
    <div v-else class="image-placeholder flex-1" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Title from "../components/Title.vue";

export default Vue.extend({
  components: {
    Title
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: Image,
      required: false,
      default: null
    },
    isReversed: Boolean,
    hasWhiteBackground: Boolean,
    showDots: Boolean
  },
  computed: {
    showWhiteBackground() {
      return this.hasWhiteBackground === undefined
        ? this.isReversed
        : this.hasWhiteBackground;
    }
  }
});
</script>

<style lang="scss" scoped>
img,
.image-placeholder {
  @media (min-width: theme("screens.lg")) {
    max-width: 500px;
  }
}
</style>
