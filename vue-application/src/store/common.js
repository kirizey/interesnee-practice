const state = {
  shanckbar: { visible: false, message: '' }
};

const getters = {
  SNACKBAR_OPTIONS: state => state.shanckbar
};

const mutations = {
  /**
   * Push snackbar with sent message and close it
   * @param {object} state store state
   * @param {object} payload new snackbar's options
   */
  SET_SNACKBAR_OPTIONS: (state, payload) => {
    state.shanckbar = { visible: !state.shanckbar.visible, message: payload };

    setTimeout(() => {
      state.shanckbar = { visible: !state.shanckbar.visible, message: '' };
    }, 2000);
  }
};

const actions = {
  /**
   * Action for push snackbar with sent message
   * @param {object} context store state
   * @param {object} payload notification message
   */
  PUSH_SNACKBAR: (context, payload) => context.commit('SET_SNACKBAR_OPTIONS', payload)
};

export default {
  state,
  getters,
  mutations,
  actions
};
