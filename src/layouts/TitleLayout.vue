<template>
  <div>
    <div class="container mx-auto px-4 pt-0 md:pt-4 lg:pt-6 xl:pt-8">
      <div class="flex flex-col h-full">
        <Header :is-black="true"/>
        <div class="flex-1 flex justify-center md:items-center mt-5 lg:mt-16">
          <div class="max-w-4xl">
            <Title class="text-2xl lg:text-4xl">Vergangene DevTreff</Title>
          </div>
        </div>
      </div>
    </div>
    <main class="main text-dark">
      <slot name="main"/>
    </main>
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
import Title from "../components/Title.vue";

export default Vue.extend({
  components: {
    Header,
    FullImage,
    Title
  },
  props: ["image", "title"]
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
