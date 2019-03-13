import axios from 'axios';
import store from './index';

const LOGIN_API = 'https://backend-jscamp.saritasa-hosting.com/api/auth';

const state = {
  userToken: { value: null, expirationTime: null }
};

const getters = {
  USER_TOKEN: state => state.userToken
};

const mutations = {
  UPDATE_USER_TOKEN: (state, payload) => (state.userToken = { value: payload })
};

const actions = {
  LOGIN: async (context, payload) => {
    try {
      let { data, status } = await axios.post(LOGIN_API, payload);

      if (status === 200) {
        context.commit('UPDATE_USER_TOKEN', data);

        localStorage.setItem('userToken', data.token);
      }
    } catch (error) {
      if (error.response.status === 503) {
        return store.dispatch('LOGIN', payload);
      }

      if (status === 404) {
        context.commit('TOGGLE_SNACKBAR', 'Invalid email or password...');

        setTimeout(() => {
          context.commit('TOGGLE_SNACKBAR', '');
        }, 2000);
      }
    }
  },

  LOGOUT: async (context, payload) => {
    localStorage.removeItem('userToken');

    context.commit('UPDATE_USER_TOKEN', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
