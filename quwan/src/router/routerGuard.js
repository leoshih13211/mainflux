import { authorization } from 'common/utilities';


export default function (router) {
  router.beforeEach((to, from, next) => {
    if (!('requireAuth' in to.meta)) next({ path: '/' });
    if (to.meta.requireAuth) {
      if (!authorization()) next({ path: '/login' });
      else next();
    } else if (authorization()) next({ path: '/' });
    else next();
  });
}
