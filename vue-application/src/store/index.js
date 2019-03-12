import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const API_URL = 'https://backend-jscamp.saritasa-hosting.com/api/cars';
const LOGIN_API = 'https://backend-jscamp.saritasa-hosting.com/api/auth';

const store = new Vuex.Store({
  state: {
    cars: null,
    paginationData: {},
    queryData: { page: 1, keyword: '', orderBy: null, sortOrder: null },
    carsModalOptions: { opened: false, data: null },
    shanckbar: { visible: false, message: '' },
    userToken: { value: null, expirationTime: null }
  },
  getters: {
    CARS: state => state.cars,
    PAGINATION_DATA: state => state.paginationData,
    QUERY_DATA: state => state.queryData,
    CARS_MODAL_OPTIONS: state => state.carsModalOptions,
    SNACKBAR_OPTIONS: state => state.shanckbar,
    USER_TOKEN: state => state.userToken
  },
  mutations: {
    SET_CARS: (state, payload) => (state.cars = payload),
    ADD_CAR: (state, payload) => [...state.cars, payload],
    SET_PAGINATION_DATA: (state, payload) => (state.paginationData = payload),
    SET_QUERY_DATA: (state, payload) => (state.queryData = payload),
    SET_CARS_MODAL_OPTIONS: (state, payload) => (state.carsModalOptions = payload),
    SET_CARS_ARTER_DELETE_ONE: (state, payload) =>
      (state.cars = state.cars.filter(car => car.id !== payload)),
    SET_CARS_AFTER_UPDATE: (state, payload) => {
      let updatedCars = state.cars.map(car => {
        if (car.id === payload.id) {
          car = payload;
        }
      });
      state.cars = updatedCars;
    },
    TOGGLE_SNACKBAR: (state, payload) => {
      state.shanckbar = { visible: !state.shanckbar.visible, message: payload };
    },
    UPDATE_USER_TOKEN: (state, payload) => (state.userToken = { value: payload })
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

    CREATE_CAR: async (context, payload) => {
      let { data, status } = await axios.post(API_URL, payload);
      if (status === 200) {
        context.commit('ADD_CAR', data);
      }
    },

    CHANGE_QUERY_DATA: (context, payload) => {
      context.commit('SET_QUERY_DATA', payload);
    },

    CHANGE_CARS_MODAL_OPTIONS: (context, payload) => {
      context.commit('SET_CARS_MODAL_OPTIONS', payload);
    },

    DELETE_CAR: async (context, payload) => {
      try {
        let { data, status } = await axios.delete(`${API_URL}/${payload}`);

        if (status === 204) {
          context.commit('SET_CARS_ARTER_DELETE_ONE', payload);
        }
      } catch (error) {
        context.commit('TOGGLE_SNACKBAR', error);

        setTimeout(() => {
          context.commit('TOGGLE_SNACKBAR', error);
        }, 2000);
      }
    },

    UPDATE_CAR: async (context, payload) => {
      let { data, status } = await axios.put(`${API_URL}/${payload.id}`, payload);
      if (status === 200) {
        context.commit('SET_CARS_AFTER_UPDATE', data);
      }
    },

    LOGIN: async (context, payload) => {
      let { data, status } = await axios.post(LOGIN_API, payload);

      if (status === 200) {
        context.commit('UPDATE_USER_TOKEN', data);
      }
    },
    LOGOUT: async (context, payload) => {
      context.commit('UPDATE_USER_TOKEN', payload);
    }
  }
});

export default store;
