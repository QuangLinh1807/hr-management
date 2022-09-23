<template>
  <!-- BEGIN: Login Form -->
  <div class="container-login">
    <div class="form-login">
      <h2 class="form-title">Sign In</h2>
      <div
        v-if="isShowMessageEmail"
        class="intro-x mt-2 text-gray-500 text-justify"
      >
        The code has been sent to your email, please check your email to reset
        your password
      </div>
      <div
        v-if="isShowMessageSucces"
        class="intro-x mt-2 text-gray-500 text-justify"
      >
        Change password successfully, please sign in to continue
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="intro-x mt-8">
            <base-input :inputField="fieldEmail" v-model="fieldEmail.model" />
            <base-input
              :inputField="fieldPassword"
              v-model="fieldPassword.model"
            />
          </div>
          <div
            class="
              intro-x
              flex
              text-gray-700
              dark:text-gray-600
              text-xs
              sm:text-sm
              mt-4
              hover:text-primary-1
            "
          >
            <router-link to="/api/forgot-password"
              >Forgot password ?</router-link
            >
          </div>
          <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
            <button
              class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
  <!-- END: Login Form -->
</template>

<script>
import BaseInput from "../../components/BaseInput/BaseInput.vue";
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/api";
export default {
  components: {
    BaseInput,
  },
  data() {
    return {
      submitted: false,
      fieldEmail: {
        type: "text",
        placeholder: "Email",
        name: "email",
        model: "",
        rules: "required|email",
        mode: "eager",
      },
      fieldPassword: {
        type: "password",
        placeholder: "Password",
        name: "password",
        model: "",
        rules: "required",
        mode: "eager",
      },
    };
  },
  computed: {
    ...mapGetters("check", ["isShowMessageEmail"]),
    ...mapGetters("check", ["isShowMessageSucces"]),
  },
  methods: {
    ...mapMutations("loading", ["SET_LOADING"]),
    async submitForm() {
      try {
        this.SET_LOADING(true);
        const res = await api("loginApi", {
          email: this.fieldEmail.model,
          password: this.fieldPassword.model,
        });
        this.SET_LOADING(false);
        if (!res.success) {
          throw new Error(res.data.response.data.message);
        }
        this.SET_LOADING(false);
        localStorage.setItem("jwtToken", res.data.data.token);
        const getAccountInfo = await api("getAccountInfo");
        this.$store.commit("SET_PERSONAL_INFO", getAccountInfo.data.data);

        localStorage.setItem("accountId", getAccountInfo.data.data.accountId);
        if (getAccountInfo.data.data.role === "ROLE_ADMIN") {
          this.$router.push("/dashboard");
        } else {
          this.$router.push({
            name: "user-profile",
            params: { id: getAccountInfo.data.data.accountId },
          });
        }
        this.$notify({
          group: "foo",
          title: "Success",
          text: "Login successfully",
          type: "success",
        });
      } catch (error) {
        this.$notify({
          group: "err",
          title: "Error",
          text: error,
          type: "error",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container-login {
  @apply h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0;

  .form-login {
    @apply mb-auto mt-56 mx-auto bg-white dark:bg-dark-1  px-5  py-8 rounded-md w-3/4;

    .form-title {
      @apply font-bold text-2xl xl:text-3xl text-center xl:text-left;
    }
  }
}
</style>
