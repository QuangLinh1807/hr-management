<template>
  <div>
    <transition name="fadeIn" appear>
      <div
        class="modal-overlay fixed"
        v-if="showAddTimeline"
        @click="closeTimeline()"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div
        class="detail-popup-timeline fixed bg-white rounded-lg p-8"
        v-if="showAddTimeline"
      >
        <button class="absolute top-2 right-2" @click="closeTimeline()">
          <xIcon />
        </button>
        <div class="title text-center text-base font-semibold mb-6">
          {{ addTimeline }}
        </div>
        <hr />
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submitForm)">
            <PerfectScrollbar
              class="form-timeline-area relative"
              id="container"
            >
              <div
                class="item-timeline my-4"
                v-for="(item, index) of listTimeline"
                :key="index"
              >
                <button
                  class="flex items-center mb-3 w-full justify-end"
                  @click.prevent="removeTimeline(index)"
                  v-show="index || (!index && listTimeline.length > 1)"
                >
                  <xIcon class="w-5 h-5" />
                </button>
                <div class="item-timeline flex">
                  <label class="mt-3">Period:</label>
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, failedRules }"
                    class="vali-date-timeline"
                  >
                    <DatePicker
                      v-model="item.range"
                      lang="en"
                      range
                      type="month"
                      format="M/YYYY"
                      :disabled-date="disabledBeforeToday"
                      class="month-input mb-1"
                      :class="{ error: errors[0] }"
                    >
                    </DatePicker>
                    <div class="failed-rules h-3 mb-2">
                      {{
                        failedRules.required ? "The time field is required" : ""
                      }}
                    </div>
                  </ValidationProvider>
                </div>
                <div class="item-timeline mb-2 flex">
                  <label class="mt-3">Title:</label>
                  <BaseInput :inputField="fieldTitle" v-model="item.title" />
                </div>
                <div class="item-timeline w-full flex mb-2">
                  <label class="">Content:</label>
                  <BaseTextarea
                    :textareaField="fieldContent"
                    v-model="item.content"
                  ></BaseTextarea>
                </div>
                <hr />
              </div>
            </PerfectScrollbar>
            <button
              class="flex items-center mb-4 mt-2"
              @click.prevent="addMoreTimeline()"
            >
              <Plus-SquareIcon class="w-5 h-5 mr-2"></Plus-SquareIcon>Add more
              Timeline
            </button>
            <div class="flex justify-center">
              <div class="w-2/4 flex justify-between">
                <button type="submit" class="btn-add">Save</button>
                <button @click="closeTimeline()" class="btn-close">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseInput from "../../components/BaseInput/BaseInput.vue";
import BaseTextarea from "../../components/BaseTextarea/BaseTextarea.vue";
import DatePicker from "vue2-datepicker";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import { mapGetters, mapMutations } from "vuex";
import api from "../../api/api";
import moment from "moment";

export default {
  components: {
    DatePicker,
    BaseInput,
    BaseTextarea,
    PerfectScrollbar,
  },
  name: "PopupTimeline",
  computed: {
    ...mapGetters("popupAddTimeline", ["showAddTimeline", "accountId"]),
  },
  data() {
    return {
      range: new Date(),
      showPopupTimeline: false,
      submitted: false,
      addTimeline: "Add Timeline",
      listTimelineFromApi: [
        {
          range: "",
          title: "",
          content: "",
        },
      ],
      listTimeline: [],
      fidldDate: {
        name: "datepicker",
        rules: "required",
      },
      fieldTitle: {
        name: "title",
        model: "",
        rules: "required|min:4|max:50",
        type: "text",
      },
      fieldContent: {
        name: "content",
        model: "",
        rules: "required|min:4|max:512",
      },
    };
  },
  props: {
    addTimelines: {
      type: Function,
      default: () => 1,
    },
  },
  created() {
    this.bindinglistTimeline();
  },
  methods: {
    ...mapMutations("popupAddTimeline", ["SET_SHOW_ADD_TIMELINE"]),
    ...mapMutations("loading", ["SET_LOADING"]),
    disabledBeforeToday(date) {
      return date > new Date();
    },
    addMoreTimeline() {
      if (this.listTimeline.length < 5) {
        this.listTimeline.push({
          range: "",
          title: "",
          content: "",
        });
        this.scrollToEnd();
      } else {
        this.$notify({
          group: "foo",
          title: "Error",
          text: "Cannot Add Timeline, you have enough 5 items",
          type: "error",
        });
      }
    },
    removeTimeline(idtime) {
      if (this.listTimeline.length > 1) {
        this.listTimeline.splice(idtime, 1);
      }
    },
    closeTimeline() {
      this.SET_SHOW_ADD_TIMELINE(false);
      this.listTimeline = JSON.parse(JSON.stringify(this.listTimelineFromApi));
    },
    scrollToEnd() {
      this.$nextTick(() => {
        var container = document.querySelector("#container");
        container.scrollTop = container.scrollHeight;
      });
    },
    //format date
    formatDateTime(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    async submitForm() {
      this.addTimelines(this.listTimeline);
      let insertValues = [];
      this.listTimeline.forEach((item) => {
        insertValues.push({
          content: item.content,
          endDate: this.formatDateTime(item.range[1]),
          startDate: this.formatDateTime(item.range[0]),
          title: item.title,
        });
      });
      const result = await api("addTimelineApi", {
        listTimelines: insertValues,
        accountId: this.accountId,
      });
      if (result.success === true) {
        this.SET_LOADING(false);
        this.$store.commit("SET_FLAG_CHANGE", true);

        this.SET_SHOW_ADD_TIMELINE(false);
        this.$notify({
          group: "foo",
          title: "Success",
          text: "Successfully added timeline",
          type: "success",
        });
      }
      this.listTimeline = JSON.parse(JSON.stringify(this.listTimelineFromApi));
    },
    bindinglistTimeline() {
      this.listTimeline = JSON.parse(JSON.stringify(this.listTimelineFromApi));
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 22;
  background-color: rgba(0, 0, 0, 0.3);
}
.detail-popup-timeline {
  z-index: 200;
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
.item-timeline label {
  width: 70px;
  float: left;
}
.item-timeline:last-child {
  margin-bottom: 0;
}
.btn-add {
  @apply bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold mx-auto;
  transition: 0.1s linear;
}
.btn-close {
  @apply px-10 py-3 rounded-lg font-semibold mx-auto  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
  border: 1px solid #e2e8f0;
}
.btn-add:hover {
  opacity: 0.8;
}
.form-timeline-area {
  max-height: 600px;
  width: 100%;
  padding: 0 16px;
}
.vali-date-timeline {
  width: calc(100% - 70px);
  .month-input {
    width: 100% !important;
  }
}
.failed-rules {
  color: #ed5d5d;
}
.mx-datepicker-range {
  width: 100%;
}
</style>

<style lang="scss">
.detail-popup-timeline {
  input {
    transform: none !important;
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
</style>
