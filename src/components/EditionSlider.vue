<template>
  <Intersect @enter="setKeyListener" @leave="removeKeyListener">
    <div class="slider flex overflow-x-auto">
      <FullImage
        v-for="(edition, editionIndex) in editions"
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
                class="bg-orange-600 px-2 font-bold text-center py-1"
              >
                {{ edition.nextEvent.name }} am
                <FormatDate :date-string="edition.nextEvent.content.date" />
              </div>
              <div class="mt-4 flex items-center">
                <i
                  :class="{
                    'opacity-25': editionIndex === 0,
                    'cursor-pointer': editionIndex !== 0
                  }"
                  class="material-icons text-5xl"
                  @click="scrollToSlide(editionIndex - 1)"
                  >chevron_left</i
                >
                <h1 class="lg:px-16 text-2xl lg:text-5xl font-bold">
                  {{ edition.content.name }}
                </h1>
                <i
                  :class="{
                    'opacity-25': editionIndex === editions.length - 1,
                    'cursor-pointer': editionIndex !== editions.length - 1
                  }"
                  class="material-icons text-5xl"
                  @click="scrollToSlide(editionIndex + 1)"
                  >chevron_right</i
                >
              </div>
              <Button
                tag="a"
                :href="edition.slug"
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

<script>
import FullImage from "./FullImage.vue";
import Button from "./Button.vue";

export default {
  components: {
    FullImage,
    Button
  },
  props: {
    editions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      keyListener: null
    };
  },
  methods: {
    scrollToSlide(index) {
      this.currentIndex = index;
      this.animateToSlide(this.currentIndex);
    },
    animateToSlide(index) {
      const slider = this.$el;
      const scrollPosition = index * slider.clientWidth;
      slider.scrollTo({ left: scrollPosition, behavior: "smooth" });
    },
    onKeyDown(event) {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        if (event.key === "ArrowRight") {
          this.scrollToSlide(this.currentIndex + 1);
        } else if (event.key === "ArrowLeft") {
          this.scrollToSlide(this.currentIndex - 1);
        }
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
};
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
