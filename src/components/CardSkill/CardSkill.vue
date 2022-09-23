<template>
  <div class="card-skill">
    <div class="image-skill" :style="backgroundSkillSet"></div>
    <div class="skill-title" v-tooltip.bottom="cloneSubCategory.name" >
      {{ cloneSubCategory.name }}
    </div>
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
    <div class="list-sub-skill">
      <table-skill
        :listDetailSubCategory="cloneSubCategory.listDetailSubCategories"
        @edit-detail="editCardSkill"
      ></table-skill>
    </div>
  </div>
</template>

<script>
import TableSkill from "./TableSkill.vue";
import api from "../../api/api";

export default {
  props: {
    subCategory: {
      type: Object,
      required: true,
    },
  },
  components: { TableSkill },
  data() {
    return {
      isEdit: false,
      accId: null,
      updateSubCategory: {
        listDetailCategory: [],
      },
      cloneSubCategory: JSON.parse(JSON.stringify(this.subCategory)),
      paramsId: this.$route.params.id,
    };
  },
  computed: {
    backgroundSkillSet() {
      return {
        "background-image": `url(${this.cloneSubCategory.image})`,
      };
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
  methods: {
    editCardSkill(updatedSkill) {
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
    cancelUpdate() {
      this.isEdit = false;
      this.updateSubCategory = {
        id: this.subCategory.id,
        listDetailCategory: [],
      };
      this.cloneSubCategory = JSON.parse(JSON.stringify(this.subCategory));
    },
    async saveUpdate() {
      try {
        const res = await api("updateProfileSkillSet", {
          updatedData: this.updateSubCategory,
          accountId: this.paramsId,
        });
        if (!res.success) {
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
  },
};
</script>

<style lang="scss" scoped>
.card-skill {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  max-width: 19rem;
  min-width: 17rem;
  max-height: 19rem;
  min-height: 17rem;
  background-color: #f2f8fc;
  @apply relative px-6 py-3 rounded-xl mt-6 ml-4 mb-14 text-center;
}

.image-skill {
  top: -40%;
  transform: translate(-50%, 120%);
  background-position: center;
  background-size: cover;
  @apply absolute w-16 h-16 rounded-lg border border-gray-400 bg-center bg-no-repeat bg-cover left-1/2;
}

.skill-title {
  @apply mb-6 mt-8 font-bold text-lg truncate text-center;
}

.actions {
  @apply absolute top-4 right-2;
}

.action p {
  @apply p-2 border-none;
}

.list-sub-skill {
  @apply w-full;
}

.custom-class {
  @apply mx-2 cursor-pointer;
}

.save {
  @apply text-green-500 hover:text-gray-500;
}

.cancel {
  @apply text-red-500 hover:text-gray-500;
}
</style>
