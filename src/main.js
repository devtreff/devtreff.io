import "./main.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import FullImageLayout from "~/layouts/FullImageLayout.vue";
import TitleLayout from "~/layouts/TitleLayout.vue";
import Section from "~/layouts/Section.vue";
import StoryblokVue from "storyblok-vue";
import VueSimpleMarkdown from "vue-simple-markdown";
import * as VueGoogleMaps from "vue2-google-maps";
import VModal from "vue-js-modal/dist/ssr.index";
import "vue-js-modal/dist/styles.css";
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
import { VLazyImagePlugin } from "v-lazy-image";

export default function(Vue, { head, isClient }) {
  Vue.use(StoryblokVue);
  Vue.use(VueSimpleMarkdown);
  Vue.use(VLazyImagePlugin);
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

  head.link.push({
    rel: "preload",
    href: "assets/fonts/MaterialIcons-Regular.0509ab09.woff2",
    as: "font",
    type: "font/woff2",
    crossorigin: true
  });

  head.link.push({
    rel: "preconnect",
    href: "https://fonts.gstatic.com"
  });

  head.link.push({
    rel: "preconnect",
    href: "https://img2.storyblok.com"
  });

  head.meta.push({
    key: "language",
    name: "language",
    content: `DE`
  });

  head.meta.push({
    key: "robots",
    name: "robots",
    content: `index,follow`
  });

  head.meta.push({
    key: "og:title",
    name: "og:title",
    content: `DevTreff Amstetten`
  });

  head.meta.push({
    key: "og:site_name",
    name: "og:site_name",
    content: `DevTreff Amstetten`
  });

  head.meta.push({
    key: "og:url",
    name: "og:url",
    content: `https://devtreff.io/`
  });

  head.meta.push({
    key: "og:description",
    name: "og:description",
    content: `Das DevTreff ist eine Veranstaltung von und für ProgrammiererInnen von Software-Lösungen.`
  });

  head.meta.push({
    key: "og:image",
    name: "og:image",
    content: `https://a.storyblok.com/f/59562/1024x683/a28cc0fdb4/1_ewald_remise1-1024x683.jpg`
  });

  head.meta.push({
    key: "twitter:description",
    name: "twitter:description",
    content: `Das DevTreff ist eine Veranstaltung von und für ProgrammiererInnen von Software-Lösungen.`
  });
}
