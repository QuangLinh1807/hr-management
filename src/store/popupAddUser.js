const state = () => {
  return {
    isShowAdd: false,
    isCheckAdd: false,
    titleAdd: "",
    options: [],
  };
};

// getters
const getters = {
  isShowAdd: (state) => state.isShowAdd,
  isCheckAdd: (state) => state.isCheckAdd,
  titleAdd: (state) => state.titleAdd,
  options: (state) => state.options,
};

// mutations
const mutations = {
  SET_IS_SHOW_ADD(state, payload) {
    state.isShowAdd = payload;
  },
  SET_IS_CHECK_ADD(state, payload) {
    state.isCheckAdd = payload;
  },
  SET_TITLE_ADD(state, payload) {
    state.titleAdd = payload;
  },
  SET_OPTIONS(state, payload) {
    state.options = [...payload];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
