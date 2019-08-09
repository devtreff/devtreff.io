// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import "./main.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
// import 'vuetify/dist/vuetify.min.css';
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import FullImageLayout from "~/layouts/FullImageLayout.vue";
import TitleLayout from "~/layouts/TitleLayout.vue";
import Section from "~/layouts/Section.vue";
import StoryblokVue from "storyblok-vue";
import VueSimpleMarkdown from "vue-simple-markdown";
import * as VueGoogleMaps from "vue2-google-maps";

export default function(Vue, { head, isClient }) {
  Vue.use(StoryblokVue);
  Vue.use(VueSimpleMarkdown);
  Vue.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyD91vSInVKU9NDIS-gCirHUHP3JWV2FOXk",
      libraries: "places" // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)

      //// If you want to set the version, you can do so:
      // v: '3.26',
    }

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
  });

  Vue.component("FullImageLayout", FullImageLayout);
  Vue.component("TitleLayout", TitleLayout);
  Vue.component("Section", Section);

  if (isClient) {
    import("vue-intersect").then(Intersect => {
      Vue.component("Intersect", Intersect.default);
    });
  }

  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Raleway:300,400,700&display=swap"
  });
}
