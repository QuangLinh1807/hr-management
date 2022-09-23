<template>
  <div class="pt-3 px-8">
    <Modal v-if="getModal" />
    <TopBar />
    <div class="wrapper">
      <div class="wrapper-box">
        <!-- BEGIN: Side Menu -->
        <SideMenu></SideMenu>
        <!-- END: Side Menu -->
        <!-- BEGIN: Content -->
        <div class="content">
          <router-view />
        </div>
        <!-- END: Content -->
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/TopBar.vue";
import SideMenu from "@/components/SideMenu/SideMenu.vue";
import Modal from "../components/ManagementSkillset/ModalManagementSkillset";
import { LIST_MENU } from "@/constants/listMenu";
import { mapGetters } from "vuex";
export default {
  components: {
    TopBar,
    SideMenu,
    Modal,
  },
  data() {
    return {
      LIST_MENU,
    };
  },
  computed: {
    ...mapGetters("management",["getModal"]),
  },
};
</script>
