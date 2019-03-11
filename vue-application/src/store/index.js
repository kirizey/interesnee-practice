import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const API_URL = 'https://backend-jscamp.saritasa-hosting.com/api/cars';

const sendFetch = (method, endpoint, data, options) =>
  new Promise((resolve, reject) => {
    const requestHeaders = new Headers();
    const stringifiedData = JSON.stringify(data);

    if (method === 'POST' || method === 'PUT') {
      requestHeaders.append('content-type', 'application/json');
    }

    if (method === 'GET') {
      const searchParams = new URLSearchParams();

      searchParams.append('page', options.page);
      searchParams.append('keyword', options.searchQuery);

      if (options.orderBy) {
        searchParams.append('order_by', options.orderBy);
        searchParams.append('sort_order', options.sortOrder);
      }
      endpoint += `?${searchParams}`;
    }

    method === 'GET'
      ? fetch(endpoint, { method }).then(result => {
          if (result.ok) {
            return resolve(result.json());
          }

          return reject(result.status);
        })
      : fetch(endpoint, { method, headers: requestHeaders, body: stringifiedData }).then(
          result => {
            if (result.ok) {
              return resolve(result.json());
            }

            return reject(result.status);
          }
        );
  });

const pushError = status => {
  const error = new Error(status);

  error.code = status;

  return error;
};

const store = new Vuex.Store({
  state: {
    results: []
  },
  mutations: {
    set(state, { type, items }) {
      state[type] = items;
    }
  },
  actions: {
    search({ commit }, searchQuery = '', page = 1) {
      sendFetch('GET', API_URL, '', { page, searchQuery })
        .then(res => commit('set', { type: 'results', items: res.results }))
        .catch(error => {
          if (error === 503) return pushError(503);
        });
    },
    getCars({ commit }, page = 1) {
      sendFetch('GET', API_URL, '', { page }).then(res =>
        commit('set', { type: 'getResults', items: res.results })
      );
    }
  }
});

export default store;
