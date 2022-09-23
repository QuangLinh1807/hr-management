import api from "@/api/api";
const state = () => {
  return {
    listField: [],
    isShowAdd: false,
  };
};

//getters
const getters = {
  renderListField: (state) => state.listField,
  isShowAdd: (state) => state.isShowAdd,
};
const mutations = {
  SET_API_LIST_CERTIFICATE(state, payload) {
    state.listField = payload;
  },
  SET_IS_SHOW_ADD(state, payload) {
    state.isShowAdd = payload;
  },
};
// actions
const actions = {
  async getCertificateApi({ commit }, { accountId }) {
    try {
      const response = await api(
        "getCertificateApi",
        { accountId }
        // {
        //   accountId: localStorage.getItem("accountId"),
        // }
      );
      if (response.success) {
        const convertRes = response.data.data.map((item) => {
          const valueEndDate =
            item.endDate === null ? "null" : item.endDate.split("/")[2];
          return {
            id: item.certificateId,
            title: item.name,
            date: [item.startDate.split("/")[2], valueEndDate],
          };
        });
        commit("SET_API_LIST_CERTIFICATE", convertRes);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
