import Authentication from './pages/Authentication.vue';
import Dashboard from './pages/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/auth',
    name: 'auth',
    component: Authentication
  }
];

export default routes;
