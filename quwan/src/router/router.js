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
      redirect: '/app/worldmap',
      children: [
        {
          path: '/worldmap',
          name: 'WorldMap',
          component: () => import(/* webpackChunkName: "dashboard" */ 'views/WorldMap.vue'),
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
              name: 'Site_Overview',
              component: () => import(/* webpackChunkName: "dashboard" */ 'views/Sites/Overview.vue'),
              meta: { requireAuth: true },
            },
            {
              path: 'device',
              name: 'Device',
              component: () => import(/* webpackChunkName: "dashboard" */ 'views/Sites/Device.vue'),
              meta: { requireAuth: true },
            },
            {
              path: 'gateway',
              name: 'Gateway',
              component: () => import(/* webpackChunkName: "dashboard" */ 'views/Sites/Gateway.vue'),
              meta: { requireAuth: true },
            },
            {
              path: 'eventlog',
              name: 'EventLog',
              component: () => import(/* webpackChunkName: "dashboard" */ 'views/Sites/EventLog.vue'),
              meta: { requireAuth: true },
            },
          ],
        },
        {
          path: '/blank',
          name: 'Blank',
          component: () => import(/* webpackChunkName: "dashboard" */ 'views/_Blank.vue'),
          meta: { requireAuth: true },
        },
        {
          path: '/',
          redirect: '/blank',
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
  ],
});

routerGuard(router);

export default router;
