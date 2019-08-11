<template>
  <div>
    <div
      class="tile-container pt-10 md:pt-4 pb-4 md:px-4 cursor-pointer"
      @click="$refs.modal.open()"
    >
      <img
        class="h-64 md:h-48 lg:h-64"
        :src="
          speaker.image
            ? speaker.image
            : 'https://devtreff.io/src/img/webp/dummy.webp'
        "
      />
      <div class="title-container relative">
        <h6 class="mt-4 z-20 relative text-xl">
          {{ speaker.topic_title }}
        </h6>
        <div class="background z-10 absolute bg-orange-500" />
      </div>
      <div class="font-bold mt-3">{{ speaker.name }}</div>
      <div>
        {{ speaker.position }}
      </div>
      <div>
        {{ speaker.company }}
      </div>
    </div>
    <SpeakerModal ref="modal" :speaker="speaker" />
  </div>
</template>

<script>
import SpeakerModal from "./SpeakerModal";

export default {
  components: {
    SpeakerModal
  },
  props: {
    speaker: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .v--modal-overlay {
  background: rgba(0, 0, 0, 0.85);
}

/deep/ .v--modal-background-click {
  @apply flex justify-center items-center;
}

.tile-container {
  transition: all ease-in-out 0.3s;

  .title-container {
    .background {
      display: block;
      top: calc(100% - 3px);
      left: 0;
      right: 100%;
      bottom: 0;
      transition: right ease-in-out 0.1s;
    }
  }

  img {
    transition: transform ease-in-out 0.1s;
  }
  &:hover {
    .title-container {
      .background {
        right: 0;
      }
    }
    img {
      @apply shadow-lg;
      transform: scale(1.02);
    }
  }
}
</style>
