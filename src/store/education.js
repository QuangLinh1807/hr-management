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
  SET_API_LIST_EDUCATION(state, payload) {
    state.listField = payload;
  },
  SET_IS_SHOW_ADD(state, payload) {
    state.isShowAdd = payload;
  },
};
// actions
const actions = {
  async getEducationApi({ commit }, { accountId }) {
    try {
      const response = await api(
        "getEducationApi",
        { accountId }
        // {
        //   accountId: localStorage.getItem("accountId"),
        // }
      );
      if (response.success) {
        const convertRes = response.data.data.map((item) => ({
          id: item.educationId,
          title: item.name,
          description: item.description,
          date: [item.startDate.split("/")[2], item.endDate.split("/")[2]],
        }));
        commit("SET_API_LIST_EDUCATION", convertRes);
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
