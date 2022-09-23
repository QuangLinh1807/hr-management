<template>
  <div class="skillset">
    <div class="box-top">
      <div class="box-show">
        <button
          class="btn mr-4 hover:bg-gray-300 transition-all"
          @click="isShowAll ? showAll(false) : showAll(true)"
          v-if="!isToggle"
        >
          {{ isShowAll ? "Show less" : "Show All" }}
        </button>
      </div>
      <div class="box-display">
        <list-icon
          class="custom-class"
          @click="toggleDisplay"
          v-if="isToggle"
        ></list-icon>
        <grid-icon
          class="custom-class"
          @click="toggleDisplay"
          v-if="!isToggle"
        ></grid-icon>
      </div>
      <div class="box-input">
        <input
          type="text"
          class="border-none outline-none bg-blue-100"
          placeholder="Search..."
          v-model.trim="search"
          @keyup.enter="searchData"
          @focus="focusInput"
        />
        <SearchIcon class="custom-class" @click="searchData"></SearchIcon>
      </div>
      <div class="dropdown mr-2">
        <button
          class="
            dropdown-toggle
            btn
            box
            text-gray-700
            dark:text-gray-300
            flex
            items-center
          "
          aria-expanded="false"
        >
          Export To CV <ChevronDownIcon class="w-4 h-4 ml-2" />
        </button>
        <div class="dropdown-menu w-40">
          <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
            <button
              class="btn-action"
              data-dismiss="dropdown"
              @click="exportProfileSkill('excel')"
              :disabled="isLoading"
            >
              <FileTextIcon class="hidden sm:block w-4 h-4 mr-2" />
              Export to Excel
            </button>
            <button
              class="btn-action"
              @click="exportProfileSkill('pdf')"
              :disabled="isLoading"
              data-dismiss="dropdown"
            >
              <FileTextIcon class="hidden sm:block w-4 h-4 mr-2" />
              Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="listCategories && listCategories.length === 0 && !isLoading"
      class="text-center opacity-60 mt-16"
    >
      <img
        alt="Icewall Tailwind HTML Admin Template"
        class="h-40 m-auto mb-4"
        :src="require(`@/assets/images/error-illustration.svg`)"
      />No information yet
    </div>
    <div class="w-full" v-if="!isToggle">
      <Accordion
        v-for="category of listCategories"
        :key="category.id"
        :category="category"
        class="mb-4"
        @update-skillset="updateSubCategory"
      >
      </Accordion>
    </div>
    <div v-if="isToggle" class="w-full">
      <masonry
        :cols="{ default: 3, 1280: 2, 1024: 2, 768: 2, 640: 1 }"
        :gutter="{ default: '15px', 700: '10px' }"
      >
        <Category
          v-for="category of listCategories"
          :key="category.id"
          :category="category"
          @update-skillset="updateSubCategory"
        ></Category>
      </masonry>
    </div>
  </div>
</template>

<script>
import apiD from "@/api/api-download";
import api from "@/api/api";
import Accordion from "@/components/Accordion/Accordion";
import Category from "../../components/CardSkillSet/Category.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Accordion,
    Category,
  },
  async created() {
    await this.getSkillSetFromApi();
  },
  data() {
    return {
      isToggle: false,
      isShowAll: true,
      listCategory: [],
      listCategories: [],
      search: null,
      paramsId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters("overview", ["getPersonalProfile"]),
    ...mapGetters("loading", { isLoading: "loading" }),
  },
  methods: {
    toggleDisplay() {
      this.isToggle = !this.isToggle;
      this.listCategories = JSON.parse(JSON.stringify(this.listCategory));
      this.showAll(false);
    },
    showAll(value) {
      this.isShowAll = value;
      this.listCategories = this.listCategories.map((category) => {
        return { ...category, status: value };
      });
    },
    focusInput() {
      this.search = null;
    },
    async searchData() {
      await this.getSkillSetFromApi(this.search);
    },
    async getSkillSetFromApi(searchQuery = null) {
      try {
        this.$store.commit("loading/SET_LOADING", true);
        const res = await api("getProfileSkillSet", {
          searchQuery,
          accountId: this.paramsId,
        });
        if (!res.success) {
          this.$store.commit("loading/SET_LOADING", false);
          throw new Error("An error occured.");
        }

        const resData = res.data.data.map((category) => {
          return { status: true, ...category };
        });
        this.$store.commit("loading/SET_LOADING", false);
        this.listCategory = JSON.parse(JSON.stringify(resData));
        this.listCategories = JSON.parse(JSON.stringify(resData));
      } catch (error) {
        this.$notify({
          group: "foo",
          title: "error",
          text: `${error}`,
          type: "error",
        });
      }
    },
    async updateSubCategory() {
      await this.getSkillSetFromApi();
    },
    async exportProfileSkill(type_export) {
      try {
        const res = await apiD("exportProfileUser", {
          type_export,
          accountId: this.paramsId,
        });
        if (!res.success) {
          throw new Error("An error occurred");
        }
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${this.getPersonalProfile.fullname}.${
            type_export == "pdf" ? "pdf" : "xlsx"
          }`
        );
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        this.$notify({
          group: "foo",
          title: "error",
          text: `${error}`,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.skillset {
  @apply w-full flex flex-col items-center;
}
.box-top {
  @apply mb-6 w-full flex justify-end items-center;
}
.box-display {
  @apply mr-4 p-2 bg-gray-300 rounded-md hover:bg-gray-500 cursor-pointer;
}
.box-input {
  @apply rounded-2xl bg-blue-100 px-2 h-10 flex items-center mr-4;
}

.btn-action {
  @apply flex items-center p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md;
}

.custom-class {
  @apply text-3xl cursor-pointer rounded-sm;
}
</style>
