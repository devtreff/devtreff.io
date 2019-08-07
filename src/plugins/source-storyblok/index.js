/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */

const StoryblokClient = require("storyblok-js-client");

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
      starts_with: "sections"
    });

    this.createStoryblokContentType({
      store,
      typeName: "Section",
      stories: response.data.stories
    });
  }

  async fetchEditions(store) {
    const client = this.getClient();

    const response = await client.get("cdn/stories", {
      starts_with: "editions",
      resolve_relations: "location"
    });

    this.createStoryblokContentType({
      store,
      typeName: "Edition",
      stories: response.data.stories
    });
  }

  async fetchEvents(store) {
    const client = this.getClient();

    const response = await client.get("cdn/stories", {
      starts_with: "events",
      resolve_relations: "edition,location"
    });

    this.createStoryblokContentType({
      store,
      typeName: "Event",
      stories: response.data.stories
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
