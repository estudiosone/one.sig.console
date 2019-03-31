import Vue from 'vue';
import Element from 'element-ui';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'element-ui/lib/theme-chalk/index.css';
import TemplatePage from './components/TemplatePage.vue';
import TemplateSubPage from './components/TemplateSubPage.vue';

Vue.use(Element);
Vue.config.productionTip = false;
Vue.component('template-page', TemplatePage);
Vue.component('template-sub-page', TemplateSubPage);

const config = {
  apiKey: 'AIzaSyBehhP9ZngN_GaWSymivCWAP86p3sXG8AE',
  authDomain: 'one-sig-uy.firebaseapp.com',
  databaseURL: 'https://one-sig-uy.firebaseio.com',
  projectId: 'one-sig-uy',
  storageBucket: 'one-sig-uy.appspot.com',
  messagingSenderId: '1059330563850',
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
