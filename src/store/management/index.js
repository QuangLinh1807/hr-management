const state = () => {
  return {
    isModal: false,
    typeModal: null,
    idClone: "",
    contentClone: {
      name: null,
      description: null,
      image: null,
      color: "#007BC3",
    },
    isCallApi: false,
  };
};

const getters = {
  getModal: (state) => state.isModal,
  getTypeModal: (state) => state.typeModal,
  getContentClone: (state) => state.contentClone,
  getIsCallApi: (state) => state.isCallApi,
  getIdClone: (state) => state.idClone,
};

const actions = {};

const mutations = {
  closeModal: (state) => {
    state.isModal = false;
    state.contentClone = {
      name: null,
      description: null,
      image: null,
      color: "#007BC3",
    };
  },
  toggleCallApi: (state) => {
    state.isModal = false;
    state.isCallApi = !state.isCallApi;
    state.contentClone = {
      name: null,
      description: null,
      image: null,
      color: "#007BC3",
    };
  },
  getDataEdit: (state, payload) => {
    const { id, type, ...restedPayload } = payload;
    if (restedPayload !== null) {
      state.contentClone = { ...state.contentClone, ...restedPayload };
    }
    state.typeModal = payload.type;
    state.isModal = true;
    state.idClone = payload.id || null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
