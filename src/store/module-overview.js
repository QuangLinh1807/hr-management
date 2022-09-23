import api from "@/api/api";
import { Store } from "vuex";

const state = () => {
  return {
    users: null,
    userPosition: null,
    isChange: false,
  };
};

// getters
const getters = {
  getPersonalProfile: (state) => state.users,
  getPositionUser: (state) => state.userPosition,
  getMainSkillsUser: (state) => state.users.mainSkills,
};

// mutations
const mutations = {
  SET_API_USER(state, payload) {
    state.users = payload;
  },
  SET_POSITION_USER(state, payload) {
    state.userPosition = payload;
  },
};

// actions
const actions = {
  async getPersonalFromApi({ commit }, { accountId }) {
    const res = await api("getUserProfileApi", accountId);
    if (res.success) {
      commit("SET_API_USER", res.data.data);
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  },
  async getPositionFromApi({ commit }) {
    const res = await api("getPositionProfileApi");
    if (res.success) {
      commit("SET_POSITION_USER", res.data.data);
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
