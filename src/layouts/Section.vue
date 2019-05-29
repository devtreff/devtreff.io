<template>
  <section
    :class="[
      'flex pt-8 lg:py-16 items-center justify-end', 
      isReversed ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row bg-gray-200'
    ]"
  >
    <div :class="['lg:max-w-2xl w-full px-5', isReversed ? 'md:pl-12' : 'md:pr-12']">
      <div class="mb-8">
        <Title class="lg:text-xl">{{title}}</Title>
      </div>
      <div>
        <slot name="content"/>
      </div>
    </div>
    <div class="mt-6 lg:mt-0">
      <slot name="image"/>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Title from "../components/Title.vue";
export default Vue.extend({
  components: {
    Title
  },
  props: ["title", "imgSrc", "isReversed"]
});
</script>