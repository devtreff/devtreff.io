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
      <Section v-for="section in sections" :key="section.uuid" :title="section.title">
        <template #content>
          <p class="leading-relaxed">{{section.body}}</p>
        </template>
        <template #image>
          <g-image src="~/images/DevTreff3_09.jpg" width="500"/>
        </template>
      </Section>
      <Section title="Die Idee" :is-reversed="true">
        <template #content>
          <p class="leading-relaxed">
            Das DevTreff entstand aus der Idee, in der Region Mostviertel einen Entwicklerstammtisch
            ins Leben zu rufen und somit eine Plattform zum Erfahrungsaustausch für Programmierer zu schaffen.
          </p>
          <p class="mt-8 leading-relaxed">
            Neben den Vorträgen steht das lockere Netzwerken und Know-How Transfer im Vordergrund um Stück für Stück
            eine Community und Technologie-Szene im Raum Amstetten zu schaffen – und das an einem Ort,
            an dem gerade die Zukunft gestaltet wird – der Remise Amstetten.
            Das DevTreff findet 1 mal pro Quartal statt. Die Teilnahme ist kostenlos.
          </p>
        </template>
        <template #image>
          <g-image src="~/images/DevTreff3_07.jpg" width="500"/>
        </template>
      </Section>
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

<static-query>
query Section{
  allSection{
    edges {
      node {
        body
        title
      }
    }
  }
}
</static-query>

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
      return this.$static.allSection.edges.map(({ node }) => node);
    }
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
