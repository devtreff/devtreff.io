<static-query>
query Section{
  allSection{
    edges {
      node {
        content {
          body
          title
          image
          _uid
          component
        }
      }
    }
  }
}
</static-query>

<template>
  <FullImageLayout image="/images/DevTreff3_35.jpg">
    <template #hero>
      <div class="max-w-2xl">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold pb-3 lg:pb-8">Der DevTreff</h1>
        <p class="leading-relaxed lg:leading-loose">
          Das DevTreff findet in der Remise Amstetten, am Gelände des Quartier A statt.
          Ein Ort an dem aktuell die Zukunft neu erfunden wird und deshalb ideal zu unseren
          innovativen Vorträgen rund um Technologien und Digitalisierung passt.
        </p>
        <div class="mt-6 lg:mt-8 flex justify-between lg:flex-row flex-col">
          <Button class="text-left flex-auto">
            <div class="font-bold">Amstetten</div>
            <div class="text-xs">16. Mai 2019</div>
          </Button>

          <Button class="text-left flex-auto">
            <div class="font-bold">Siegburg</div>
            <div class="text-xs">25. Juni 2019</div>
          </Button>

          <Button class="text-left flex-auto">
            <div class="font-bold">Archiv</div>
            <div class="text-xs">7 DevTreffs in den letzten 2 Jahren</div>
          </Button>
        </div>
      </div>
    </template>
    <template #main>
      <Section
        v-for="(section, index) in sections"
        :key="section._uid"
        :section="section"
        :is-reversed="index%2!=0"
      />
      <FullImage alt="Remise" src="/images/remise.webp" :hasVerticalGradient="true">
        <template #content>
          <div class="h-full flex flex-col items-center justify-end pb-16">
            <div class="bg-orange-600 px-2 font-bold">DevTreff am 16. Mai 2019</div>
            <h1 class="mt-4 text-4xl lg:text-5xl font-bold">Amstetten - Quartier A</h1>
            <Button class="mt-10" variant="hollow">Weitere Informationen</Button>
          </div>
        </template>
      </FullImage>
      <section class="py-16 lg:py-32">
        <div class="max-w-xl mx-auto relative" :style="{zIndex: 10}">
          <Title class="text-lg md:text-xl lg:text-4xl">Vergangene DevTreff</Title>
        </div>

        <ImageSlider>
          <g-image
            class="relative"
            src="~/images/DevTreff3_07.jpg"
            :style="{minWidth: '300px'}"
            width="300"
          />
          <g-image
            class="relative ml-4"
            src="~/images/DevTreff3_07.jpg"
            :style="{minWidth: '300px'}"
            width="300"
          />
          <g-image
            class="relative ml-4"
            src="~/images/DevTreff3_07.jpg"
            :style="{minWidth: '300px'}"
            width="300"
          />
          <g-image
            class="relative ml-4"
            src="~/images/DevTreff3_07.jpg"
            :style="{minWidth: '300px'}"
            width="300"
          />
          <g-image
            class="relative ml-4"
            src="~/images/DevTreff3_07.jpg"
            :style="{minWidth: '300px'}"
            width="300"
          />
        </ImageSlider>
      </section>
    </template>
  </FullImageLayout>
</template>

<script>
import Button from "~/components/Button.vue";
import FullImage from "~/components/FullImage.vue";
import Title from "~/components/Title.vue";
import ImageSlider from "~/components/ImageSlider.vue";

export default {
  components: {
    Button,
    Title,
    FullImage,
    ImageSlider
  },
  metaInfo: {
    title: "Hello, world!"
  },
  computed: {
    sections() {
      console.log(this.$static);
      return this.$static.allSection.edges.map(({ node }) => node.content);
    }
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
