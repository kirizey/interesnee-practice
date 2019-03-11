import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

Vue.use(VueRouter);

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
