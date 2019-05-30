<template>
  <section
    v-editable="section"
    :class="[
      'flex pt-8 lg:py-16 items-center justify-end', 
      isReversed ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row bg-gray-200'
    ]"
  >
    <div :class="['lg:max-w-2xl w-full px-5', isReversed ? 'lg:pl-12' : 'lg:pr-12']">
      <div class="mb-8">
        <Title class="lg:text-xl">{{section.title}}</Title>
      </div>
      <div class="leading-relaxed whitespace-pre-line">
        <vue-simple-markdown :source="section.body"></vue-simple-markdown>
      </div>
    </div>
    <div class="mt-6 lg:mt-0" v-if="section.image">
      <slot name="image">
        <g-image width="500" :src="section.image"/>
      </slot>
    </div>
    <div class="flex-1" v-else/>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Title from "../components/Title.vue";

export default Vue.extend({
  components: {
    Title
  },
  props: ["section", "isReversed"]
});
</script>