import Vue from 'vue';
import Vuex from 'vuex';

import cars from './cars';
import authentication from './authentication';
import common from './common';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cars,
    authentication,
    common
  }
});

export default store;
