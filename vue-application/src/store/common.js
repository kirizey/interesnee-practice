const state = {
  shanckbar: { visible: false, message: '' }
};

const getters = {
  SNACKBAR_OPTIONS: state => state.shanckbar
};

const mutations = {
  TOGGLE_SNACKBAR: (state, payload) => {
    state.shanckbar = { visible: !state.shanckbar.visible, message: payload };
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
