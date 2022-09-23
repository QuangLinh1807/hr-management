import Vue from "vue";
import Vuex from "vuex";
import popupDelete from "./popupDelete";
import main from "./main";
import loading from "./loading";
import education from "./education.js";
import certificate from "./certificates.js";
import management from "./management/index.js";
import popupAddUser from "./popupAddUser";
import popupAddTimeline from "./timeline/popupAddTimeline";
import overview from "./module-overview";
import popopupChangePassword from "./popopupChangePassword";

import check from "./check.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flagChange: false,
    errorStatus: 0,
    personalInfo: {
      accountId: localStorage.getItem("accountId"),
      role: "",
    },
    listSection: [
      { id: 1, title: "Program Language" },
      { id: 2, title: "Cloud Service" },
      { id: 3, title: "Data Base" },
      { id: 4, title: "Soft Skills" },
    ],
  },
  modules: {
    popupDelete,
    main: main,
    loading,
    education,
    overview,
    certificate,
    management,
    popupAddTimeline,
    popupAddUser,
    check,
    popopupChangePassword,
  },
  getters: {
    getSection: (state) => state.listSection,
    flagChange: (state) => state.flagChange,
    personalInfo: (state) => state.personalInfo,
    errorStatus: (state) => state.errorStatus,
  },
  mutations: {
    addSection: (state, payload) => {
      state.listSection.push(payload);
    },
    SET_FLAG_CHANGE(state, payload) {
      state.flagChange = payload;
    },
    SET_PERSONAL_INFO(state, payload) {
      state.personalInfo = payload;
    },
    SET_ERROR_PAGE(state, payload) {
      state.errorStatus = payload;
    },
  },
  actions: {
    actionAddSection: ({ commit }, payload) => {
      commit("addSection", payload);
    },
  },
});
