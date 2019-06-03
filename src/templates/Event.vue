<page-query>
query Event($path: String!) {
  event(path: $path) {
    name
    content{
      date
      location{
        name
      }
    }
  }
}
</page-query>

<template>
  <FullImageLayout image="/images/remise.webp" :has-vertical-gradient="true">
    <template #hero>
      <div class="h-full flex flex-col items-center justify-end pb-16">
        <div class="bg-orange-600 px-2 font-bold">Am <FormatDate :date-string="event.content.date"/></div>
        <h1
          class="mt-4 text-4xl lg:text-5xl font-bold"
        >{{event.name}}</h1>
      </div>
    </template>
    <template #main></template>
  </FullImageLayout>
</template>

<script lang="ts">
import Vue from "vue";
import FullImage from "../components/FullImage.vue";
import FormatDate from "../components/FormatDate.vue";

export default Vue.extend({
  components: {
    FullImage,
    FormatDate
  },
  mounted() {
    console.log(this);
  },
  computed: {
    event() {
      return this.$page.event;
    }
  }
});
</script>
