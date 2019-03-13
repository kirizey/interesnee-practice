const state = {
  shanckbar: { visible: false, message: '' }
};

const getters = {
  SNACKBAR_OPTIONS: state => state.shanckbar
};

const mutations = {
  TOGGLE_SNACKBAR: (state, payload) => {
    state.shanckbar = { visible: !state.shanckbar.visible, message: payload };

    setTimeout(() => {
      state.shanckbar = { visible: !state.shanckbar.visible, message: '' };
    }, 2000);
  }
};

const actions = {
  PUSH_SNACKBAR: (context, payload) => context.commit('TOGGLE_SNACKBAR', payload)
};

export default {
  state,
  getters,
  mutations,
  actions
};
