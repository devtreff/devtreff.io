<page-query>
query Edition($path: String!) {
  edition(path: $path) {
    name
    nextEvent{
      name
      content{
        hero_image
        date
      }
    }
    content{
      hero_image
      sections{
        title
        body
      }
      location{
        name
        content{
          title
          description
          city
          street
          postcode
        }
      }
    }
  }
}
</page-query>

<template>
  <FullImageLayout
    :image="
      hasNextEvent
        ? edition.nextEvent.content.hero_image
        : edition.content.hero_image
    "
    :has-vertical-gradient="true"
  >
    <template #hero>
      <div class="flex h-full flex-col items-center justify-center pb-16">
        <div v-if="hasNextEvent" class="flex flex-col items-center">
          <div class="bg-orange-600 px-2 font-bold">
            Am <FormatDate :date-string="edition.nextEvent.content.date" />
          </div>
          <h1 class="mt-4 text-2xl md:text-4xl lg:text-5xl font-bold">
            {{ edition.nextEvent.name }}
          </h1>
        </div>
      </div>
    </template>
    <template #main>
      <section
        v-if="hasNextEvent"
        class="relative flex pt-8 pb-8 lg:py-16 items-center justify-end overflow-hidden flex-col lg:flex-row bg-gray-200"
      >
        <div class="lg:max-w-2xl w-full px-5 z-10 bg-gray-200 lg:pr-12">
          <div class="mb-8">
            <Title class="lg:text-xl">Die Speaker</Title>
          </div>
        </div>
        <div :style="{ 'max-width': '500px' }" class="flex-1"></div>
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
            zusammenzustellen um den Abend optimal auszunutzen und den
            Zuschauern eine breite Palette an Themen zu bieten.
          </p>
          <a
            class="bg-gray-900 hover:bg-gray-800 text-white text-center px-6 py-1 inline-flex font-bold"
            href="mailto:contact@devtreff.io"
            >Bewirb dich als Speaker</a
          >
        </div>
        <div :style="{ 'max-width': '500px' }" class="flex-1"></div>
      </section>
      <section
        v-if="hasNextEvent"
        class="relative flex pt-8 pb-8 lg:py-16 items-center justify-end overflow-hidden flex-col lg:flex-row"
      >
        <div class="lg:max-w-2xl w-full px-5 z-10 lg:pr-12">
          <div class="mb-8">
            <Title class="lg:text-xl">Ablauf</Title>
          </div>
        </div>
        <div :style="{ 'max-width': '500px' }" class="flex-1"></div>
      </section>
      <Section
        v-for="(section, index) in edition.content.sections"
        :key="section.id"
        :description="section.body"
        :title="section.title"
        :image="section.image"
        :is-reversed="index % 2 != 0"
        :has-white-background="hasNextEvent ? index % 2 != 0 : index % 2 != 1"
        :show-dots="true"
      />
      <section
        class="relative flex pt-8 pb-8 lg:py-16 items-center justify-end overflow-hidden flex-col lg:flex-row bg-gray-200"
      >
        <div class="lg:max-w-2xl w-full px-5 z-10 bg-gray-200 lg:pr-12">
          <div class="mb-8">
            <Title class="lg:text-xl">Die Location</Title>
          </div>
          <p class="text-gray-600">
            {{ location.content.city }}
          </p>
          <h1 class="text-4xl font-bold">
            {{ location.content.title }}
          </h1>
          <div class="whitespace-pre-line leading-relaxed">
            <vue-simple-markdown
              class="markdown-container"
              :source="location.content.description"
            ></vue-simple-markdown>
          </div>
          <p class="text-gray-600 pt-5">
            {{ location.content.street }}, {{ location.content.postcode }}
            {{ location.content.city }}
          </p>
        </div>
        <div :style="{ 'max-width': '500px' }" class="flex-1"></div>
      </section>
    </template>
  </FullImageLayout>
</template>

<script>
import FormatDate from "../components/FormatDate.vue";
import Title from "../components/Title.vue";

export default {
  components: {
    Title,
    FormatDate
  },
  computed: {
    edition() {
      return this.$page.edition;
    },
    location() {
      return this.edition.content.location;
    },
    hasNextEvent() {
      return !!this.edition.nextEvent;
    }
  },
  mounted() {}
};
</script>
