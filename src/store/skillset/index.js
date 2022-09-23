const state = () => {
  return {
    accountId: "",
  };
};

// getters
const getters = {
  accountId: (state) => state.accountId,
};

// mutations
const mutations = {
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
