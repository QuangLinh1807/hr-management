<template>
  <div class="article">
    <div class="time">
      <p class="time-content">{{ startDate }} - {{ endDate }}</p>
    </div>
    <div class="line">
      <div class="line-icon">
        <div class="line-icon-img">
          <double-chevron />
        </div>
      </div>
      <div>
        <span class="line-vertical"> </span>
      </div>
    </div>
    <div class="timeline-handle">
      <div
        class="display-timeline"
        v-if="timelineEdit.isEdit === false"
        @mouseenter="handleShow = true"
        @mouseleave="handleShow = false"
      >
        <div class="timeline-title">
          <h2 class="timeline-title-text">
            {{ timelineEdit.title }}
          </h2>
          <div class="timeline-edit-delete" v-show="handleShow">
            <div class="edit-button" @click="timelineEdit.isEdit = true">
              <EditIcon class="edit-button-timeline" />
            </div>
            <a class="delete-button" @click="openDelete(timelineEdit.id)">
              <TrashIcon class="delete-button-timeline"
            /></a>
          </div>
        </div>
        <div class="timeline-p">
          <p>
            {{ timelineEdit.content }}
          </p>
        </div>
      </div>
      <div class="edit-timeline" v-else>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submitForm)">
            <div class="form-edit">
              <div class="form-edit-content">
                <ValidationProvider
                  v-slot="{ errors, classes }"
                  :rules="fieldTitle.rules"
                  class="validate"
                  :name="fieldTitle.name"
                >
                  <div class="type-text" v-if="fieldTitle.type === 'text'">
                    <label class="label-edit form-label">{{
                      fieldTitle.name
                    }}</label>
                    <input
                      :type="fieldTitle.type"
                      class="form-control w-full"
                      placeholder="Input text"
                      v-model="timelineEdit.title"
                      :class="{ error: errors[0] }"
                    />
                    <div class="text-error style-span" :class="classes">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors, classes }"
                  :rules="fieldContent.rules"
                  class="validate"
                  :name="fieldContent.name"
                >
                  <div v-if="fieldContent.type === 'textarea'">
                    <label class="form-label font-bold text-base">{{
                      fieldContent.name
                    }}</label>
                    <textarea
                      class="form-control w-full"
                      v-model="timelineEdit.content"
                      cols="30"
                      rows="10"
                    ></textarea>
                    <div class="text-error style-span" :class="classes">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>
                <div class="timeline-p">
                  <p class="text-red-600">{{ error_message }}</p>
                </div>
              </div>
            </div>

            <div class="text-right mt-5">
              <button
                type="submit"
                class="btn btn-primary w-24 text-white"
                style="color: white"
              >
                Save
              </button>
              <a
                class="btn btn-outline-secondary w-24 ml-4"
                @click="cancelDelete()"
              >
                Cancel
              </a>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DoubleChevron from "../svg/DoubleChevron";
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/api";
export default {
  name: "Article",
  components: { DoubleChevron },
  props: {
    timeline: {
      type: Object,
      default: () => {
        return {};
      },
    },
    accountId: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      timelineEdit: {},
      error_message: "",
      handleShow: false,
      fieldTitle: {
        type: "text",
        placeholder: "Title",
        name: "Title",
        model: "",
        rules: "required|min:4|max:50",
      },
      fieldContent: {
        type: "textarea",
        placeholder: "Content",
        name: "Content",
        model: "",
        rules: "required|min:4|max:512",
      },
    };
  },
  methods: {
    ...mapMutations("popupDelete", [
      "SET_TITLE",
      "SET_NAME_DETAIL",
      "SET_IS_SHOW",
      "SET_CASE_DELETE",
      "SET_ACCOUNT_ID",
    ]),
    ...mapMutations("loading", ["SET_LOADING"]),
    cancelDelete() {
      this.timelineEdit = { ...this.timeline, isEdit: false };
    },
    openDelete(id) {
      this.SET_TITLE("User");
      this.SET_NAME_DETAIL(this.timeline.title);
      this.SET_IS_SHOW(id);
      this.SET_CASE_DELETE(1);
      this.SET_ACCOUNT_ID(this.accountId);
    },
    async submitForm() {
      this.SET_LOADING(true);
      const result = await api("updateTimeLineApi", {
        accountId: this.accountId,
        id: this.timelineEdit.id,
        title: this.timelineEdit.title,
        startDate: moment(this.timelineEdit.startDate).format("DD/MM/YYYY"),
        endDate: moment(this.timelineEdit.endDate).format("DD/MM/YYYY"),
        content: this.timelineEdit.content,
      });
      if (result.success === true) {
        this.$store.commit("SET_FLAG_CHANGE", true);
        this.SET_LOADING(false);
        this.timelineEdit.isEdit = false;
        this.$notify({
          group: "foo",
          title: "Success",
          text: "Successfully edit Timeline",
          type: "success",
        });
      } else {
        this.SET_LOADING(false);
        this.$notify({
          group: "foo",
          title: "error",
          text: "Can not edit Timeline",
          type: "danger",
        });
      }
    },
  },
  computed: {
    ...mapGetters(["isShow"]),
    startDate() {
      return moment(this.timelineEdit.startDate).format("MM/YYYY");
    },
    endDate() {
      return moment(this.timelineEdit.endDate).format("MM/YYYY");
    },
  },
  mounted() {
    this.timelineEdit = { ...this.timeline, isEdit: false };
  },
};
</script>

<style lang="scss" scoped>
.article {
  @apply flex;
  .time {
    @apply w-1/6 flex;
    .time-content {
      @apply text-sm pt-2 break-words;
    }
  }
  .line {
    .line {
      position: relative;
      @apply text-center;
      height: 100%;
      .line-vertical {
        position: absolute;
        border-left: 1px solid gray;
      }
    }
    .line-icon {
      @apply h-56 box-border;
      background-color: #fefefe;
      .line-icon-img {
        @apply rounded-full border-blue-500 border-4 p-3;
      }
    }
    .LineShape {
      .LineShapeDetail {
        @apply flex justify-center;
      }
    }
  }
  .timeline-handle {
    @apply ml-10 w-full;
    .display-timeline {
      @apply flex-wrap;
      .timeline-title {
        @apply flex justify-between h-6;
        .timeline-title-text {
          @apply font-bold text-lg text-left w-4/5 break-words break-all;
        }
        .timeline-edit-delete {
          @apply flex;
          .edit-button {
            @apply w-8 h-8 rounded-full flex justify-center cursor-pointer;
            transition: 300ms all;
            .edit-button-timeline {
              @apply block w-5 h-5 text-blue-900;
              margin: auto;
            }
          }
          .edit-button:hover {
            @apply bg-blue-900;
            .edit-button-timeline {
              color: white;
            }
          }
          .delete-button {
            @apply cursor-pointer  w-8 h-8 rounded-full flex justify-center;
            .delete-button-timeline {
              @apply w-5 h-5 text-gray-800;
              margin: auto;
            }
          }

          .delete-button:hover {
            transition-delay: 100ms;
            @apply bg-gray-800;
            .delete-button-timeline {
              transition-delay: 100ms;
              color: white;
            }
          }
        }
      }
      .timeline-p {
        @apply pt-2 break-words break-all text-justify text-base;
      }
    }
    .edit-timeline {
      .form-edit {
        .form-edit-content {
          @apply mb-6 w-full;
          .validate {
            @apply mb-6;
            .type-text {
              .label-edit {
                @apply font-bold text-base;
              }
            }
          }
        }
      }
    }
  }
}
.style-span {
  @apply h-3 mb-2;
  color: red;
  padding: 5px;
  margin-top: 5px;
  text-align: left;
}
</style>
