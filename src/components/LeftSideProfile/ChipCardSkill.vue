<template>
  <div
    class="item-skill"
    :class="{
      'h-10': isHeight,
      'bg-white rounded-2xl': isBg,
      'justify-center': isCenter,
    }"
    :style="{
      marginTop: marginTop,
      marginBottom: marginBottom,
      marginRight: marginRight,
    }"
    @click.self="openEditModal"
  >
    <button @click="deleteItem" class="btn-delete" v-if="isIcon">
      <XIcon />
    </button>
    <img :src="item.image" />
    <span
      class="w-12 truncate pointer-events-auto"
      v-tooltip.bottom="item.name"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
import XIcon from "../ManagementSkillset/XIcon";
import { mapMutations } from "vuex";
import { LIST_TYPE_MODAL } from "../../constants/typeModal";

export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({
        description: "string",
        detailSubCategoryId: 0,
        image: "string",
        name: "string",
      }),
    },
    isHeight: {
      type: Boolean,
    },
    isBg: {
      type: Boolean,
    },
    isCenter: {
      type: Boolean,
    },
    marginTop: {
      type: String,
    },
    isIcon: {
      type: Boolean,
    },
    marginBottom: {
      type: String,
    },
    marginRight: {
      type: String,
    },
    subCategoryId: {
      type: Number,
    },
  },
  components: {
    XIcon,
  },
  data() {
    return {
      iconPro: {
        paramsRouter: this.$route.params.id,
      },
    };
  },
  computed: {
    getSrcIcon() {
      return this.iconPro[this.item.toLowerCase()];
    },
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
    deleteItem() {
      this.SET_IS_SHOW(this.item.id);
      this.SET_SUB_ID_DELETE(+this.subCategoryId);
      this.SET_TITLE("Detail Sub Category");
      this.SET_NAME_DETAIL("Detail Sub Category");
      this.SET_CASE_DELETE(5);
    },
    openEditModal() {
      this.getDataEdit({
        ...this.item,
        type: LIST_TYPE_MODAL.TYPE_EDIT_SUB_DETAIL_CATEGORY,
        id: this.item.id,
        subCategoryId: this.subCategoryId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item-skill {
  transition: all 0.2s;
  @apply flex items-center px-2 font-medium rounded-xl relative cursor-pointer z-30;

  img {
    @apply w-8 h-3/4 mr-2 pointer-events-none;
  }
}
.item-skill:hover {
  transition: all 0.5s;
  @apply bg-gray-400;
}
.item-skill:hover {
  .btn-delete {
    opacity: 1;
  }
}
.btn-delete {
  top: -16%;
  right: -8%;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.5;
  z-index: 9999;
  @apply absolute;
}

.btn-delete:focus {
  outline: none;
}
</style>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
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
  border-color: black;
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
