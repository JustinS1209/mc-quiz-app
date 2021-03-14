import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import Question from './views/Question';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/question',
    name: 'question',
    component: Question,
  },
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
