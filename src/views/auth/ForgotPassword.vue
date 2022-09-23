<template>
  <!-- BEGIN: Forgot Password Form -->
  <div class="container-login">
    <div class="form-login">
      <h2 class="form-title">Forgot Password</h2>

      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="intro-x mt-8">
            <base-input :inputField="fieldEmail" v-model="fieldEmail.model" />
          </div>
          <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
            <button
              class="
                btn btn-outline-secondary
                py-3
                px-4
                w-full
                xl:w-40
                mt-3
                xl:mt-0
                align-top
                xl:mr-3
              "
              @click.prevent="backToLogin"
            >
              <arrow-left-icon
                size="1.5x"
                class="custom-class mr-2"
              ></arrow-left-icon>
              Back to Login
            </button>
            <button
              class="btn btn-primary py-3 px-4 w-full xl:w-32 align-top"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
  <!-- END: Forgot Password Form -->
</template>

<script>
import BaseInput from "@/components/BaseInput/BaseInput.vue";
import { mapMutations } from "vuex";
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
    };
  },

  methods: {
    ...mapMutations("check", ["SET_IS_SHOW_MESSAGE_EMAIL"]),
    ...mapMutations("loading", ["SET_LOADING"]),
    async submitForm() {
      try {
        this.SET_LOADING(true);
        const res = await api("forgotPasswordApi", {
          email: this.fieldEmail.model,
        });
        this.SET_LOADING(false);
        if (!res.success) {
          throw new Error(res.data.response.data.message);
        }
        this.$router.push("/login");
        this.SET_LOADING(false);
        this.SET_IS_SHOW_MESSAGE_EMAIL(true);
        this.$notify({
          group: "foo",
          title: "Success",
          text: "Please check your email",
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
    backToLogin() {
      this.$router.push("/login");
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
