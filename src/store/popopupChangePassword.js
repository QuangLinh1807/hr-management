const state = () => {
  return {
    isShow: false,
  };
};

//getters
const getters = {
  isShow: (state) => state.isShow,
};
const mutations = {
  SET_IS_SHOW(state, payload) {
    state.isShow = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
