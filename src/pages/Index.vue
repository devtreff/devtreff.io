<static-query>
query{
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
  allEvent{
    edges{
      node{
        path
        name
        tag_list
        content{
          date
          teaser_image
          speaker{
            name
            topic_title
            topic_subtitle
          }
          location{
            name
            content {
              city
            }
          }
        }
      }
    }
  }
}
</static-query>

<template>
  <FullImageLayout :has-gradient="true" image="/images/DevTreff3_35.jpg">
    <template #hero>
      <div class="max-w-2xl">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold pb-3 lg:pb-8">
          Der DevTreff
        </h1>
        <p class="leading-relaxed lg:leading-loose">
          Das DevTreff findet in der Remise Amstetten, am Gelände des Quartier A
          statt. Ein Ort an dem aktuell die Zukunft neu erfunden wird und
          deshalb ideal zu unseren innovativen Vorträgen rund um Technologien
          und Digitalisierung passt.
        </p>
        <div class="mt-6 lg:mt-8 flex justify-between lg:flex-row flex-col">
          <Button
            v-for="event in upcomingEvents"
            :key="event.uuid"
            tag="a"
            class="text-left flex-auto"
            :href="event.path"
          >
            <div class="font-bold">
              {{ event.content.location.content.city }}
            </div>
            <div class="text-xs">
              <FormatDate :date-string="event.content.date" />
            </div>
          </Button>

          <Button tag="a" href="/archive" class="text-left flex-auto">
            <div class="font-bold">Archiv</div>
            <div class="text-xs">
              {{ pastEvents.length }} DevTreffs in den letzten 2 Jahren
            </div>
          </Button>
        </div>
      </div>
    </template>
    <template #main>
      <Section
        v-for="(section, index) in sections"
        :key="section.id"
        :section="section"
        :is-reversed="index % 2 != 0"
      />

      <EventSlider :events="mappedEvents" />

      <section class="py-16 lg:py-32 relative overflow-hidden">
        <img
          class="absolute z-0"
          src="../images/dots_big.svg"
          :style="{ height: '600px', left: '80px', top: '60px' }"
        />

        <div class="z-20 max-w-xl mx-auto relative">
          <Title class="text-lg md:text-xl lg:text-4xl"
            >Vergangene DevTreff</Title
          >
        </div>

        <div
          class="absolute z-10 bg-gray-200 lg:h-64"
          :style="{ width: '70%', left: '35%', top: '150px' }"
        />

        <ImageSlider class="relative z-10">
          <TeaserImage
            v-for="event in pastEvents"
            :key="event.id"
            :src="event.content.teaser_image"
            :title="event.content.location.content.city"
            :subtitle="formatDate(event.content.date)"
            class="relative"
          />
        </ImageSlider>
      </section>
    </template>
  </FullImageLayout>
</template>

<script>
import Button from "~/components/Button.vue";
import EventSlider from "~/components/EventSlider.vue";
import Title from "~/components/Title.vue";
import ImageSlider from "~/components/ImageSlider.vue";
import { DateTime } from "luxon";
import FormatDate from "~/components/FormatDate.vue";
import TeaserImage from "~/components/TeaserImage.vue";
import formatDate from "~/helpers/formatDate.ts";

export default {
  components: {
    Button,
    Title,
    ImageSlider,
    EventSlider,
    FormatDate,
    TeaserImage
  },
  metaInfo: {
    title: "DevTreff"
  },
  computed: {
    sections() {
      return this.$static.allSection.edges.map(({ node }) => node);
    },
    mappedEvents() {
      return this.$static.allEvent.edges.map(({ node }) => {
        const luxonDate = DateTime.fromFormat(
          node.content.date,
          "yyyy-MM-dd HH:mm"
        );
        return {
          ...node,
          luxonDate
        };
      });
    },
    pastEvents() {
      const upcoming = this.mappedEvents.filter(({ luxonDate }) => {
        const now = DateTime.local();
        return luxonDate < now;
      });

      return upcoming;
    },
    upcomingEvents() {
      const upcoming = this.mappedEvents.filter(({ luxonDate }) => {
        const now = DateTime.local();
        return luxonDate >= now;
      });

      return upcoming;
    }
  },
  methods: {
    formatDate
  }
};
</script>
