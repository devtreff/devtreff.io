<template>
  <div>
    <FullImage :hasGradient="true" alt="DevTreff" :src="image">
      <template #content>
        <div class="h-full container mx-auto px-4 pt-0 md:pt-4 lg:pt-6 xl:pt-8">
          <div class="flex flex-col h-full">
            <Header/>
            <div class="flex-1 flex justify-center md:items-center">
              <div class="max-w-4xl w-full mt-5 lg:mt-0">
                <slot name="hero"/>
              </div>
            </div>
          </div>
        </div>
      </template>
    </FullImage>
    <main class="main text-dark">
      <slot name="main"/>
    </main>
    <footer class="bg-gray-900 text-white py-12">
      <div class="w-full flex justify-center">
        <div class="w-48 pb-12">
          <img src="/images/best-it-logo.png">
        </div>
      </div>
      <hr class="bg-gray-500 opacity-75 h-px max-w-4xl">
      <div class="font-bold flex justify-center text-xs pt-5">
        <g-link class="nav__link" to="/archive">Impressum</g-link>
        <g-link class="nav__link" to="/archive">DevTreff:Amstetten</g-link>
        <g-link class="nav__link" to="/archive">DevTreff:Siegburg</g-link>
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  metaData {
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
  props: ["image"]
});
</script>


<style>
html,
body {
  height: 100%;
}

body {
  font-family: "Raleway", sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

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
