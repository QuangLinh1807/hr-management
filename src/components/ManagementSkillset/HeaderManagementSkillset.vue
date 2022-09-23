<template>
  <div class="title-container">
    <div class="title">
      <p>Management Skillset</p>
    </div>
    <div class="add-action">
      <button v-if="!paramsRouter" class="btn" @click="addNewFolder">
        Add Folder
      </button>
      <button v-if="paramsRouter" class="btn" @click="addNewCategory">
        Add Subcategory
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { LIST_TYPE_MODAL } from "../../constants/typeModal";

export default {
  data() {
    return {
      paramsRouter: this.$route.params.id,
    };
  },
  methods: {
    ...mapMutations("management", ["getDataEdit"]),
    backManagement() {
      this.$router.push("/management-skillset");
    },
    addNewFolder() {
      this.getDataEdit({ type: LIST_TYPE_MODAL.TYPE_CATEGORY });
    },
    addNewCategory() {
      this.getDataEdit({
        id: this.paramsRouter,
        type: LIST_TYPE_MODAL.TYPE_SUB_CATEGORY,
      });
    },
  },
  watch: {
    $route: function (to) {
      this.paramsRouter = to.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  border-bottom: 2px solid gray;
  @apply flex items-center justify-between h-20;

  .title {
    @apply text-2xl font-medium;
  }

  .add-action {
    @apply mr-2;
  }
}
</style>
