<template>
  <div>
    <div class="sub-category">
      <h1 class="sub-category-title break-all" @click.self="setIsVisible">
        {{ cloneSubCategory.name }}
      </h1>
      <div class="actions" v-if="isEdit">
        <save-icon
          size="1.5x"
          class="custom-class save"
          @click="saveUpdate"
        ></save-icon>
        <x-icon
          size="1.5x"
          class="custom-class cancel"
          @click="cancelUpdate"
        ></x-icon>
      </div>
    </div>
    <div class="sub-category-table" :class="{ 'h-0': !isVisible }">
      <p class="sub-category-desc">
        {{ cloneSubCategory.description }}
      </p>
      <InfoTable
        :listDetailSubCategory="cloneSubCategory.listDetailSubCategories"
        @edit-detail="editSubCategory"
      ></InfoTable>
    </div>
  </div>
</template>

<script>
import InfoTable from "./InfoTable.vue";
import api from "@/api/api";

export default {
  components: {
    InfoTable,
  },
  props: {
    subCategory: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      isVisible: true,
      isEdit: false,
      updateSubCategory: {
        listDetailCategory: [],
      },
      cloneSubCategory: JSON.parse(JSON.stringify(this.subCategory)),
      paramsId: this.$route.params.id,
    };
  },
  methods: {
    setIsVisible() {
      this.isVisible = !this.isVisible;
    },
    editSubCategory(updatedSkill) {
      this.isEdit = true;
      // update updateSubCategory
      const {
        id,
        listEmployeeSkills: [{ year, level }],
      } = updatedSkill;
      const findIndex = this.updateSubCategory.listDetailCategory.findIndex(
        (sub) => sub.detail_categories_id === id
      );
      if (findIndex > -1) {
        this.updateSubCategory.listDetailCategory.splice(findIndex, 1, {
          detail_categories_id: id,
          year,
          level,
        });
      } else {
        this.updateSubCategory.listDetailCategory.push({
          detail_categories_id: id,
          year,
          level,
        });
      }
      // update subCategory
      const updatedDetailSub =
        this.cloneSubCategory.listDetailSubCategories.map((detailSub) =>
          detailSub.id === updatedSkill.id
            ? { ...detailSub, ...updatedSkill }
            : detailSub
        );
      this.cloneSubCategory = {
        ...this.cloneSubCategory,
        listDetailSubCategories: updatedDetailSub,
      };
    },
    async saveUpdate() {
      // this.$store.commit("overview/SET_CHANGE", true);
      console.log("overview");
      try {
        const res = await api("updateProfileSkillSet", {
          updatedData: this.updateSubCategory,
          accountId: this.paramsId,
        });
        if (res.hasError) {
          throw new Error("An error occurred.");
        }
        await this.$store.dispatch("overview/getPersonalFromApi", {
          accountId: this.paramsId,
        });
        this.isEdit = false;
        this.$emit("update-skillset");
        this.updateSubCategory = {
          listDetailCategory: [],
        };
        this.$notify({
          group: "foo",
          title: "Success",
          text: `Update successfullly`,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          group: "foo",
          title: "error",
          text: `${error}`,
          type: "error",
        });
      }
    },
    cancelUpdate() {
      // this.$store.commit("overview/SET_CHANGE", true);
      this.isEdit = false;
      this.updateSubCategory = {
        id: this.subCategory.id,
        listDetailCategory: [],
      };
      this.cloneSubCategory = JSON.parse(JSON.stringify(this.subCategory));
    },
  },
  watch: {
    subCategory: {
      handler(val) {
        this.cloneSubCategory = JSON.parse(JSON.stringify(val));
        this.isEdit = false;
        this.updateSubCategory = {
          id: this.subCategory.id,
          listDetailCategory: [],
        };
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-category {
  @apply flex items-center px-4 py-2 text-gray-700 border-gray-300 cursor-pointer hover:bg-gray-200 hover:text-gray-900;
}

.sub-category-title {
  @apply flex-1 font-mono text-sm;
}

.sub-category-table {
  @apply bg-gray-200 px-4 overflow-hidden;
}

.sub-category-desc {
  @apply my-3 font-semibold leading-tight text-gray-800 text-base;
}

.actions {
}
.action p {
  @apply p-2 border-none;
}

.list-sub-skill {
  @apply w-full;
}

.custom-class {
  @apply mx-1 cursor-pointer;
}

.save {
  @apply text-green-500 hover:text-gray-500;
}

.cancel {
  @apply text-red-500 hover:text-gray-500;
}
</style>
