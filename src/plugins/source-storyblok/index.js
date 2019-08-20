/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */

const StoryblokClient = require("storyblok-js-client");
const produce = require("immer").produce;
const { DateTime } = require("luxon");

const version = process.env.GRIDSOME_STORYBLOK_VERSION;
class StoryblokSource {
  static defaultOptions() {
    return {
      typeName: "StoryblokSource",
      accessToken: undefined
    };
  }

  constructor(api, options) {
    this.options = options;
    api.loadSource(this.fetchSpeakers.bind(this));
    api.loadSource(this.fetchSections.bind(this));
    api.loadSource(this.fetchEditions.bind(this));
    api.loadSource(this.fetchEvents.bind(this));
    api.loadSource(this.fetchBlogPosts.bind(this));
  }

  getClient() {
    const { accessToken } = this.options;
    return new StoryblokClient({ accessToken });
  }

  async fetchSections(store) {
    const client = this.getClient();

    const response = await client.get("cdn/stories", {
      version,
      starts_with: "sections"
    });

    this.createStoryblokContentType({
      store,
      typeName: "MainSection",
      stories: response.data.stories
    });
  }

  async fetchSpeakers(store) {
    const client = this.getClient();

    const speakersResponse = await client.get("cdn/stories", {
      version,
      starts_with: "speakers"
    });

    const stories = speakersResponse.data.stories.map(story => story);

    return this.createStoryblokContentType({
      store,
      typeName: "Speaker",
      stories
    });
  }

  async getEditions() {
    const client = this.getClient();

    const editionsResponse = await client.get("cdn/stories", {
      version,
      starts_with: "editions",
      resolve_relations: "location,section"
    });

    return editionsResponse;
  }

  async getEditionsMap() {
    const editionsResponse = await this.getEditions();

    const editionsMap = editionsResponse.data.stories.reduce((acc, edition) => {
      return {
        ...acc,
        [edition.uuid]: edition
      };
    }, {});

    return editionsMap;
  }

  async fetchEditions(store) {
    const client = this.getClient();

    const eventsResponse = await client.get("cdn/stories", {
      version,
      starts_with: "events",
      resolve_relations: "location",
      filter_query: {
        date: {
          "gt-date": DateTime.fromObject({ zone: "Europe/Vienna" }).toISODate()
        }
      }
    });

    const nextEventsEditionMap = eventsResponse.data.stories.reduce(
      (acc, event) => {
        const editionUUID = event.content.edition;
        const eventDate = DateTime.fromISO(event.content.date);

        if (acc[editionUUID]) {
          const oldEventDate = DateTime.fromISO(acc[editionUUID].content.date);

          if (oldEventDate > eventDate) {
            return acc;
          }
        }

        const nextEvent = produce(event, draft => {
          draft.content.speaker_slots = draft.content.speaker_slots.map(
            ({ speaker, ...rest }) => {
              return {
                ...rest,
                speaker: store
                  .getContentType("Speaker")
                  .findNode({ id: speaker }).content
              };
            }
          );
        });

        return {
          ...acc,
          [editionUUID]: nextEvent
        };
      },
      {}
    );

    const editionsResponse = await this.getEditions();

    const stories = editionsResponse.data.stories.map(story => {
      return produce(story, draft => {
        draft.nextEvent = nextEventsEditionMap[story.uuid];
      });
    });

    this.createStoryblokContentType({
      store,
      typeName: "Edition",
      stories
    });
  }

  async getLocationsMap() {
    const client = this.getClient();

    const locationsResponse = await client.get("cdn/stories", {
      version,
      starts_with: "locations"
    });

    const locationsMap = locationsResponse.data.stories.reduce(
      (acc, location) => {
        return {
          ...acc,
          [location.uuid]: location
        };
      },
      {}
    );

    return locationsMap;
  }

  async fetchEvents(store) {
    const client = this.getClient();

    const locationsMap = await this.getLocationsMap();

    const eventsResponse = await client.get("cdn/stories", {
      version,
      starts_with: "events",
      resolve_relations: "edition,blog_post"
    });

    const stories = eventsResponse.data.stories.map(story => {
      const edition = story.content.edition;
      const locationUUID = edition ? edition.content.location : null;
      const location = locationUUID ? locationsMap[locationUUID] : null;
      return produce(story, draft => {
        if (location) {
          draft.content.edition.content.location = location;
        }
      });
    });

    this.createStoryblokContentType({
      store,
      typeName: "Event",
      stories
    });
  }

  async fetchBlogPosts(store) {
    const client = this.getClient();

    const blogPostsResponse = await client.get("cdn/stories", {
      version,
      starts_with: "blog-posts",
      resolve_relations: "event"
    });

    const stories = blogPostsResponse.data.stories.map(story => {
      return produce(story, draft => {
        draft.content.content_components = draft.content.content_components.map(
          contentComponent => JSON.stringify(contentComponent)
        );
      });
    });

    this.createStoryblokContentType({
      store,
      typeName: "BlogPost",
      stories
    });
  }

  createStoryblokContentType({ store, typeName, stories }) {
    const { addContentType } = store;
    const contentType = addContentType({ typeName });

    stories.forEach(story => {
      const editionNode = {
        id: story.uuid,
        fields: {
          ...story,
          path: story.full_slug
        },
        path: story.full_slug
      };

      contentType.addNode(editionNode);
    });
  }
}

module.exports = StoryblokSource;
