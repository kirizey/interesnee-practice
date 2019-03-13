import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import store from './store/index';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

Vue.use(VueRouter);
Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app');
