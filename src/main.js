import Vue from 'vue';
import Element from 'element-ui';
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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
