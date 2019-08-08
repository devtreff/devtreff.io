export default [
  {
    path: "/archive",
    component: () => import(/* webpackChunkName: "page--src--pages--archive-vue" */ "/Users/geraldurschitz/Projects/devtreff.io/src/pages/Archive.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/geraldurschitz/Projects/devtreff.io/src/pages/Index.vue")
  },
  {
    path: "/editions/amstetten",
    component: () => import(/* webpackChunkName: "page--src--templates--edition-vue" */ "/Users/geraldurschitz/Projects/devtreff.io/src/templates/Edition.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/geraldurschitz/Projects/devtreff.io/node_modules/gridsome/app/pages/404.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/geraldurschitz/Projects/devtreff.io/node_modules/gridsome/app/pages/404.vue")
  }
]

