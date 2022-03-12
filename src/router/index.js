import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'TheMain',
    component: () => import(/* webpackChunkName: "TheMain" */ '../views/TheMain.vue'),
  },
  {
    path: '',
    name: 'TheMain',
        component: () => import(/* webpackChunkName: "TheMain" */ '../views/TheMain.vue'),

  },
  {
    path: '/watch/:kpid',
    name: 'Watch',
        component: () => import(/* webpackChunkName: "Watch" */ '../views/Watch.vue'),

  },
  {
    path: '/auth',
    name: 'Auth',
        component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue'),

  },
  {
    path: '/profile',
    name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/UserCabinet.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/registration',
    name: 'Registration',
        component: () => import(/* webpackChunkName: "Registration" */ '../views/Registration.vue'),

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
