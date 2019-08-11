<template>
  <modal
    :name="speaker._uid"
    width="100%"
    height="100%"
    classes="md:max-w-4xl bg-white mx-auto md:h-96 my-auto"
  >
    <div class="h-full flex flex-col md:flex-row">
      <div class="relative">
        <img
          class="z-10 md:h-full h-64 w-full md:w-160 object-cover"
          :src="
            speaker.image
              ? speaker.image
              : 'https://devtreff.io/src/img/webp/dummy.webp'
          "
        />
        <div
          class="md:hidden z-20 bg-gradient-t-black absolute top-0 right-0 h-12 left-0 opacity-50"
        />
      </div>
      <div class="absolute right-0 p-2 z-30 cursor-pointer" @click="close">
        <i class="material-icons text-white">close</i>
      </div>
      <div class="p-10 w-full">
        <small class="uppercase text-orange-500 font-bold tracking-widest"
          >Speaker</small
        >
        <div class="flex justify-between w-full">
          <h6 class="text-2xl font-bold uppercase tracking-widest">
            {{ speaker.name }}
          </h6>
          <div class="flex items-center text-xl">
            <a v-if="speaker.facebook_url" :href="speaker.facebook_url">
              <font-awesome-icon class="mx-2" :icon="['fab', 'facebook']" />
            </a>
            <a v-if="speaker.instagram_url" :href="speaker.instagram_url">
              <font-awesome-icon class="mx-2" :icon="['fab', 'instagram']" />
            </a>
            <a v-if="speaker.twitter_url" :href="speaker.twitter_url">
              <font-awesome-icon class="mx-2" :icon="['fab', 'twitter']" />
            </a>
            <a v-if="speaker.github_url" :href="speaker.github_url">
              <font-awesome-icon class="mx-2" :icon="['fab', 'github']" />
            </a>
          </div>
        </div>
        <div>{{ speaker.position }}</div>
        <div>{{ speaker.company }}</div>
        <div v-if="speaker.about" class="mt-8">
          <small
            class="block mb-2 uppercase text-orange-500 font-bold tracking-widest"
            >Über Mich</small
          >
          {{ speaker.about }}
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    speaker: {
      type: Object,
      required: true
    }
  },
  methods: {
    open() {
      this.$modal.show(this.speaker._uid);
    },
    close() {
      this.$modal.hide(this.speaker._uid);
    }
  }
};
</script>
