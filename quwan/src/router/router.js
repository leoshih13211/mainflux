import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/Home.vue';
import routerGuard from './routerGuard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/app/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requireAuth: true },
      children: [
        {
          path: '/overview',
          name: 'Map',
          component: () => import(/* webpackChunkName: "dashboard" */ 'views/Overview.vue'),
          meta: { requireAuth: true },
        },
        {
          path: '/site',
          name: 'Site',
          component: () => import(/* webpackChunkName: "dashboard" */ 'views/Site.vue'),
          meta: { requireAuth: true },
          redirect: '/site/overview',
          children: [
            {
              path: 'overview',
              name: 'Overview',
              component: () => import(/* webpackChunkName: "dashboard" */ 'views/Site/Overview.vue'),
              meta: { requireAuth: true },
            },
            {
              path: 'devices',
              name: 'Devices',
              component: () => import(/* webpackChunkName: "dashboard" */ 'views/Site/Devices.vue'),
              meta: { requireAuth: true },
            },
            {
              path: 'gateway',
              name: 'Gateway',
              component: () => import(/* webpackChunkName: "dashboard" */ 'views/Site/Gateway.vue'),
              meta: { requireAuth: true },
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ 'views/Login.vue'),
      meta: { requireAuth: false },
    },
    { path: '/', redirect: '/app/' },
  ],
});

routerGuard(router);

export default router;
