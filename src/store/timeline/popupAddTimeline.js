const state = () => {
  return {
    accountId: "",
    showAddTimeline: false,
    isCheckAdd: false,
    titleAdd: "",
    options: [],
  };
};

// getters
const getters = {
  showAddTimeline: (state) => state.showAddTimeline,
  isCheckAdd: (state) => state.isCheckAdd,
  titleAdd: (state) => state.titleAdd,
  options: (state) => state.options,
  accountId: (state) => state.accountId,
};

// mutations
const mutations = {
  SET_SHOW_ADD_TIMELINE(state, payload) {
    state.showAddTimeline = payload;
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
  SET_ACCOUNT_ID(state, payload) {
    state.accountId = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
