<template>
  <div class="timeline">
    <div class="w-full sm:w-auto flex justify-end">
      <div class="dropdown">
        <button
          @click="openAddTimeline()"
          class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
          aria-expanded="false"
        >
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
    <!--    <PopupTimeline :addTimelines="addTimelines" />-->
    <div class="timeline-content">
      <div class="timeline-inner">
        <div
          v-if="sortedTimeline.length === 0 && !isLoading"
          class="text-center opacity-70 mt-16 pb-40 pt-20"
          style="background-color: #f2f8fc"
        >
          <img
            alt="Icewall Tailwind HTML Admin Template"
            class="h-80 m-auto mb-4"
            :src="require(`@/assets/images/error-illustration.svg`)"
          />No information yet, please add a new one
        </div>
        <Article
          v-for="timeline in sortedTimeline"
          :key="timeline.id"
          :timeline="timeline"
          :timelines="timelines"
          class="article"
          :accountId="accountId"
        >
        </Article>
      </div>
    </div>
  </div>
</template>
<script>
import { ArchiveIcon } from "vue-feather-icons";
import { EditIcon } from "vue-feather-icons";
import "vue2-datepicker/index.css";
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/api";
import Article from "../../components/Timeline/Article";

export default {
  components: { Article },
  component: {
    ArchiveIcon,
    EditIcon,
  },
  data() {
    return {
      accountId: "",
      sortedTimeline: [],
      timelines: [],
    };
  },
  methods: {
    ...mapMutations("popupAddTimeline", [
      "SET_SHOW_ADD_TIMELINE",
      "SET_ACCOUNT_ID",
    ]),
    ...mapMutations("loading", ["SET_LOADING"]),
    //open add Timeline
    openAddTimeline() {
      this.SET_SHOW_ADD_TIMELINE("true");
    },
    //get data timelines from api
    async getTimelines() {
      this.SET_LOADING(true);
      const result = await api("getTimelinesApi", this.accountId);
      this.timelines = [...result.data.data];
      this.sortedTimeline = [...this.timelines];
      this.sortList(this.sortedTimeline);
      this.SET_LOADING(false);
    },
    //start : sort list
    sortList(arr) {
      arr.sort((prev, next) => {
        return (
          Date.parse(prev.startDate) +
          Date.parse(prev.endDate) -
          (Date.parse(next.startDate) + Date.parse(next.endDate))
        );
      });
    },
  },
  computed: {
    ...mapGetters(["flagChange"]),
    ...mapGetters("loading", { isLoading: "loading" }),
  },
  watch: {
    flagChange(newValue) {
      if (newValue === true) {
        this.getTimelines();
        this.$store.commit("SET_FLAG_CHANGE", false);
      }
    },
    timelines(newValue) {
      this.sortedTimeline = [...newValue];
      this.sortList(this.sortedTimeline);
    },
    $route: {
      handler: async function (to) {
        this.accountId = to.params.id;
        this.SET_ACCOUNT_ID(to.params.id);
      },
      immediate: true,
    },
  },
  async created() {
    await this.getTimelines();
  },
};
</script>
<style lang="scss">
.timeline {
  .timeline-content::-webkit-scrollbar {
    display: none;
  }
  .timeline-content {
    @apply flex justify-center rounded mt-4;
    height: 700px;
    overflow-y: scroll;
    .timeline-inner {
      @apply w-11/12;
      .article {
        position: relative;
        @apply flex w-11/12 justify-center mb-4;
        .line {
          height: 100%;
          @apply text-center;
          .line-icon {
            height: 20%;
          }
          .line-vertical {
            position: absolute;
            border-left: 1px solid gray;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
