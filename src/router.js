import Vue from 'vue';
import firebase from 'firebase';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        auth: {
          auth: true,
        },
      },
    },
    {
      path: '/auth/sign-in',
      component: () => import(/* webpackChunkName: "auth-signIn" */ './views/auth/SignIn.vue'),
    },
    {
      path: '/marketing',
      component: () => import(/* webpackChunkName: "page-marketing" */ './views/Marketing.vue'),
      children: [
        {
          path: '/',
          component: () => import(/* webpackChunkName: "page-marketing-dashboard" */ './views/marketing/Dashboard.vue'),
          meta: {
            auth: {
              auth: true,
              right: 'marketing',
            },
          },
        },
        {
          path: '/marketing/campaign-list',
          component: () => import(/* webpackChunkName: "page-marketing-campaign-list" */ './views/marketing/CampaignList.vue'),
          meta: {
            auth: {
              auth: true,
              right: 'marketing-campaign-list',
            },
          },
        },
        {
          path: '/marketing/campaign-detail',
          component: () => import(/* webpackChunkName: "page-marketing-campaign-detail" */ './views/marketing/CampaignDetail.vue'),
          meta: {
            auth: {
              auth: true,
              right: 'marketing-campaign-list',
            },
          },
        },
        {
          path: '/marketing/prospects',
          component: () => import(/* webpackChunkName: "page-marketing-prospects" */ './views/marketing/Prospects.vue'),
          meta: {
            auth: {
              auth: true,
              right: 'marketing-prospects',
            },
          },
        },
      ],
    },
    {
      path: '/cloud',
      component: () => import(/* webpackChunkName: "page-cloud" */ './views/Cloud.vue'),
      children: [
        {
          path: '/',
          component: () => import(/* webpackChunkName: "page-cloud-dashboard" */ './views/cloud/Dashboard.vue'),
          meta: {
            auth: {
              auth: true,
            },
          },
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
          path: '/settings/basic-data/people/people-list',
          component: () => import(/* webpackChunkName: "page-settings-basic-data-people-people" */ './views/settings/basic-data/people/People.vue'),
        },
        {
          path: '/settings/basic-data/people/people-detail',
          component: () => import(/* webpackChunkName: "page-settings-basic-data-people-people-detail" */ './views/settings/basic-data/people/PeopleDetail.vue'),
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

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  if (to.meta.auth) {
    if (to.meta.auth.auth) {
      if (currentUser === null) {
        next({
          path: '/auth/sign-in',
          query: { redirect: to.fullPath },
        });
      } else if (to.meta.auth.right) {
        console.info('se verificara que tenga el permiso');
        next();
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
