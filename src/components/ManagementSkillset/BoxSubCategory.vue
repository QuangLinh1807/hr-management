<template>
  <div class="card-container">
    <div class="dropdown inline-block" data-placement="right-start">
      <button class="dropdown-toggle" aria-expanded="false">
        <more-vertical-icon
          size="1.5x"
          class="custom-class"
        ></more-vertical-icon>
      </button>
      <div class="dropdown-menu w-36">
        <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
          <a
            class="action"
            @click="openEditModal"
            role="button"
            data-dismiss="dropdown"
            ><Edit2Icon class="icon-edit" />Update</a
          >
          <a
            href="#"
            class="action"
            @click="deleteSubCategory"
            role="button"
            data-dismiss="dropdown"
            ><TrashIcon class="icon-delete" />
            Delete
          </a>
        </div>
      </div>
    </div>
    <div class="title-card" v-tooltip.bottom="category.name">
      <HashIcon size="1.5x" class="mr-1"></HashIcon>
      <p class="category-title">
        {{ category.name }}
      </p>
    </div>
    <div class="skill-container">
      <ChipCardSkill
        v-for="item of category.listDetailSubCategories"
        :key="item.id"
        :item="item"
        :isHeight="true"
        :isBg="true"
        :isIcon="true"
        marginRight="1rem"
        marginBottom="14px"
        :subCategoryId="category.id"
      />
      <plus-circle-icon
        size="1.8x"
        @click="addMoreItem"
        class="icon-add"
      ></plus-circle-icon>
    </div>
    <div class="image-container mt-auto">
      <div class="image-wrapper"><img :src="category.image" /></div>
    </div>
  </div>
</template>

<script>
import ChipCardSkill from "../LeftSideProfile/ChipCardSkill";
import { mapMutations } from "vuex";
import { LIST_TYPE_MODAL } from "../../constants/typeModal";

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  components: {
    ChipCardSkill,
  },
  data() {
    return {
      paramsRouter: this.$route.params.id,
    };
  },
  methods: {
    ...mapMutations("management", ["toggleCallApi", "getDataEdit"]),
    ...mapMutations("popupDelete", [
      "SET_IS_SHOW",
      "SET_TITLE",
      "SET_NAME_DETAIL",
      "SET_CASE_DELETE",
      "SET_SUB_ID_DELETE",
    ]),
    addMoreItem() {
      this.getDataEdit({
        id: this.category.id,
        type: LIST_TYPE_MODAL.TYPE_SUB_DETAIL_CATEGORY,
      });
    },
    openEditModal() {
      this.getDataEdit({
        ...this.category,
        type: LIST_TYPE_MODAL.TYPE_EDIT_SUB_CATEGORY,
      });
    },
    deleteSubCategory() {
      this.SET_IS_SHOW(this.category.id);
      this.SET_SUB_ID_DELETE(+this.paramsRouter);
      this.SET_TITLE("Sub Category");
      this.SET_NAME_DETAIL("Sub Category");
      this.SET_CASE_DELETE(4);
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  @apply block p-2 transition duration-300 ease-in-out bg-white
  dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md;
}
.dropdown {
  top: 6%;
  right: 3%;
  @apply absolute;
}

.card-container {
  max-width: 20vw;
  min-width: 20%;
  height: fit-content;
  border: 0.5px solid rgba($color: gray, $alpha: 0.2);
  transition: all 0.2s;
  @apply bg-gray-300 mt-3 rounded-lg mx-2 mb-6 pt-3 items-center flex flex-col relative;
}

.card-container:hover {
  transition: all 0.5s;
  @apply bg-gray-200;
}

.skill-container {
  @apply w-full rounded-xl grid mt-4 px-2 xl:grid-cols-3 md:grid-cols-2;
}

.image-container {
  @apply flex items-center justify-end my-2 rounded h-1/4 w-11/12;

  .image-wrapper {
    width: 50px;
    height: 50px;

    img {
      @apply h-full w-full rounded object-cover object-center;
    }
  }
}

.title-card {
  @apply h-1/4 flex items-center mr-auto text-left pl-2 w-1/2;

  .category-title {
    @apply text-xl font-semibold truncate w-56;
  }
}
.icon-edit {
  @apply w-4 h-4 mr-2 text-blue-900;
}

.icon-delete {
  @apply w-4 h-4 mr-2 text-gray-900;
}

.icon-add {
  @apply mt-2 cursor-pointer;
}

button:focus {
  @apply focus:outline-none;
}

.custom-class {
  @apply transition-all hover:text-black;
}
</style>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
  word-break: break-all;
  max-width: 15rem;
}

.tooltip .tooltip-inner {
  background: #2e2e2e;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #2e2e2e;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
