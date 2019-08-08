<template>
  <Intersect @enter="setKeyListener" @leave="removeKeyListener">
    <div class="slider flex overflow-x-auto">
      <FullImage
        v-for="edition in editions"
        :key="edition.id"
        alt="Remise"
        :src="
          edition.nextEvent
            ? edition.nextEvent.content.hero_image
            : edition.content.hero_image
        "
        :has-vertical-gradient="true"
      >
        <template #content>
          <div class="h-full flex flex-col items-center justify-end pb-16">
            <div class="flex flex-col items-center">
              <div
                v-if="edition.nextEvent"
                class="bg-orange-600 px-2 font-bold"
              >
                {{ edition.nextEvent.name }} am
                <FormatDate :date-string="edition.nextEvent.content.date" />
              </div>
              <div class="mt-4 flex items-center">
                <i
                  :class="{
                    'opacity-25': index === 0,
                    'cursor-pointer': index !== 0
                  }"
                  class="material-icons text-5xl"
                  @click="scrollToSlide(index - 1)"
                  >chevron_left</i
                >
                <h1 class="lg:px-16 text-2xl lg:text-5xl font-bold">
                  {{ edition.content.location.content.city }} -
                  {{ edition.content.location.name }}
                </h1>
                <i
                  :class="{
                    'opacity-25': index === editions.length - 1,
                    'cursor-pointer': index !== editions.length - 1
                  }"
                  class="material-icons text-5xl"
                  @click="scrollToSlide(index + 1)"
                  >chevron_right</i
                >
              </div>
              <Button
                tag="a"
                :href="edition.full_slug"
                class="mt-10"
                variant="hollow"
                >Weitere Informationen</Button
              >
            </div>
          </div>
        </template>
      </FullImage>
    </div>
  </Intersect>
</template>

<script lang="ts">
import Vue from "vue";
import FullImage from "./FullImage.vue";
import Button from "./Button.vue";
import FormatDate from "./FormatDate.vue";

export default Vue.extend({
  components: {
    FullImage,
    Button,
    FormatDate
  },
  props: {
    editions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      index: 0,
      keyListener: null
    };
  },
  methods: {
    scrollToSlide(index) {
      const slider = this.$el;
      const scrollPosition = index * slider.clientWidth;
      slider.scrollTo({ left: scrollPosition, behavior: "smooth" });
    },
    onKeyDown(event) {
      let index = this.index;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        if (event.key === "ArrowRight") {
          index = index + 1;
        } else if (event.key === "ArrowLeft") {
          index = index - 1;
        }
        this.scrollToSlide(index % this.events.length);
      }
    },
    setKeyListener() {
      this.keyListener = window.addEventListener("keydown", this.onKeyDown);
    },
    removeKeyListener() {
      window.removeEventListener("keydown", this.onKeyDown);
      this.keyListener = null;
    }
  }
});
</script>

<style lang="scss">
.slider {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
}

.slider::-webkit-scrollbar {
  width: 0 !important;
}

.slider > * {
  scroll-snap-align: center;
}
</style>
