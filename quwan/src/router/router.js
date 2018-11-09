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
          path: '/org',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ 'views/Dashboard.vue'),
          meta: { requireAuth: true },
          children: [
            {
              path: '/',
              name: 'dashboard',
              component: () => import(/* webpackChunkName: "dashboard" */ 'views/Dashboard.vue'),
              meta: { requireAuth: true },
            },
          ],
        },
        {
          path: '/site',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ 'views/Dashboard.vue'),
          meta: { requireAuth: true },
          children: [

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
