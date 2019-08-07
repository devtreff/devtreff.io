<template>
  <span>{{ formattedDate }}</span>
</template>

<script lang="ts">
import Vue from "vue";
import formatDate from "../helpers/formatDate.ts";

export default Vue.extend({
  props: {
    dateString: {
      type: String,
      required: true
    },
    parseFormat: {
      type: String,
      default: "yyyy-MM-dd HH:mm"
    },
    format: {
      type: String,
      default: "d. LLLL yyyy"
    }
  },
  computed: {
    formattedDate() {
      const { dateString, parseFormat, format } = this;
      return formatDate(dateString, { parseFormat, format });
    }
  }
});
</script>
