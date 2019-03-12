import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const API_URL = 'https://backend-jscamp.saritasa-hosting.com/api/cars';

const store = new Vuex.Store({
  state: {
    cars: null,
    paginationData: {},
    queryData: { page: 1, keyword: '', orderBy: null, sortOrder: null }
  },
  getters: {
    CARS: state => state.cars,
    PAGINATION_DATA: state => state.paginationData,
    QUERY_DATA: state => state.queryData
  },
  mutations: {
    SET_CARS: (state, payload) => (state.cars = payload),
    ADD_CAR: (state, payload) => [...state.cars, payload],
    SET_PAGINATION_DATA: (state, payload) => (state.paginationData = payload),
    SET_QUERY_DATA: (state, payload) => (state.queryData = payload)
  },
  actions: {
    GET_CARS: async (context, payload) => {
      const searchParams = new URLSearchParams();
      payload.page
        ? searchParams.append('page', payload.page)
        : searchParams.append('page', 1);

      payload.keyword
        ? searchParams.append('keyword', payload.keyword)
        : searchParams.append('keyword', '');

      if (payload.orderBy) {
        searchParams.append('order_by', payload.orderBy);
        payload.sortOrder
          ? searchParams.append('sort_order', payload.sortOrder)
          : searchParams.append('sort_order', 'asc');
      }

      let { data, status } = await axios.get(`${API_URL}?${searchParams}`);

      if (status === 200) {
        context.commit('SET_CARS', data.results);
        context.commit('SET_PAGINATION_DATA', data.pagination);
        context.commit('SET_QUERY_DATA', payload);
      }
    },

    SAVE_CAR: async (context, payload) => {
      let { data } = await axios.post(API_URL);
      context.commit('ADD_CAR', payload);
    },

    CHANGE_QUERY_DATA: (context, payload) => {
      context.commit('SET_QUERY_DATA', payload);
    }
  }
});

export default store;
