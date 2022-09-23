<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="
      top-bar-boxed
      border-b border-theme-2
      -mt-7
      md:-mt-5
      -mx-3
      sm:-mx-8
      px-3
      sm:px-8
      md:pt-0
      mb-12
    "
  >
    <div class="h-full flex items-center mt-2">
      <!-- BEGIN: Logo -->
      <router-link
        to="/dashboard"
        class="-intro-x hidden md:flex"
      >
        <img
          alt="Icewall Tailwind HTML Admin Template"
          class="logo-morhn"
          src="@/assets/images/logo-mor.svg"
        />
      </router-link>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <div class="-intro-x breadcrumb mr-auto">
        <!-- <a href="">Application</a>
        <ChevronRightIcon class="breadcrumb__icon" />
        <a href="" class="breadcrumb--active">Dashboard</a> -->
      </div>
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->
      <div class="intro-x relative mr-3 sm:mr-6">
        <div class="search hidden sm:block">
          <input
            type="text"
            class="
              search__input
              form-control
              dark:bg-dark-1
              border-transparent
              placeholder-theme-8
            "
            placeholder="Search..."
          />
          <SearchIcon class="search__icon dark:text-gray-300" />
        </div>
        <a class="notification sm:hidden" href="">
          <SearchIcon class="notification__icon dark:text-gray-300" />
        </a>
      </div>
      <!-- END: Search -->
      <!-- BEGIN: Notifications -->
      <div class="intro-x dropdown mr-4 sm:mr-6">
        <div
          class="
            dropdown-toggle
            notification notification--bullet
            cursor-pointer
          "
          role="button"
          aria-expanded="false"
        >
          <BellIcon class="notification__icon dark:text-gray-300" />
        </div>
        <div class="notification-content pt-2 dropdown-menu">
          <div
            class="
              notification-content__box
              dropdown-menu__content
              box
              dark:bg-dark-6
            "
          >
            <div class="notification-content__title">Notifications</div>
          </div>
        </div>
      </div>
      <!-- END: Notifications -->
      <!-- BEGIN: Account Menu -->
      <div class="intro-x dropdown w-8 h-8">
        <div
          class="
            dropdown-toggle
            w-8
            h-8
            rounded-full
            overflow-hidden
            shadow-lg
            image-fit
            zoom-in
            scale-110
          "
          role="button"
          aria-expanded="false"
        >
          <img :src="avatarUser" alt="" v-if="avatarUser !== null" />
          <Avatar
            v-if="avatarUser === null"
            class="vue-avt"
            :username="name"
          ></Avatar>
        </div>
        <div class="dropdown-menu w-56">
          <div
            class="
              dropdown-menu__content
              box
              bg-theme-11
              dark:bg-dark-6
              text-white
            "
          >
            <div class="p-2">
              <router-link
                role="button"
                :to="{ name: 'user-profile', params: { id: paramsId } }"
                class="
                  flex
                  items-center
                  p-2
                  transition
                  duration-300
                  ease-in-out
                  hover:bg-theme-1
                  dark:hover:bg-dark-3
                  rounded-md
                "
                data-dismiss="dropdown"
              >
                <UserIcon class="w-4 h-4 mr-2" /> Profile
              </router-link>
              <button
                href=""
                class="
                  flex
                  w-full
                  items-center
                  p-2
                  transition
                  duration-300
                  ease-in-out
                  hover:bg-theme-1
                  dark:hover:bg-dark-3
                  rounded-md
                "
                data-dismiss="dropdown"
                @click.prevent="openPopupChangePassword"
              >
                <LockIcon class="w-4 h-4 mr-2" /> Change Password
              </button>
            </div>
            <div class="p-2 border-t border-theme-12 dark:border-dark-3">
              <button
                @click="logout"
                class="
                  flex
                  w-full
                  items-center
                  p-2
                  transition
                  duration-300
                  ease-in-out
                  hover:bg-theme-1
                  dark:hover:bg-dark-3
                  rounded-md
                "
                data-dismiss="dropdown"
              >
                <PowerIcon class="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import api from "../../api/api";

export default {
  computed: {
    ...mapGetters("overview", ["getPersonalProfile"]),
  },
  data() {
    return {
      avatarUser: "",
      name: "",
      paramsId: localStorage.getItem("accountId"),
    };
  },
  methods: {
    ...mapMutations("popopupChangePassword", ["SET_IS_SHOW"]),
    logout() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("accountId");
      this.$router.push("/login");
    },
    openPopupChangePassword() {
      this.SET_IS_SHOW(true);
    },
  },
  async created() {
    const accountID = localStorage.getItem("accountId");
    const res = await api("getUserProfileApi", accountID);
    this.name = res.data.data.fullname;
    this.avatarUser = res.data.data.avatar;
  },
};
</script>
<style lang="scss" scoped>
.vue-avt {
  padding-top: 2px;
  width: 32px !important;
  height: 32px !important;
  font: 14px / 50px Helvetica, Arial, sans-serif !important;
}
.logo-morhn {
  width: 140px
}
</style>
