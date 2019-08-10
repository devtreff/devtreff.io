<template>
  <div class="md:w-1/3 pt-4 md:pt-0 md:px-4">
    <img
      class="h-64 md:h-48 lg:h-64"
      :src="
        speaker.image
          ? speaker.image
          : 'https://devtreff.io/src/img/webp/dummy.webp'
      "
    />
    <h6 class="font-bold text-lg mt-3">{{ speaker.name }}</h6>
    <div>
      {{ speaker.position }}
    </div>
    <div>
      {{ speaker.company }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    speaker: {
      type: Object,
      required: true
    }
  }
};
</script>
