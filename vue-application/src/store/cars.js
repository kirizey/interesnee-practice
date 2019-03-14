import axios from 'axios';

import store from './index';

const API_WITH_AUTH_URL =
  'https://backend-jscamp.saritasa-hosting.com/api/with-auth/cars';

const state = {
  cars: null,
  paginationData: {},
  queryData: { page: 1, keyword: '', orderBy: null, sortOrder: null },
  carsModalOptions: { opened: false, data: null }
};

const getters = {
  CARS: state => state.cars,
  PAGINATION_DATA: state => state.paginationData,
  QUERY_DATA: state => state.queryData,
  CARS_MODAL_OPTIONS: state => state.carsModalOptions
};

const mutations = {
  /**
   * Set cars list state by new data
   * @param {object} state store state
   * @param {array} payload got cars array
   */
  SET_CARS: (state, payload) => (state.cars = payload),

  /**
   * Add new one car to state
   * @param {object} state store state
   * @param {object} payload got new car
   */
  ADD_CAR: (state, payload) => [...state.cars, payload],

  /**
   * Set pagination data in state
   * @param {object} state store state
   * @param {object} payload got pagination data
   */
  SET_PAGINATION_DATA: (state, payload) => (state.paginationData = payload),

  /**
   * Set query data for GET request
   * @param {object} state store state
   * @param {object} payload Object with params to GET request
   */
  SET_QUERY_DATA: (state, payload) => (state.queryData = payload),

  /**
   * Set options of modal window
   * @param {object} state store state
   * @param {object} payload got options for modal window
   */
  SET_CARS_MODAL_OPTIONS: (state, payload) => (state.carsModalOptions = payload),

  /**
   * Remove selected car from state
   * @param {object} state store state
   * @param {object} payload id of car for delete
   */
  REMOVE_CAR: (state, payload) =>
    (state.cars = state.cars.filter(car => car.id !== payload)),

  /**
   * Update data of selected car
   * @param {object} state store state
   * @param {object} payload sent new car's data
   */
  SET_CAR_UPDATE: (state, payload) => {
    state.cars.map(car => {
      if (car.id === payload.id) {
        car.body_type = payload.body_type;
        car.car_model_id = payload.car_model_id;
        car.make_id = payload.make_id;
        car.year = payload.year;
        car.mileage = payload.mileage;
        car.description = payload.description;
      }
    });
  }
};

const actions = {
  /**
   * Common action for GET request to get cars by specified parameters
   * @param {object} context store
   * @param {object} payload options for GET request
   */
  GET_CARS: async (context, payload) => {
    const userToken = localStorage.getItem('userToken');

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

    try {
      const { data, status } = await axios.get(`${API_WITH_AUTH_URL}?${searchParams}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (status === 200) {
        context.commit('SET_CARS', data.results);
        context.commit('SET_PAGINATION_DATA', data.pagination);
        context.commit('SET_QUERY_DATA', payload);
      }
    } catch (error) {
      context.commit('SET_SNACKBAR_OPTIONS', 'Network error...');

      if (error.response.status === 503) {
        return store.dispatch('GET_CARS', payload);
      }
    }
  },

  /**
   * Action used API to send POST request and create car
   * @param {object} context store
   * @param {object} payload new car's data
   */
  CREATE_CAR: async (context, payload) => {
    try {
      const userToken = localStorage.getItem('userToken');

      const { data, status } = await axios.post(API_WITH_AUTH_URL, payload, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      if (status === 200) {
        context.commit('ADD_CAR', data);
      }
    } catch (error) {
      context.commit('SET_SNACKBAR_OPTIONS', 'Network error...');

      if (error.response.status === 503) {
        return store.dispatch('CREATE_CAR', payload);
      }
    }
  },

  /**
   * Action for change options to GET cars request in state
   * @param {object} context store
   * @param {object} payload new GET params
   */
  CHANGE_QUERY_DATA: (context, payload) => {
    context.commit('SET_QUERY_DATA', payload);
  },

  /**
   * Action for change options of modal window in state
   */
  CHANGE_CARS_MODAL_OPTIONS: (context, payload) => {
    context.commit('SET_CARS_MODAL_OPTIONS', payload);
  },

  /**
   * Action for make DELETE request and delete selected car
   * @param {object} context store
   * @param {object} payload car's id to delete
   */
  DELETE_CAR: async (context, payload) => {
    try {
      const userToken = localStorage.getItem('userToken');

      const { status } = await axios.delete(`${API_WITH_AUTH_URL}/${payload}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (status === 204) {
        context.commit('REMOVE_CAR', payload);
      }
    } catch (error) {
      if (error.response.status === 503) {
        context.commit('SET_SNACKBAR_OPTIONS', 'Network error...');

        return store.dispatch('DELETE_CAR', payload);
      }

      if (error.response.status === 404) {
        context.commit('SET_SNACKBAR_OPTIONS', 'This car already deleted');
      }
    }
  },

  /**
   * Method for update date of selected car
   * @param {object} context store
   * @param {object} payload new car's data
   */
  UPDATE_CAR: async (context, payload) => {
    try {
      const userToken = localStorage.getItem('userToken');

      const { data, status } = await axios.put(
        `${API_WITH_AUTH_URL}/${payload.id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );

      if (status === 200) {
        context.commit('SET_CAR_UPDATE', data);
      }
    } catch (error) {
      context.commit('SET_SNACKBAR_OPTIONS', 'Network error...');

      if (error.response.status === 503) {
        return store.dispatch('UPDATE_CAR', payload);
      }
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
