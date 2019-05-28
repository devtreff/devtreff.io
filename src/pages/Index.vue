<template>
  <Layout>
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
    <template #main></template>
  </Layout>
</template>

<script>
import Button from "~/components/Button.vue";

export default {
  components: {
    Button
  },
  metaInfo: {
    title: "Hello, world!"
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
