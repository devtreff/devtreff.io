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
          about
          facebook_url
          github_url
          twitter_url
          instagram_url
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
      <div class="flex flex-col items-center justify-center pb-16 flex-1">
        <div v-if="hasNextEvent" class="flex flex-col items-center">
          <div class="bg-orange-600 px-2 font-bold">
            Am
            <FormatDate :date-string="edition.nextEvent.content.date" />
          </div>
          <h1 class="mt-4 text-2xl md:text-4xl lg:text-5xl font-bold">
            {{ edition.nextEvent.name }}
          </h1>
        </div>
        <div v-else>
          <h1 class="mt-4 text-2xl md:text-4xl lg:text-5xl font-bold">
            {{ edition.name }}
          </h1>
        </div>
      </div>
    </template>
    <template #main>
      <SpeakerSection
        :speaker="edition.nextEvent ? edition.nextEvent.content.speaker : []"
      />
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
      <LocationSection
        :has-white-background="edition.content.sections.length % 2 != 0"
        :location="location"
      />
      <Map
        :lat="parseFloat(location.content.lat)"
        :lng="parseFloat(location.content.long)"
      />
    </template>
  </FullImageLayout>
</template>

<script>
import Title from "../components/Title.vue";
import Agenda from "../components/Agenda.vue";
import Map from "../components/Map.vue";
import SpeakerSection from "../components/SpeakerSection.vue";
import LocationSection from "../components/LocationSection.vue";

export default {
  components: {
    Title,
    Agenda,
    Map,
    SpeakerSection,
    LocationSection
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
