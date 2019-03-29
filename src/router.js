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
      path: '/cloud',
      component: () => import(/* webpackChunkName: "page-cloud" */ './views/Cloud.vue'),
      children: [
        {
          path: '/',
          component: () => import(/* webpackChunkName: "page-cloud-dashboard" */ './views/cloud/Dashboard.vue'),
        },
        {
          path: '/*',
          component: () => import(/* webpackChunkName: "page-error-404" */ './views/error/E404.vue'),
        },
      ],
    },
    {
      path: '/*',
      component: () => import(/* webpackChunkName: "page-error-404" */ './views/error/E404.vue'),
    },
  ],
});
