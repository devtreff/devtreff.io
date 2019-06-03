// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import "./main.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import 'vuetify/dist/vuetify.min.css';
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import FullImageLayout from "~/layouts/FullImageLayout.vue";
import TitleLayout from "~/layouts/TitleLayout.vue";
import Section from "~/layouts/Section.vue";
import StoryblokVue from "storyblok-vue";
import VueSimpleMarkdown from "vue-simple-markdown";

export default function(Vue, { router, head, isClient }) {
  Vue.use(StoryblokVue);
  Vue.use(VueSimpleMarkdown);

  Vue.component("FullImageLayout", FullImageLayout);
  Vue.component("TitleLayout", TitleLayout);
  Vue.component("Section", Section);

  if(isClient){
    import('vue-intersect').then(Intersect => {
      Vue.component("Intersect", Intersect.default);
    })
  }

  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Raleway:300,400,700&display=swap"
  });
}
