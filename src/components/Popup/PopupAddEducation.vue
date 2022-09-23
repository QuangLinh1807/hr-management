<template>
  <div>
    <transition name="fadeIn" appear>
      <div
        class="modal-overlay absolute"
        v-if="isShowAdd"
        @click="SET_IS_SHOW_ADD(false)"
      ></div>
    </transition>
    <transition name="slide" appear>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="detail-popup-education" v-if="isShowAdd">
            <div class="justify-center">
              <div class="popup-text-top">
                {{ addEducation }}
              </div>
            </div>
            <hr />

            <PerfectScrollbar class="p-2 pt-5 h-60" id="container">
              <div
                class="sm:flex-row pb-3"
                v-for="(item, index) of listFields"
                :key="index"
              >
                <div class="flex mr-auto pl-4 justify-between withdInput">
                  <BaseInput
                    :inputField="formInput"
                    v-model="item.title"
                  ></BaseInput>
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, classes, failedRules }"
                    class="w-1/4 space-x-4 ml-4 mt-3"
                  >
                    <DatePicker
                      class="text-center year-input"
                      format="YYYY"
                      value-type="YYYY"
                      lang="en"
                      name="date"
                      type="year"
                      v-model="item.date"
                      range
                      :clearable="false"
                      :class="{ error: errors[0] }"
                    ></DatePicker>
                    <div class="mt-2 errDate" :class="classes">
                      {{
                        failedRules.required ? "The year field is required" : ""
                      }}
                    </div>
                  </ValidationProvider>
                  <button
                    class="focus:outline-none h-10 ml-2 mt-3"
                    @click.prevent="deleteField(item.id)"
                  >
                    <XIcon class="text-gray-600 focus:outline-none" />
                  </button>
                </div>
                <div class="textarea-education">
                  <BaseTextarea
                    class="textarea-base"
                    :textareaField="formTextarea"
                    v-model="item.description"
                  ></BaseTextarea>
                </div>
              </div>
            </PerfectScrollbar>
            <div class="flex m-4 justify-between">
              <button
                class="flex items-center mb-4 mt-2 ml-2 hover:text-primary-1"
                @click.prevent="addEducationCareer()"
              >
                <Plus-SquareIcon class="w-5 h-5 mr-2"></Plus-SquareIcon>Add
              </button>
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
import DatePicker from "vue2-datepicker";
import BaseInput from "../BaseInput/BaseInput.vue";
import BaseTextarea from "../BaseTextarea/BaseTextarea.vue";
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/api";

export default {
  components: {
    DatePicker,
    BaseInput,
    BaseTextarea,
  },
  name: "PopupAddEducation",
  data() {
    return {
      addEducation: "Add more Education and Career",
      data: null,
      accId: null,
      listFields: [
        {
          id: "",
          title: "",
          description: "",
          date: [],
        },
      ],
      listStartEducation: [
        {
          id: "",
          title: "",
          description: "",
          date: [],
        },
      ],
      formInput: {
        title: "Title",
        name: "title",
        model: "",
        rules: "required|min:1|max:255",
        type: "text",
        placeholder: "Title",
      },
      formTextarea: {
        title: "Content",
        name: "content",
        model: "",
        rules: "required|min:1|max:512",
        type: "text",
        placeholder: "Content",
      },
    };
  },
  watch: {
    $route: {
      handler: async function (to) {
        this.accId = to.params.id;
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters("education", ["isShowAdd"]),
    ...mapGetters("education", ["renderListField"]),
  },
  methods: {
    ...mapMutations("education", ["SET_IS_SHOW_ADD"]),
    ...mapMutations("loading", ["SET_LOADING"]),
    addEducationCareer() {
      if (this.listFields.length < 5) {
        this.listFields.push({
          id: "",
          title: "",
          description: "",
          date: [],
        });
        this.scrollToEnd();
      } else {
        this.$notify({
          group: "err",
          title: "Error",
          text: "Cannot Add Education, you have enough 5 items",
          type: "error",
        });
      }
    },
    deleteField(event) {
      if (this.listFields.length > 1) {
        this.listFields.splice(event, 1);
      } else {
        this.$notify({
          group: "err",
          title: "Error",
          text: "Item cannot be deleted",
          type: "error",
        });
      }
    },
    async submitForm() {
      await this.postEducationFromApi();
    },
    closeAdd() {
      this.listFields = JSON.parse(JSON.stringify(this.listStartEducation));
      this.SET_IS_SHOW_ADD(false);
    },
    scrollToEnd() {
      this.$nextTick(() => {
        const container = this.$el.querySelector("#container");
        container.scrollTop = container.scrollHeight;
      });
    },

    async postEducationFromApi() {
      try {
        this.SET_LOADING(true);
        const addData = this.listFields.map((item) => ({
          name: item.title,
          description: item.description,
          startDate: `01/01/${item.date[0]}`,
          endDate: `01/01/${item.date[1]}`,
        }));
        const res = await api("postEducationApi", {
          data: addData,
          accountId: this.accId,
        });
        this.SET_LOADING(false);
        if (!res.success) {
          this.SET_IS_SHOW_ADD(true);
          throw new Error(res.data.response.data.errors[0].message);
        }
        this.SET_LOADING(false);
        this.SET_IS_SHOW_ADD(false);
        await this.$store.dispatch("education/getEducationApi", {
          accountId: this.accId,
        });
        this.listFields = JSON.parse(JSON.stringify(this.listStartEducation));
        this.$notify({
          group: "foo",
          title: "Success",
          text: "Successfully add Education",
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
  },
};
</script>

<style lang="scss" scoped>
button {
  appearance: none;
  outline: none;
  border: none;
}
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 22;
  background-color: rgba(0, 0, 0, 0.3);
}
.detail-popup-education {
  z-index: 100;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 100%;
  max-width: 600px;
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

.btn-add {
  @apply bg-primary-5 px-10 py-3 rounded-lg font-semibold flex mx-auto mr-2 text-white;
  transition: 0.1s linear;
}
.btn-add:hover {
  opacity: 0.8;
}

.failed-rules {
  color: #ed5d5d;
}
.detail-popup-education {
  @apply fixed bg-white rounded-lg;

  .popup-text-top {
    @apply text-center text-lg font-semibold m-4;
  }
}
.popup-bottom {
  @apply px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse;
  .button-close {
    @apply mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm;
  }

  .button-add {
    @apply w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm;
  }
}
.month-input {
  width: 100%;
  .mx-input {
    border: 1px solid #cccccc6b !important;
    height: 46px !important;
    border-radius: 8px !important;
    padding-left: 20px;
  }
}
.month-input.error .mx-input {
  background-color: rgba(237, 93, 93, 0.08);
  border-color: #ed5d5d !important;
}
*:focus {
  outline: none !important;
}

#container {
  max-height: 350px;
  overflow-y: scroll;
}

.error::placeholder {
  color: #ed5d5d;
}

.mx-datepicker-range {
  width: 140px !important;
}
.errDate {
  width: max-content !important;
  margin-left: 0px !important;
  margin-top: 50px !important;
  margin-bottom: 10px !important;
  color: #ed5d5d;
}
.year-input {
  width: 100%;
  margin-left: 1.2rem;
  float: right;
  margin-bottom: 5px;
  .mx-input {
    border: 1px solid #cccccc6b !important;
    height: 46px !important;
    border-radius: 5px !important;
    padding-left: 20px;
  }
}
.year-input.error .mx-input {
  border-color: #ed5d5d !important;
  background-color: rgba($color: #ed5d5d, $alpha: 0.08);
}
.textarea-education {
  width: 95%;
  padding-left: 1rem !important;
}
.val-input {
  .intro-x {
    transform: initial !important;
    opacity: 1 !important;
  }
}
</style>
