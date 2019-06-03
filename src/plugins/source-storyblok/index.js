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
    api.loadSource(args => this.fetchSections(args));
    api.loadSource(args => this.fetchEvents(args));
  }

  async fetchSections(store) {
    const { addContentType } = store;
    const { accessToken } = this.options;
    const client = new StoryblokClient({ accessToken });

    const response = await client.get("cdn/stories", {
      starts_with: "sections"
    });

    const sections = addContentType({
      typeName: "Section"
    });

    response.data.stories.forEach(story => {
      const sectionNode = {
        id: story.uuid,
        fields: {
          ...story,
          path: `${story.uuid}`
        },
        path: `${story.uuid}`
      };
      sections.addNode(sectionNode);
    });
  }

  async fetchEvents(store) {
    const { addContentType } = store;
    const { accessToken } = this.options;
    const client = new StoryblokClient({ accessToken });

    const response = await client.get("cdn/stories", {
      starts_with: "events",
      resolve_relations: "location"
    });

    const event = addContentType({ typeName: "Event" });

    response.data.stories.forEach(story => {
      const eventNode = {
        id: story.uuid,
        fields: {
          ...story,
          path: story.full_slug
        },
        path: story.full_slug
      };

      event.addNode(eventNode);
    });
  }
}

module.exports = StoryblokSource;
