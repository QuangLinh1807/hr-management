<template>
  <div>
    <transition name="fadeIn" appear>
      <div
        class="modal-overlay absolute"
        v-if="isShow"
        @click="SET_IS_SHOW(false)"
      ></div>
    </transition>
    <transition name="slide" appear>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="detail-popup-password" v-if="isShow">
            <div class="justify-center">
              <div class="popup-text-top">
                {{ addChangePassword }}
              </div>
            </div>
            <hr />
            <div class="sm:flex-row mt-4">
              <div
                class="justify-center"
                v-for="item in listFields"
                :key="item.id"
              >
                <div class="w-3/12">
                  <div class="font-medium label">{{ item.label }}</div>
                </div>
                <BaseInput
                  class="w-8/12"
                  :inputField="item"
                  v-model="item.model"
                ></BaseInput>
              </div>
            </div>
            <div class="flex mb-4 justify-end">
              <div class="popup-bottom">
                <button
                  @click.prevent="closeAdd"
                  type="button"
                  class="button-close"
                >
                  Cancel
                </button>
                <button type="submit" class="button-add">Save</button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </transition>
  </div>
</template>

<script>
import BaseInput from "../BaseInput/BaseInput.vue";
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/api";
import { extend } from "vee-validate";

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});
export default {
  components: {
    BaseInput,
  },
  name: "PopupChangePassword",
  data() {
    return {
      addChangePassword: "Change Password",
      listFields: [
        {
          id: 1,
          label: "Old Password",
          type: "password",
          placeholder: "Old Password",
          key: "oldPassword",
          name: "Old Password",
          model: "",
          rules: "required",
          mode: "eager",
        },
        {
          id: 2,
          vid: "confirmation",
          label: "New Password",
          type: "password",
          placeholder: "New Password",
          key: "newPassword",
          name: "New Password",
          model: "",
          rules: {
            required: true,
            regex:
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;,?/*~$^+=<>.]).{6,32}$/,
          },
        },
        {
          id: 3,
          label: "Confirm Password",
          type: "password",
          placeholder: "Confirm Password",
          key: "confirmPassword",
          name: "confirm",
          model: "",
          rules: {
            required: true,
            confirmed: "confirmation",
          },
          mode: "eager",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("popopupChangePassword", ["isShow"]),
  },
  methods: {
    ...mapMutations("popopupChangePassword", ["SET_IS_SHOW"]),
    ...mapMutations("loading", ["SET_LOADING"]),
    async submitForm() {
      try {
        this.SET_LOADING(true);
        this.data = this.listFields.reduce((obj, item) => {
          obj[item.key] = item.model;
          return obj;
        }, {});
        this.SET_LOADING(false);
        if (!(this.data.newPassword === this.data.confirmPassword)) {
          this.$notify({
            group: "err",
            title: "Error",
            text: "New password is not duplicate with confirm password",
            type: "error",
          });
        }
        const res = await api("changePasswordApi", this.data);
        this.SET_LOADING(false);
        if (!res.success) {
          this.SET_IS_SHOW(true);
          throw new Error(res.data.response.data.errors[0].message);
        }
        this.SET_LOADING(false);
        this.SET_IS_SHOW(false);
        this.$notify({
          group: "foo",
          title: "Success",
          text: `Successfully change password`,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          group: "foo",
          title: "Error",
          text: error.message,
          type: "error",
        });
      }
    },
    closeAdd() {
      this.SET_IS_SHOW(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 22;
  background-color: rgba(0, 0, 0, 0.3);
}
.detail-popup-password {
  z-index: 100;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 100%;
  max-width: 600px;
  padding: 0 40px;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.failed-rules {
  color: #ed5d5d;
}
.detail-popup-password {
  @apply fixed bg-white rounded-lg;

  .popup-text-top {
    @apply text-center text-lg font-semibold m-4;
  }
}
.popup-bottom {
  @apply pb-3 sm:flex sm:flex-row-reverse;
  .button-close {
    @apply mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm;
  }

  .button-add {
    @apply w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm;
  }
}

// *:focus {
//   outline: none !important;
// }

.error::placeholder {
  color: #ed5d5d;
}

.val-input {
  .intro-x {
    transform: initial !important;
    opacity: 1 !important;
  }
}
.label {
  margin-bottom: -5px;
}
</style>
