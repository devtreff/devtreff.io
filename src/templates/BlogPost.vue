<page-query>
query BlogPost($path: String!) {
  blogPost(path: $path) {
    name
    content {
      hero_image
      hero_title
      hero_tagline
      hero_subtitle
      author
      title
      subtitle
      highlighted_links{
          _uid
          title
          source_name
          date
          link{
              url
          }
      }
      content_components
    }
  }
}
</page-query>

<template>
  <FullImageLayout
    :image="blogPost.content.hero_image"
    :has-vertical-gradient="true"
  >
    <template #hero>
      <div
        class="max-w-4xl w-full mx-auto p-4 pb-10 relative flex-1 justify-between flex flex-col"
      >
        <div />
        <div>
          <small class="italic"> {{ blogPost.content.hero_tagline }}</small>
          <h1 class="mt-8 text-5xl font-bold mb-0 leading-none">
            {{ blogPost.content.hero_title }}
          </h1>
          <small v-if="eventLocation" class="text-xl">{{
            blogPost.content.hero_subtitle
          }}</small>
        </div>
        <div class="flex justify-between">
          <FormatDate :date-string="eventDate" />

          <div>
            {{ blogPost.content.author }}
          </div>
        </div>
      </div>
    </template>
    <template #main>
      <div class="relative w-full pt-8 md:pt-20 overflow-hidden">
        <img
          src="../images/dots_big.svg"
          class="absolute top-0 z-1"
          :style="{ left: '-600px' }"
        />
        <img
          src="../images/dots_big.svg"
          class="absolute z-1"
          :style="{ right: '-600px', top: '50%' }"
        />
        <div class="max-w-4xl mx-auto z-10 relative">
          <div class="p-4">
            <h2 class="text-5xl font-bold mb-0 leading-none bg-white">
              {{ blogPost.content.title }}
            </h2>
            <small class="text-gray-700 bg-white">
              {{ blogPost.content.subtitle }}
            </small>
          </div>
          <div class="flex mt-4 md:mt-14">
            <div class="p-4 bg-white flex-1">
              <ContentComponentSelector
                v-for="(ContentComponentSelectorString, index) in blogPost
                  .content.content_components"
                :key="index"
                :content-component="ContentComponentSelectorString"
              />
            </div>
            <div class="hidden md:block p-4 py-1">
              <div class="flex w-48 content-box">
                <div class="w-1/4 h-10 p-1 -ml-1">
                  <a
                    href="https://www.facebook.com/devtreff/"
                    class="text-xl h-full bg-gray-100 flex justify-center items-center"
                  >
                    <font-awesome-icon :icon="['fab', 'facebook']" />
                  </a>
                </div>

                <div class="w-1/4 h-10 p-1">
                  <a
                    href="https://twitter.com/devtreffio"
                    class="text-xl h-full bg-gray-100 flex justify-center items-center"
                  >
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                  </a>
                </div>

                <div class="w-1/4 h-10 p-1">
                  <a
                    href="https://www.meetup.com/de-DE/devtreff-Amstetten/"
                    class="text-xl h-full bg-gray-100 flex justify-center items-center"
                  >
                    <font-awesome-icon :icon="['fab', 'meetup']" />
                  </a>
                </div>

                <div class="w-1/4 h-10 p-1 -mr-1">
                  <a
                    href="https://github.com/devtreff"
                    class="text-xl h-full bg-gray-100 flex justify-center items-center"
                  >
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </a>
                </div>
              </div>
              <div class="w-48">
                <a
                  v-for="highlightedLink in blogPost.content.highlighted_links"
                  :key="highlightedLink._uid"
                  :href="highlightedLink.link.url"
                  target="_blank"
                  class="bg-gray-100 block mt-4 p-4"
                >
                  <FormatDate
                    class="text-sm"
                    :date-string="highlightedLink.date"
                  />
                  <div class="mt-4 text-xl font-bold leading-none">
                    {{ highlightedLink.title }}
                  </div>
                  <div
                    class="mt-4 w-full text-sm flex justify-between items-center"
                  >
                    <span>{{ highlightedLink.source_name }}</span>
                    <i class="text-sm material-icons text-gray-500">launch</i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </FullImageLayout>
</template>

<script>
import ContentComponentSelector from "../content-components/ContentComponentSelector";

export default {
  components: {
    ContentComponentSelector
  },
  computed: {
    blogPost() {
      return this.$page.blogPost;
    },
    eventDate() {
      return this.blogPost.content.event
        ? this.blogPost.content.event.content.date
        : null;
    }
  }
};
</script>
