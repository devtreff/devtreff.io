import "./main.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import FullImageLayout from "~/layouts/FullImageLayout.vue";
import TitleLayout from "~/layouts/TitleLayout.vue";
import Section from "~/layouts/Section.vue";
import StoryblokVue from "storyblok-vue";
import VueSimpleMarkdown from "vue-simple-markdown";
import * as VueGoogleMaps from "vue2-google-maps";
import VModal from "vue-js-modal";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub,
  faMeetup
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ContentComponentSelector from "~/content-components/ContentComponentSelector.vue";
import FormatDate from "~/components/FormatDate.vue";

export default function(Vue, { head, isClient }) {
  Vue.use(StoryblokVue);
  Vue.use(VueSimpleMarkdown);
  Vue.use(VModal);
  Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.GRIDSOME_GOOGLE_MAPS_KEY,
      libraries: "places"
    }
  });

  library.add(faFacebook, faTwitter, faInstagram, faGithub, faMeetup);

  Vue.component("font-awesome-icon", FontAwesomeIcon);
  Vue.component("FullImageLayout", FullImageLayout);
  Vue.component("TitleLayout", TitleLayout);
  Vue.component("Section", Section);
  Vue.component("FormatDate", FormatDate);
  Vue.component("ContentComponentSelector", ContentComponentSelector);

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
