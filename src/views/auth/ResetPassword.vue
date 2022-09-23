<template>
  <!-- BEGIN: Reset Password Form -->
  <div class="container-login">
    <div class="form-login">
      <h2 class="form-title">Reset Password</h2>

      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="intro-x mt-8">
            <base-input
              :inputField="fieldNewPassword"
              v-model="fieldNewPassword.model"
            />
            <base-input
              :inputField="fieldConfirmPassword"
              v-model="fieldConfirmPassword.model"
            />
          </div>
          <div v-if="submitted" class="intro-x mt-2 text-red-500">
            New password is different from new confirm password
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
  <!-- END: Reset Password Form -->
</template>

<script>
import BaseInput from "../../components/BaseInput/BaseInput.vue";
import { mapMutations } from "vuex";
import api from "@/api/api";

export default {
  components: {
    BaseInput,
  },
  data() {
    return {
      submitted: false,
      fieldNewPassword: {
        vid: "confirmation",
        type: "password",
        placeholder: "New Password",
        name: "new password",
        model: "",
        rules: {
          required: true,
          regex:
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;,?/*~$^+=<>.]).{6,32}$/,
        },
      },
      fieldConfirmPassword: {
        type: "password",
        placeholder: "Confirm Password",
        name: "confirm password",
        model: "",
        rules: {
          required: true,
          confirmed: "confirmation",
        },
        mode: "eager",
      },
    };
  },
  methods: {
    ...mapMutations("check", ["SET_IS_SHOW_MESSAGE_SUCCES"]),
    ...mapMutations("loading", ["SET_LOADING"]),
    async submitForm() {
      try {
        if (
          !(this.fieldNewPassword.model === this.fieldConfirmPassword.model)
        ) {
          this.$notify({
            group: "err",
            title: "Error",
            text: "New password is not duplicate with confirm password",
            type: "error",
          });
        }
        this.SET_LOADING(true);
        const res = await api("confirmPasswordApi", {
          newPassword: this.fieldNewPassword.model,
          confirmPassword: this.fieldConfirmPassword.model,
          token: this.$route.params.token,
        });
        this.SET_LOADING(false);
        if (!res.success) {
          throw new Error(res.data.response.data.message);
        }
        this.SET_LOADING(false);
        this.SET_IS_SHOW_MESSAGE_SUCCES(true);
        this.$router.push("/login");
        this.$notify({
          group: "foo",
          title: "Success",
          text: "Successfully, please sign in to continue",
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
