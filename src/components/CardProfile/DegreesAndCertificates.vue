<template>
  <div class="card-degree">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(saveInfo)">
        <div class="form-certificate intro-y">
          <div class="form-header">
            <h2 class="text-lg mr-auto font-bold">Degrees And Certificates</h2>
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
              v-if="listDegrees.length === 0"
              class="text-center opacity-60 mt-16"
            >
              <img
                alt="Icewall Tailwind HTML Admin Template"
                class="h-40 m-auto mb-4"
                :src="require(`@/assets/images/error-illustration.svg`)"
              />No information yet, please add a new one
            </div>
            <div
              class="flex sm:flex-row it-cer"
              v-for="(item, index) of listDegrees"
              :key="index"
            >
              <div v-if="!isEditTable" class="withdInput">
                <ValidationProvider
                  rules="required|min:1|max:255"
                  v-slot="{ errors, classes }"
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
              </div>
              <ValidationProvider
                rules="required"
                v-slot="{ errors, classes, failedRules }"
                name="date"
              >
                <DatePicker
                  class="
                    field-date
                    dateCertificate
                    dateEducation
                    text-center
                    mx-2
                  "
                  v-if="!isEditTable"
                  name="date"
                  format="YYYY"
                  value-type="YYYY"
                  v-model="item.date"
                  lang="en"
                  type="year"
                  range
                  :clearable="false"
                  :class="{ error: errors[0] }"
                ></DatePicker>
                <div
                  v-if="!isEditTable"
                  class="text-red-600 ml-4 mt-1"
                  :class="classes"
                >
                  {{ failedRules.required ? "The year field is required" : "" }}
                </div>
              </ValidationProvider>
              <button
                v-if="!isEditTable"
                class="btn-popup-delete rm-cer"
                @click.prevent="openDelete(item.id, item.title)"
              >
                <XIcon class="icon-popup-delete" />
              </button>
              <div v-if="isEditTable" class="show-body">
                <div class="w-3/4">
                  <div class="show-body-title">
                    {{ item.title }}
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
            type="button"
            @click="openAddCertificate"
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
      listDergeesFromApi: [],
      listDegrees: [],
      data: null,
      accId: null,
    };
  },
  async created() {
    // await this.getCertificateApi();
    this.bindinglistDegrees();
  },
  computed: {
    ...mapGetters("certificate", ["renderListField"]),
  },
  watch: {
    renderListField: {
      handler: function (val) {
        this.bindinglistDegrees();
      },
      immediate: true,
    },
    $route: {
      handler: async function (to) {
        this.accId = to.params.id;
        await this.$store.dispatch("certificate/getCertificateApi", {
          accountId: to.params.id,
        });
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations("loading", ["SET_LOADING"]),
    ...mapMutations("certificate", ["SET_IS_SHOW_ADD"]),
    ...mapMutations("popupDelete", [
      "SET_TITLE",
      "SET_NAME_DETAIL",
      "SET_IS_SHOW",
      "SET_CASE_DELETE",
      "SET_ACCOUNT_ID",
    ]),
    openDelete(cerId, title) {
      this.SET_TITLE("Degrees and Certificates");
      this.SET_NAME_DETAIL(title);
      this.SET_IS_SHOW(cerId);
      this.SET_CASE_DELETE(8);
      this.SET_ACCOUNT_ID(this.accId);
    },
    toggleDisable() {
      this.isEditTable = false;
    },
    async saveInfo() {
      await this.putCertificateApi();
    },
    closeSave() {
      this.isEditTable = true;
      this.bindinglistDegrees();
    },
    bindinglistDegrees() {
      this.listDegrees = JSON.parse(JSON.stringify(this.renderListField));
    },
    openAddCertificate() {
      this.SET_IS_SHOW_ADD(true);
    },
    scrollToEnd() {
      this.$nextTick(() => {
        let container = this.$el.querySelector("#container");
        container.scrollTop = container.scrollHeight;
      });
    },
    async putCertificateApi() {
      try {
        this.SET_LOADING(true);
        const updateData = this.listDegrees.map((item) => {
          return {
            certificateId: item.id,
            name: item.title,
            startDate: `01/01/${item.date[0]}`,
            endDate: `01/01/${item.date[1]}`,
          };
        });
        this.SET_LOADING(false);
        const res = await api("putCertificateApi", {
          data: updateData,
          accountId: this.accId,
        });

        if (!res.success) {
          this.isEditTable = false;
          // throw new Error(res.data.response.data.message);
          throw new Error(res.data.response.data.errors[0].message);
        }
        this.SET_LOADING(false);
        await this.$store.dispatch("certificate/getCertificateApi", {
          accountId: this.accId,
        });
        this.isEditTable = true;
        this.bindinglistDegrees();
        this.$notify({
          group: "foo",
          title: "success",
          text: "Successfully save Certificate",
          type: "success",
        });
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
.card-degree {
  // border: 1px solid #cecece;
  background-color: #f2f8fc;
  @apply max-w-2xl rounded overflow-hidden w-1/2;
}
.dateEducation {
  width: calc(100% - 10px) !important;
}
.dateCertificate {
  // width: calc(100% - 10px) !important;
  width: 80% !important;
  margin-left: 1.2rem;
  float: right;
  margin-bottom: 5px;
}

.form-certificate {
  @apply col-span-12 lg:col-span-6 pb-3;
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
    @apply p-2 h-80;

    .withdInput {
      @apply mr-auto pl-6 w-2/3 focus:outline-none mb-6;

      .field-input {
        @apply w-11/12 font-normal text-base  focus:outline-none px-2;
      }
      .btn-delete {
        @apply focus:outline-none h-10 mr-2;
      }
    }
    .field-date {
      @apply text-center mx-2;
    }
    .btn-popup-delete {
      @apply focus:outline-none h-10 mr-1;

      .icon-popup-delete {
        @apply text-gray-600 focus:outline-none;
      }
    }
    .show-body {
      @apply flex w-full justify-between mb-4;

      .show-body-title {
        @apply mr-auto pl-6 break-words text-lg font-medium;
      }
      .show-body-date {
        @apply text-center mr-5 font-medium text-base;
        margin-top: 3px;
      }
      // .btn-popup-add {
      //   @apply;
      // }
    }
  }
}
</style>
<style lang="scss">
.mx-input-wrapper input {
  height: 46px;
  border: 1px solid #cccccc75;
}
.tit-degree {
  border-bottom: 1px solid #fff;
  @apply flex items-center p-2 pl-6 mb-4;
}
.scroll-education {
  height: 300px;
  input {
    transform: none !important;
    opacity: 1 !important;
    height: 46px !important;
    border-radius: 8px !important;
    margin-top: 0 !important;
    border: 1px solid #cccccc75;
  }
}
.dateCertificate.error .mx-input {
  background-color: #f652523b;
  border-color: #ff000033;
}
.scroll-education input.error {
  background-color: #f652523b;
  border-color: #ff000033;
}
.inputTitle {
  height: 40px;
}
</style>
<style lang="scss" scoped>
.error::placeholder {
  color: #ed5d5d;
}
</style>
