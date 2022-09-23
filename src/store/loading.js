// state

const state = () => {
  return {
    loading: false,
  };
};

// actions
const actions = {};

// getters
const getters = {
  loading: (state) => state.loading,
};

// mutations
const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
