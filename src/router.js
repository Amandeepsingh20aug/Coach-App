import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './Pages/coaches/CoachDetail.vue';
import CoachesList from './Pages/coaches/CoachesList.vue';
import CoachRegister from './Pages/coaches/CoachRegister.vue';
import ContactChoach from './Pages/requests/ContactCoach.vue';
import RequestRecieved from './Pages/requests/RequestRecieved.vue';
import NotFound from './Pages/NotFound.vue';
import UserAuth from './Pages/auth/UserAuth.vue';
import store from './vuex/index.js';

const routing = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactChoach,
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestRecieved,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

routing.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['coaches/isAuthenticated']) {
    next('/auth');
  } else if (
    to.meta.requiresUnauth &&
    store.getters['coaches/isAuthenticated']
  ) {
    next('/coaches');
  } else {
    next();
  }
});

export default routing;
