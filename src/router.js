import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth/sig-in',
      component: () => import(/* webpackChunkName: "auth-signIn" */ './views/auth/SignIn.vue'),
    },
    {
      path: '/cloud',
      component: () => import(/* webpackChunkName: "page-cloud" */ './views/Cloud.vue'),
      children: [
        {
          path: '/',
          component: () => import(/* webpackChunkName: "page-cloud-dashboard" */ './views/cloud/Dashboard.vue'),
        },
        {
          path: '/cloud/media',
          component: () => import(/* webpackChunkName: "page-cloud-media" */ './views/cloud/Media.vue'),
        },
        {
          path: '/cloud/*',
          component: () => import(/* webpackChunkName: "page-error-404" */ './views/error/E404.vue'),
        },
      ],
    },
    {
      path: '/settings',
      component: () => import(/* webpackChunkName: "page-settings" */ './views/Settings.vue'),
      children: [
        {
          path: '/',
          component: () => import(/* webpackChunkName: "page-settings-dashboard" */ './views/settings/Dashboard.vue'),
        },
        {
          path: '/settings/basic-data/people/people',
          component: () => import(/* webpackChunkName: "page-settings-dashboard" */ './views/settings/basic-data/people/People.vue'),
        },
        {
          path: '/settings/*',
          component: () => import(/* webpackChunkName: "page-error-404" */ './views/error/E404.vue'),
        },
      ],
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "page-error-404" */ './views/error/E404.vue'),
    },
  ],
});
