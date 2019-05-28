export default [
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/geraldurschitz/Projects/devtreff/devtreff.io/src/pages/About.vue")
  },
  {
    path: "/archive",
    component: () => import(/* webpackChunkName: "page--src--pages--archive-vue" */ "/Users/geraldurschitz/Projects/devtreff/devtreff.io/src/pages/Archive.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/geraldurschitz/Projects/devtreff/devtreff.io/src/pages/Index.vue")
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/geraldurschitz/Projects/devtreff/devtreff.io/node_modules/gridsome/app/pages/404.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/geraldurschitz/Projects/devtreff/devtreff.io/node_modules/gridsome/app/pages/404.vue")
  }
]

