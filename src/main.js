// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import "./main.css";
import DefaultLayout from "~/layouts/Default.vue";
import FullImage from "~/layouts/FullImage.vue";

export default function(Vue, { router, head, isClient }) {
  Vue.component("Layout", DefaultLayout);
  Vue.component("FullImage", FullImage);

  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Raleway:300,400,700&display=swap"
  });
}
