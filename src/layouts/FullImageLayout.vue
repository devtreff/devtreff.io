<template>
  <div>
    <FullImage
      :has-gradient="hasGradient"
      :has-vertical-gradient="hasVerticalGradient"
      alt="DevTreff"
      :src="image"
    >
      <template #content>
        <div class="h-full container mx-auto px-4 pt-0 md:pt-4 lg:pt-6 xl:pt-8">
          <div class="flex flex-col h-full">
            <Header />
            <slot name="hero" />
          </div>
        </div>
      </template>
    </FullImage>
    <main class="main text-dark">
      <slot name="main" />
    </main>
    <footer class="bg-gray-900 text-white py-12 z-10 relative">
      <div class="w-full flex justify-center">
        <div class="w-48 pb-12">
          <img
            alt="Das Logo von best it eCommerce solutions"
            src="/images/best-it-logo.png"
          />
        </div>
      </div>
      <hr class="bg-gray-500 opacity-75 h-px max-w-4xl" />
      <div class="font-bold flex flex-wrap justify-center text-xs pt-5">
        <a href="#" class="nav__link my-2" @click="showImprintModal"
          >Impressum</a
        >
        <g-link class="nav__link my-2" to="/amstetten"
          >DevTreff:Amstetten</g-link
        >
        <g-link class="nav__link my-2" to="/muensterland"
          >DevTreff:Münsterland</g-link
        >
        <g-link class="nav__link my-2" to="/siegburg">DevTreff:Siegburg</g-link>
      </div>
    </footer>
    <modal
      name="imprint"
      width="100%"
      height="100%"
      classes="md:max-w-4xl bg-white mx-auto md:h-96 my-auto"
    >
      <div class="text-gray-900 p-5">
        <h3 class="text-3xl font-bold">Impressum</h3>
        <p class="mt-5">
          <strong>best it E-Commerce GmbH</strong>
          <br />Linzer Straße 12 <br />3300 Amstetten
        </p>
        <p class="mt-5">
          Telefon: +43 7472 909 00
          <br />E-Mail:
          <a href="mailto:info@bestit-online.at">info@bestit-online.at</a>
        </p>
        <a class="block mt-8 underline" href="#" @click="closeImprintModal"
          >Schließen</a
        >
      </div>
    </modal>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    coverImage
  }
}
</static-query>

<script lang="ts">
import Vue from "vue";
import Header from "../components/Header.vue";
import FullImage from "../components/FullImage.vue";

export default Vue.extend({
  components: {
    Header,
    FullImage
  },
  props: {
    image: {
      type: String,
      required: true
    },
    hasVerticalGradient: {
      type: Boolean,
      default: false
    },
    hasGradient: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showImprintModal() {
      this.$modal.show("imprint");
    },
    closeImprintModal() {
      this.$modal.hide("imprint");
    }
  }
});
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}

.container {
  z-index: 20;
}

.logo {
  width: 20px;
  height: 20px;
}
</style>
