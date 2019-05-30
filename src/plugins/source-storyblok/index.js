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
    api.loadSource(args => this.fetchContent(args));
  }

  async fetchContent(store) {
    const { addContentType } = store;
    const { accessToken } = this.options;

    const client = new StoryblokClient({ accessToken });
    const response = await client.get("cdn/stories", {
      filter_query: {
        component: {
          in: "section"
        }
      }
    });

    const sections = addContentType({
      typeName: "Section"
    });

    response.data.stories.forEach(story => {
      sections.addNode({
        uuid: story.uuid,
        body: story.content.body,
        title: story.content.title
      });
    });
  }
}

module.exports = StoryblokSource;
