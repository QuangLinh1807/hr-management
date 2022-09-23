<template>
  <div>
    <router-view />
    <notifications group="foo" width="340px" position="top right" />
    <notifications
      group="errDeleteEducation"
      width="340px"
      position="top right"
    />
    <notifications group="err" width="340px" position="top right" />
    <PopupChangePassword />
    <PopupAddEducation />
    <PopupAddCertificate />
    <PopupDelete />
    <PopupTimeline />
    <Loading />
    <PopupAdd />
  </div>
</template>
<script>
import PopupAddEducation from "./components/Popup/PopupAddEducation";
import PopupAddCertificate from "./components/Popup/PopupAddCertificate";
import PopupDelete from "./components/Popup/PopupDelete";
import PopupTimeline from "./components/Timeline/PopupAddTimeline";
import PopupAdd from "./components/Popup/PopupAddUser";
import Loading from "./components/Loading/Loading";
import PopupChangePassword from "./components/Popup/PopupChangePassword";
import { mapGetters } from "vuex";
import api from "./api/api";
export default {
  components: {
    PopupChangePassword,
    PopupAddEducation,
    PopupAddCertificate,
    PopupDelete,
    Loading,
    PopupTimeline,
    PopupAdd,
  },
  computed: {
    ...mapGetters(["personalInfo", "errorStatus"]),
  },
  methods: {
    async setAccountInfo() {
      const res = await api("getAccountInfo");
      if (res.success) {
        this.$store.commit("SET_PERSONAL_INFO", res.data.data);
      } else {
        this.$store.commit("SET_ERROR_PAGE", 403);
        this.$router.push("/not-found");
      }
    },
  },
  created() {
    this.setAccountInfo();
  },
};
</script>
