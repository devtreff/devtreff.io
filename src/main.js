// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import "./main.css";
import FullImageLayout from "~/layouts/FullImageLayout.vue";
import TitleLayout from "~/layouts/TitleLayout.vue";
import Section from "~/layouts/Section.vue";

export default function(Vue, { router, head, isClient }) {
  Vue.component("FullImageLayout", FullImageLayout);
  Vue.component("TitleLayout", TitleLayout);
  Vue.component("Section", Section);

  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Raleway:300,400,700&display=swap"
  });
}
