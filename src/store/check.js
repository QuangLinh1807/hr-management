const state = () => {
  return {
    isShowMessageEmail: false,
    isShowMessageSucces: false,
  };
};

//getters
const getters = {
  isShowMessageEmail: (state) => state.isShowMessageEmail,
  isShowMessageSucces: (state) => state.isShowMessageSucces,
};
//mutations
const mutations = {
  SET_IS_SHOW_MESSAGE_EMAIL(state, payload) {
    state.isShowMessageEmail = payload;
  },
  SET_IS_SHOW_MESSAGE_SUCCES(state, payload) {
    state.isShowMessageSucces = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
