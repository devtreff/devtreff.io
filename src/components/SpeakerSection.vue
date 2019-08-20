<template>
  <section
    v-if="speakerSlots.length > 0"
    class="relative flex pt-8 pb-8 lg:py-16 items-center justify-end overflow-hidden flex-col bg-gray-200"
  >
    <div class="lg:max-w-4xl w-full px-5 z-10 bg-gray-200">
      <div class="mb-8">
        <Title class="lg:text-xl">Die Speaker</Title>
      </div>
    </div>
    <div class="w-full max-w-4xl md:flex md:justify-center">
      <SpeakerTile
        v-for="speakerSlot in speakerSlots"
        :key="speakerSlot.speaker._uid"
        class="md:w-1/3 w-64 mx-auto"
        :speaker-slot="speakerSlot"
      />
    </div>
    <div class="mt-10">
      <SpeakerApplicationButton />
    </div>
  </section>
  <section
    v-else
    class="relative flex pt-8 pb-8 lg:py-16 items-center justify-end overflow-hidden flex-col lg:flex-row bg-gray-200"
  >
    <div class="lg:max-w-2xl w-full px-5 z-10 bg-gray-200 lg:pr-12">
      <div class="mb-8">
        <Title class="lg:text-xl">Die Speaker</Title>
      </div>
      <p class="font-bold mb-8">
        Für den kommenden DevTreff werden noch Speaker-Anfragen
        entgegengenommen.
      </p>
      <p class="mb-8">
        Wir versuchen stets die besten Speaker und die passendsten Themen
        zusammenzustellen um den Abend optimal auszunutzen und den Zuschauern
        eine breite Palette an Themen zu bieten.
      </p>
      <SpeakerApplicationButton />
    </div>
    <div :style="{ 'max-width': '500px' }" class="flex-1"></div>
  </section>
</template>

<script>
import Title from "./Title";
import SpeakerTile from "./SpeakerTile";
import SpeakerApplicationButton from "./SpeakerApplicationButton";

export default {
  components: {
    Title,
    SpeakerTile,
    SpeakerApplicationButton
  },
  props: {
    speakerSlots: {
      type: Array,
      required: true
    }
  }
};
</script>
