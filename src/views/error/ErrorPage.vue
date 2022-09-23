<template>
  <div>
    <div class="container">
      <div class="error-page">
        <div class="-intro-x lg:mr-20">
          <img
            alt="Icewall Tailwind HTML Admin Template"
            class="h-48 lg:h-auto"
            :src="require(`@/assets/images/error-illustration.svg`)"
          />
        </div>
        <div class="text-white mt-10 lg:mt-0">
          <div class="intro-x text-8xl font-medium" v-if="errorStatus === 403">
            403
          </div>
          <div class="intro-x text-8xl font-medium" v-else>404</div>
          <div
            class="intro-x text-xl lg:text-3xl font-medium mt-5"
            v-if="errorStatus === 403"
          >
            Oops. You are unauthorized
          </div>
          <div class="intro-x text-xl lg:text-3xl font-medium mt-5" v-else>
            Oops. This page has gone missing.
          </div>
          <div class="intro-x text-lg mt-3">
            You may have mistyped the address or the page may have moved.
          </div>
          <!-- <button
            class="back-home"
            @click="backHome() ? $router.go(-1) : $router.push('/')"
          >
            Back to Home
          </button> -->
          <!-- <router-link class="back-home" to="/user-profile/:id"
            >Back to Home Id</router-link
          > -->
          <router-link
            class="back-home"
            :to="{
              name: 'user-profile',
              params: { id: personalInfo.accountId },
            }"
            v-if="personalInfo.role === 'ROLE_USER'"
            >Back to Profile</router-link
          >
          <router-link
            class="back-home"
            to="/dashboard"
            v-if="personalInfo.role === 'ROLE_ADMIN'"
            >Back to Home</router-link
          >

          <button
            v-if="personalInfo.role === ''"
            class="back-home"
            @click="logout"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["personalInfo", "errorStatus"]),
  },
  methods: {
    backHome() {
      return window.history.length > 2;
    },
    logout() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("accountId");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.error-page {
  @apply flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left;
}
.back-home {
  border: 2px solid #fff;
  @apply py-3 px-4 text-white rounded-md dark:border-dark-5 dark:text-gray-300 mt-10 font-bold inline-block;
}
</style>
