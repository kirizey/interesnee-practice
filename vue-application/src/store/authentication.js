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
  /**
   * Set / update / reset user token in state
   * @param {object} state store state
   * @param {object} payload got user token options
   */
  UPDATE_USER_TOKEN: (state, payload) => (state.userToken = { value: payload })
};

const actions = {
  /**
   * Putin user token else push notification with error
   * @param {object} context store
   * @param {object} payload got input by user email and password
   */
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

      if (error.response.status === 404) {
        context.commit('TOGGLE_SNACKBAR', 'Invalid email or password...');
      }
    }
  },

  /**
   * Reset user token
   * @param {object} context store
   */
  LOGOUT: async context => {
    localStorage.removeItem('userToken');

    context.commit('UPDATE_USER_TOKEN', null);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
