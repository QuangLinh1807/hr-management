const state = () => {
  return {
    showDelete: false,
    title: "",
    nameDetail: "",
    idDelete: null,
    caseDelete: 0,
    subIdDelete: null,
    accountId: "",
  };
};

// getters
const getters = {
  showDelete: (state) => state.showDelete,
  title: (state) => state.title,
  nameDetail: (state) => state.nameDetail,
  idDelete: (state) => state.idDelete,
  caseDelete: (state) => state.caseDelete,
  subIdDelete: (state) => state.subIdDelete,
  accountId: (state) => state.accountId,
};

// mutations
const mutations = {
  SET_IS_SHOW(state, payload, subId = null) {
    state.showDelete = true;
    state.idDelete = payload;
    state.subIdDelete = subId;
  },
  SET_TITLE(state, payload) {
    state.title = payload;
  },
  SET_NAME_DETAIL(state, payload) {
    state.nameDetail = payload;
  },
  SET_HIDDEN(state) {
    state.showDelete = false;
  },
  SET_CASE_DELETE(state, payload) {
    state.caseDelete = payload;
  },
  SET_SUB_ID_DELETE(state, payload) {
    state.subIdDelete = payload;
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
