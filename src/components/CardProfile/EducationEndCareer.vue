<template>
  <div class="container-education">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(saveInfo)">
        <div class="form-education intro-y">
          <div class="form-header">
            <h2 class="text-lg mr-auto font-bold">Education and Career</h2>
            <div class="ml-auto flex">
              <button
                v-if="!isEditTable"
                class="focus:outline-none"
                type="submit"
              >
                <SaveIcon class="btn-save" />
              </button>
              <button
                v-if="!isEditTable"
                class="focus:outline-none"
                @click="closeSave"
              >
                <XIcon class="btn-close" />
              </button>
              <button
                v-if="isEditTable"
                @click.prevent="toggleDisable"
                class="focus:outline-none"
              >
                <EditIcon class="btn-edit" />
              </button>
            </div>
          </div>

          <PerfectScrollbar class="form-body" id="container">
            <div
              v-if="listFields.length === 0"
              class="text-center opacity-60 mt-16"
            >
              <img
                alt="Icewall Tailwind HTML Admin Template"
                class="h-40 m-auto mb-4"
                :src="require(`@/assets/images/error-illustration.svg`)"
              />No information yet, please add a new one
            </div>
            <div
              class="sm:flex-row pb-3"
              v-for="(item, index) of listFields"
              :key="index"
            >
              <div v-if="!isEditTable" class="withdInput">
                <ValidationProvider
                  rules="required|min:1|max:255"
                  v-slot="{ errors, classes }"
                  class="w-3/4"
                  name="title"
                >
                  <input
                    v-if="!isEditTable"
                    class="field-input inputTitle form-control"
                    v-model.trim="item.title"
                    placeholder="Title"
                    name="title"
                    :class="{ error: errors[0] }"
                  />
                  <div
                    v-if="!isEditTable"
                    class="text-red-600 mt-1"
                    :class="classes"
                  >
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  v-slot="{ errors, classes, failedRules }"
                  class="w-1/4 space-x-4 ml-auto"
                  name="date"
                >
                  <DatePicker
                    class="dateEducation text-center mx-2"
                    v-if="!isEditTable"
                    name="date"
                    format="YYYY"
                    value-type="YYYY"
                    v-model="item.date"
                    lang="en"
                    type="year"
                    range
                    :max-date="new Date().toISOString().substr(0, 10)"
                    :clearable="false"
                    :class="{ error: errors[0] }"
                  ></DatePicker>
                  <div
                    v-if="!isEditTable"
                    class="text-red-600 mt-1"
                    :class="classes"
                  >
                    {{
                      failedRules.required ? "The year field is required" : ""
                    }}
                  </div>
                </ValidationProvider>
                <button
                  v-if="!isEditTable"
                  class="btn-delete rm-cer"
                  @click.prevent="openDelete(item.id, item.title)"
                >
                  <XIcon class="btn-delete-icon" />
                </button>
              </div>
              <ValidationProvider
                v-slot="{ errors, classes }"
                rules="required|min:1|max:512"
                name="description"
              >
                <textarea
                  v-if="!isEditTable"
                  class="field-textarea form-control"
                  v-model.trim="item.description"
                  name="description"
                  placeholder="Description"
                  :class="{ error: errors[0] }"
                ></textarea>
                <div v-if="!isEditTable" :class="classes" class="err">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
              <div v-if="isEditTable" class="show-body">
                <div class="w-3/4">
                  <div class="show-body-title">
                    {{ item.title }}
                  </div>
                  <div class="show-body-description">
                    {{ item.description }}
                  </div>
                </div>
                <div class="show-body-date">
                  {{ `${item.date[0]} - ${item.date[1]}` }}
                </div>
              </div>
            </div>
          </PerfectScrollbar>
          <button
            class="flex items-center mb-4 mt-2 ml-8 hover:text-primary-1"
            aria-expanded="false"
            @click.prevent="openPopupAddEducation"
          >
            <Plus-SquareIcon class="w-5 h-5 mr-2" />
            <span class="font-medium text-base">Add more</span>
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import api from "@/api/api";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      isEditTable: true,
      listFields: [],
      data: null,
      accId: null,
    };
  },

  computed: {
    ...mapGetters("education", ["renderListField"]),
  },
  async created() {
    this.bindingListFields();
  },
  watch: {
    renderListField: {
      handler: function (val) {
        this.bindingListFields();
      },
      immediate: true,
    },
    $route: {
      handler: async function (to) {
        this.accId = to.params.id;
        if (this.accId) {
          await this.$store.dispatch("education/getEducationApi", {
            accountId: to.params.id,
          });
        }
      },
      immediate: true,
    },
  },

  methods: {
    // ...mapActions("education", ["getEducationApi"]),
    ...mapMutations("education", ["SET_IS_SHOW_ADD"]),
    ...mapMutations("loading", ["SET_LOADING"]),
    ...mapMutations("popupDelete", [
      "SET_TITLE",
      "SET_NAME_DETAIL",
      "SET_IS_SHOW",
      "SET_CASE_DELETE",
      "SET_ACCOUNT_ID",
    ]),
    openDelete(eduId, title) {
      this.SET_TITLE("Education and Carrer");
      this.SET_NAME_DETAIL(title);
      this.SET_IS_SHOW(eduId);
      this.SET_CASE_DELETE(7);
      this.SET_ACCOUNT_ID(this.accId);
    },
    toggleDisable() {
      this.isEditTable = false;
    },
    async saveInfo() {
      // this.isEditTable = true;
      await this.putEducationApi();
    },
    closeSave() {
      this.isEditTable = true;
      // this.listFields = JSON.parse(JSON.stringify(this.renderListField));
      this.bindingListFields();
    },
    bindingListFields() {
      this.listFields = JSON.parse(JSON.stringify(this.renderListField));
    },
    openPopupAddEducation() {
      this.SET_IS_SHOW_ADD(true);
    },
    scrollToEnd() {
      this.$nextTick(() => {
        let container = this.$el.querySelector("#container");
        container.scrollTop = container.scrollHeight;
      });
    },
    async putEducationApi() {
      try {
        this.SET_LOADING(true);
        const updateData = this.listFields.map((item) => {
          return {
            educationId: item.id,
            name: item.title,
            description: item.description,
            startDate: `01/01/${item.date[0]}`,
            endDate: `01/01/${item.date[1]}`,
          };
        });
        const res = await api("putEducationApi", {
          data: updateData,
          accountId: this.accId,
        });
        this.SET_LOADING(false);
        if (!res.success) {
          this.isEditTable = false;
          throw new Error(res.data.response.data.errors[0].message);
        }
        this.SET_LOADING(false);
        await this.$store.dispatch("education/getEducationApi", {
          accountId: this.accId,
        });
        this.isEditTable = true;
        this.$notify({
          group: "foo",
          title: "success",
          text: "Successfully save Education",
          type: "success",
        });
        this.bindingListFields();
      } catch (error) {
        this.$notify({
          group: "err",
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
.tit-education {
  border-bottom: 1px solid #fff;
  @apply flex items-center p-2 pl-6 dark:border-dark-5;
}
.container-education {
  // border: 1px solid #cecece;
  background-color: #f2f8fc;
  @apply max-w-4xl rounded overflow-hidden w-2/3 mr-8;
}
.dateEducation {
  width: 100% !important;
  margin-left: 1.2rem;
  float: right;
  margin-bottom: 5px;
}
#container {
  max-height: 800px;
  overflow-y: scroll;
}
.withdInput span:first {
  width: 100%;
}
.inputTitle {
  height: 40px;
}
.error {
  border-color: #ed5d5d;
  background-color: rgba($color: #ed5d5d, $alpha: 0.08);
}
.error::placeholder {
  color: #ed5d5d;
}
.text-error {
  color: #ed5d5d;
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}
.form-education {
  .form-header {
    @apply flex items-center p-1 pl-3 border-b border-white dark:border-dark-5 mb-3;

    .btn-save {
      @apply text-blue-900 focus:outline-none;
    }
    .btn-close {
      @apply text-gray-600 focus:outline-none;
    }
    .btn-edit {
      @apply hover:text-primary-1;
    }
  }
  .form-body {
    padding: 8px;
    @apply h-80;

    .withdInput {
      @apply flex mr-auto pl-8 justify-between;

      .field-input {
        @apply w-11/12 pl-2 rounded focus:outline-none;
      }
      .btn-delete {
        @apply focus:outline-none h-10 mr-2;

        .btn-delete-icon {
          @apply text-gray-600 focus:outline-none;
        }
      }
    }
    .field-textarea {
      @apply pl-4 ml-8 mt-4 text-gray-600 w-11/12 h-20 rounded focus:outline-none resize-none text-justify;
    }
    .show-body {
      @apply flex justify-between w-full;

      .show-body-title {
        @apply mr-auto pl-6 break-words text-lg font-medium;
      }
      .show-body-description {
        @apply pl-2 ml-8 mt-1 text-gray-600 w-full break-words text-justify;
      }
      .show-body-date {
        @apply text-center mr-4 pt-1 font-medium text-base;
      }
    }
    // .btn-popup-add {
    //   @apply ;
    // }
  }
  .err {
    @apply text-red-600 ml-8 mt-1;
  }
}
</style>
<style lang="scss">
.dateEducation.error input {
  border-color: #ed5d5d;
  background-color: rgba($color: #ed5d5d, $alpha: 0.08);
}
.dateEducation input {
  height: 40px !important;
}
.btn {
  margin-left: 2rem;
  // background-color: #ed5 d5d;
  color: black;
}
</style>
