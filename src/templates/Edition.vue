<page-query>
query Edition($path: String!) {
  edition(path: $path) {
    name
    nextEvent{
      name
      content{
        hero_image
        date
        speaker{
          _uid
          name
          image
          topic_title
          topic_subtitle
          position
          company
        }
        agenda{
          _uid
          time
          title
          subtitle
        }
      }
    }
    content{
      hero_image
      sections{
        title
        body
        image
      }
      location{
        name
        content{
          title
          description
          city
          street
          postcode
          lat
          long
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
            Am
            <FormatDate :date-string="edition.nextEvent.content.date" />
          </div>
          <h1 class="mt-4 text-2xl md:text-4xl lg:text-5xl font-bold">
            {{ edition.nextEvent.name }}
          </h1>
        </div>
      </div>
    </template>
    <template #main>
      <section
        v-if="nextEventHasSpeakers"
        class="relative flex pt-8 pb-8 lg:py-16 items-center justify-end overflow-hidden flex-col bg-gray-200"
      >
        <div class="lg:max-w-4xl w-full px-5 z-10 bg-gray-200">
          <div class="mb-8">
            <Title class="lg:text-xl">Die Speaker</Title>
          </div>
        </div>
        <div class="max-w-4xl md:flex md:justify-center">
          <SpeakerTile
            v-for="speaker in edition.nextEvent.content.speaker"
            :key="speaker._uid"
            :speaker="speaker"
          />
        </div>
        <div class="mt-10">
          <a
            class="bg-gray-900 hover:bg-gray-800 text-white text-center px-6 py-1 inline-flex font-bold"
            href="mailto:contact@devtreff.io"
            >Bewirb dich als Speaker</a
          >
        </div>
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
          <Agenda :agenda="edition.nextEvent.content.agenda" />
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
        :class="[
          'relative flex pt-8 pb-8 lg:py-16 items-center justify-end overflow-hidden flex-col lg:flex-row',
          edition.content.sections.length % 2 == 0 ? 'bg-gray-200' : ''
        ]"
      >
        <div
          :class="[
            'lg:max-w-2xl w-full px-5 z-10 lg:pr-12',
            edition.content.sections.length % 2 == 0 ? 'bg-gray-200' : ''
          ]"
        >
          <div class="mb-8">
            <Title class="lg:text-xl">Die Location</Title>
          </div>
          <p class="text-gray-600">{{ location.content.city }}</p>
          <h1 class="text-4xl font-bold">{{ location.content.title }}</h1>
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
      <Map
        :lat="parseFloat(location.content.lat)"
        :lng="parseFloat(location.content.long)"
      />
    </template>
  </FullImageLayout>
</template>

<script>
import FormatDate from "../components/FormatDate.vue";
import Title from "../components/Title.vue";
import Agenda from "../components/Agenda.vue";
import Map from "../components/Map.vue";
import SpeakerTile from "../components/SpeakerTile.vue";

export default {
  components: {
    Title,
    FormatDate,
    Agenda,
    Map,
    SpeakerTile
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
    },
    nextEventHasSpeakers() {
      return this.hasNextEvent
        ? this.edition.nextEvent.content.speaker.length > 0
        : false;
    },
    coordinates() {
      return {
        lat: parseFloat(this.location.content.lat),
        lng: parseFloat(this.location.content.long)
      };
    }
  },
  mounted() {}
};
</script>
