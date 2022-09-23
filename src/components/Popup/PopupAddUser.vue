<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="popup-add"
    v-if="isShowAdd"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="false"
  >
    <div class="popup-add-content">
      <div class="popup-hidden" aria-hidden="true"></div>
      <span class="span-hidden" aria-hidden="true">&#8203;</span>
      <div class="popup-add-form">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submitForm)">
            <div class="popup-top">
              <div class="popup-top-title">
                <div class="popup-top-title-content">
                  <h3 class="popup-text" id="modal-title">
                    {{ titleAdd }}
                  </h3>
                </div>
              </div>
              <div class="popup-top-content">
                <!--            list input in form group here -->
                <div v-for="inputItem in listFormInput" :key="inputItem.id">
                  <div
                    v-if="
                      inputItem.type === 'text' || inputItem.type === 'email'
                    "
                  >
                    <label class="form-label flex justify-start">{{
                      inputItem.title
                    }}</label>
                    <BaseInput
                      :inputField="inputItem"
                      v-model="inputItem.model"
                    />
                  </div>
                  <div v-if="inputItem.type === 'select'">
                    <label class="form-label flex justify-start">{{
                      inputItem.title
                    }}</label>
                    <BaseSelect
                      :inputField="inputItem"
                      :options="inputItem.role"
                      v-model="inputItem.model"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="popup-bottom">
              <button @click="closeAdd" type="button" class="button-close">
                Cancel
              </button>
              <button type="submit" class="button-add">Save</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import BaseInput from "../BaseInput/BaseInput";
import BaseSelect from "../BaseSelect/BaseSelect";
import api from "../../api/api";

export default {
  components: { BaseSelect, BaseInput },
  data() {
    return {
      //create first data
      addValue: null,
      //list field to create user
      listFormInput: [
        {
          id: 1,
          title: "Full name",
          name: "fullname",
          model: "",
          rules: "required|min:4|max:50",
          type: "text",
        },
        {
          id: 2,
          title: "Email",
          name: "email",
          model: "",
          rules: "required|email",
          type: "text",
        },
        {
          id: 3,
          title: "Role",
          name: "role",
          model: "",
          rules: "required",
          type: "select",
          role: ["ROLE_ADMIN", "ROLE_USER"],
        },
      ],
    };
  },
  computed: {
    ...mapGetters("popupAddUser", ["isShowAdd", "titleAdd", "options"]),
  },
  methods: {
    ...mapMutations("popupAddUser", ["SET_IS_SHOW_ADD"]),
    ...mapMutations("loading", ["SET_LOADING"]),
    //add item and close Popup
    async submitForm() {
      this.SET_LOADING(true);
      try {
        this.addValue = this.listFormInput.reduce((obj, item) => {
          obj[item.name] = item.model;
          return obj;
        }, {});
        const res = await api("addUserApi", this.addValue);
        if (res.success) {
          this.SET_IS_SHOW_ADD(false);
          this.$store.commit("SET_FLAG_CHANGE", true);
          this.SET_LOADING(false);
          this.$notify({
            group: "foo",
            title: "success",
            text: `Add user successfully  `,
            type: "success",
          });
        } else {
          this.SET_IS_SHOW_ADD(false);
          this.SET_LOADING(false);
          this.$notify({
            group: "foo",
            title: "error",
            text: `Your email has been used `,
            type: "error",
          });
        }
      } catch (error) {
        this.$notify({
          group: "foo",
          title: "error",
          text: `${error}`,
          type: "error",
        });
      }
    },
    //close Popup add
    closeAdd() {
      this.SET_IS_SHOW_ADD(false);
    },
  },
};
</script>
<style lang="scss">
.popup-add {
  @apply fixed z-10 inset-0 overflow-y-auto;
  .popup-add-content {
    @apply flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0;
    .popup-hidden {
      @apply fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity;
    }
    .span-hidden {
      @apply hidden sm:inline-block sm:align-middle sm:h-screen;
    }
    .popup-add-form {
      @apply inline-block
      align-bottom
      bg-white
      rounded-lg
      text-left
      overflow-hidden
      shadow-xl
      transform
      transition-all
      sm:my-8
      sm:align-middle
      sm:max-w-lg
      sm:w-full;
      .popup-top {
        @apply bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4;
        .popup-top-title {
          @apply sm:flex sm:justify-center;
          .popup-top-title-content {
            @apply mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center;
            .popup-text {
              @apply text-lg leading-6 font-medium text-gray-900;
            }
          }
        }
        .popup-top-content {
          @apply mt-2;
        }
      }
      .popup-bottom {
        @apply bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse;
        .button-close {
          @apply mt-3
          w-full
          inline-flex
          justify-center
          rounded-md
          border border-gray-300
          shadow-sm
          px-4
          py-2
          bg-white
          text-base
          font-medium
          text-gray-700
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          sm:mt-0
          sm:ml-3
          sm:w-auto
          sm:text-sm;
        }
        .button-add {
          @apply w-full
          inline-flex
          justify-center
          rounded-md
          border border-transparent
          shadow-sm
          px-4
          py-2
          bg-blue-600
          text-base
          font-medium
          text-white
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          sm:ml-3
          sm:w-auto
          sm:text-sm;
        }
      }
    }
  }
}
#vs1__combobox,
#vs2__combobox,
#vs3__combobox,
#vs4__combobox,
#vs5__combobox,
#vs6__combobox {
  @apply border-gray-300;
  height: 46px;
  line-height: 46px;
}
#vs1__combobox:focus {
  @apply border-red-600;
}
</style>
