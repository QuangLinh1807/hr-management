<template>
  <div
    class="popup-delete"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="false"
    v-if="showDelete"
  >
    <div class="popup-delete-content">
      <div class="popup-delete-hidden" aria-hidden="true"></div>
      <span class="popup-delete-hidden-color" aria-hidden="true">&#8203;</span>
      <div class="popup-delete-form">
        <div class="popup-delete-form-cover">
          <div class="popup-delete-top">
            <div class="popup-svg">
              <Warning />
            </div>
            <div class="popup-text-center">
              <h3 class="popup-text-top" id="modal-title">
                Delete {{ title }}
              </h3>
              <div class="popup-confirm">
                <p class="confirm-top">
                  Are you sure you want to delete
                  <span class="confirm-span">{{ nameDetail }}</span> in
                  <span class="confirm-span">{{ title }}</span> ? All of your
                  data will be permanently removed. This action cannot be
                  undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="popup-delete-bottom">
          <button @click="deleteTimeline" type="button" class="button-delete">
            Delete
          </button>
          <button
            @click.stop="cancelDelete"
            type="button"
            class="button-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import api from "../../api/api";
import Warning from "../svg/Warning";

export default {
  components: { Warning },
  data() {
    return {
      paramsRouter: this.$route.params.id,
      // accId: null,
    };
  },
  computed: {
    ...mapGetters("popupDelete", [
      "showDelete",
      "title",
      "nameDetail",
      "idDelete",
      "caseDelete",
      "subIdDelete",
      "accountId",
    ]),
  },
  watch: {
    $route: {
      handler: async function (to) {
        this.accId = to.params.id;
      },
    },
  },
  methods: {
    ...mapMutations("popupDelete", ["SET_HIDDEN"]),
    ...mapMutations("loading", ["SET_LOADING"]),
    ...mapMutations("management", ["toggleCallApi"]),
    async deleteTimeline() {
      switch (this.caseDelete) {
        case 1:
          this.deleteFunction(
            "deleteTimelineApi",
            { accountId: this.accountId, timelineId: this.idDelete },
            "timeline"
          );
          break;
        case 2:
          this.deleteFunction("deleteEmployee", this.idDelete, "user");
          break;
        case 3:
          await this.deleteFunction(
            "deleteCategories",
            { id: this.idDelete },
            "category"
          );
          break;
        case 4:
          this.deleteFunction(
            "deleteListSubCategories",
            {
              id: this.idDelete,
              categoryId: this.subIdDelete,
            },
            "subcategory"
          );
          break;
        case 5:
          this.deleteFunction(
            "deleteDetailSubCategories",
            {
              detailSubCategoryId: this.idDelete,
              subCategoryId: this.subIdDelete,
            },
            "detail subcategory"
          );
          break;
        case 6: {
          this.deleteFunction("deleteEmployeeApi", this.idDelete, "employee");
          break;
        }
        case 7: {
          this.deleteFunction(
            "deleteEducationApi",
            {
              accountId: this.accountId,
              educationId: this.idDelete,
            },
            "Education"
          );
          break;
        }
        case 8: {
          this.deleteFunction(
            "deleteCertificateApi",
            {
              accountId: this.accountId,
              certificateId: this.idDelete,
            },
            "Certificate"
          );
          break;
        }
      }
    },
    async deleteFunction(nameApi, payloadApi, message) {
      try {
        this.SET_LOADING(true);
        const result = await api(nameApi, payloadApi);
        this.SET_LOADING(false);
        if (!result.success) {
          this.$store.commit("SET_FLAG_CHANGE", true);
          throw new Error("An error occurred");
        }
        this.SET_LOADING(false);
        this.SET_HIDDEN();
        this.$notify({
          group: "foo",
          title: "Success",
          text: `Successfully delete ${message}`,
          type: "success",
        });
        this.toggleCallApi();
        await this.$store.dispatch("education/getEducationApi", {
          accountId: this.accId,
        });
        await this.$store.dispatch("certificate/getCertificateApi", {
          accountId: this.accId,
        });
        this.$store.commit("SET_FLAG_CHANGE", true);
      } catch (error) {
        this.$notify({
          group: "foo",
          title: "error",
          text: `${error}`,
          type: "error",
        });
        console.log(error);
      }
    },
    cancelDelete() {
      this.SET_HIDDEN();
      this.SET_LOADING(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.popup-delete {
  @apply fixed z-10 inset-0 overflow-y-auto;
  .popup-delete-content {
    @apply flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0;
    .popup-delete-hidden {
      @apply fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity;
    }
    .popup-delete-hidden-color {
      @apply hidden sm:inline-block sm:align-middle sm:h-screen;
    }
    .popup-delete-form {
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
      .popup-delete-form-cover {
        @apply bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4;
        .popup-delete-top {
          @apply sm:flex sm:items-start;
          .popup-svg {
            @apply mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10;
          }
          .popup-text-center {
            @apply mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left;
            .popup-text-top {
              @apply text-lg leading-6 font-medium text-gray-900;
            }
            .popup-confirm {
              @apply mt-2;
              .confirm-top {
                @apply text-sm text-gray-500;
                .confirm-span {
                  @apply text-red-600;
                }
              }
            }
          }
        }
      }
      .popup-delete-bottom {
        @apply bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse;
        .button-delete {
          @apply w-full
          inline-flex
          justify-center
          rounded-md
          border border-transparent
          shadow-sm
          px-4
          py-2
          bg-red-600
          text-base
          font-medium
          text-white
          hover:bg-red-700
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          sm:ml-3
          sm:w-auto
          sm:text-sm;
        }
        .button-cancel {
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
      }
    }
  }
}
</style>
