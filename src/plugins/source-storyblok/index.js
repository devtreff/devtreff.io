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
    api.loadSource(this.fetchSections.bind(this));
    api.loadSource(this.fetchEditions.bind(this));
    api.loadSource(this.fetchEvents.bind(this));
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

  async fetchEditions(store) {
    const client = this.getClient();

    const eventsResponse = await client.get("cdn/stories", {
      version,
      starts_with: "events",
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

        return {
          ...acc,
          [editionUUID]: event
        };
      },
      {}
    );

    const editionsResponse = await client.get("cdn/stories", {
      version,
      starts_with: "editions",
      resolve_relations: "location,section"
    });

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

  async fetchEvents(store) {
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

    const eventsResponse = await client.get("cdn/stories", {
      version,
      starts_with: "events",
      resolve_relations: "edition"
    });

    const stories = eventsResponse.data.stories.map(story => {
      const locationUUID = story.content.edition.content.location;
      const location = locationsMap[locationUUID];
      return produce(story, draft => {
        draft.content.edition.content.location = location;
      });
    });

    this.createStoryblokContentType({
      store,
      typeName: "Event",
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
