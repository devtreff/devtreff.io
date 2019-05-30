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
      starts_with: "sections"
    });

    const sections = addContentType({
      typeName: "Section"
    });

    response.data.stories.forEach(story => {
      console.log(story);
      sections.addNode({ ...story, path: `${story.uuid}` });
    });
  }
}

module.exports = StoryblokSource;
