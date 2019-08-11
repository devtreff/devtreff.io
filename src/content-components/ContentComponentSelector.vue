<template>
  <component
    :is="component"
    :content-component="parsedComponent"
    :class="parsedComponent.class"
  />
</template>

<script>
import changeCase from "change-case";
import Markdown from "./Markdown.vue";
import Grid from "./Grid.vue";
import FeatureGridItem from "./FeatureGridItem.vue";
import ContentTitle from "./ContentTitle.vue";

const components = {
  Markdown,
  Grid,
  FeatureGridItem,
  ContentTitle
};

export default {
  name: "ContentComponentSelector",
  components,
  props: {
    contentComponent: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    parsedComponent() {
      return typeof this.contentComponent === "string"
        ? JSON.parse(this.contentComponent)
        : this.contentComponent;
    },
    component() {
      const componentName = this.parsedComponent.component;
      return components[changeCase.pascalCase(componentName)];
    }
  }
};
</script>
