<template>
  <div class="category-container">
    <div class="card-wrap">
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
              class="action cursor-pointer"
              @click="openEditModal"
              role="button"
              data-dismiss="dropdown"
              ><Edit2Icon class="w-4 h-4 mr-2 text-blue-900" />Update</a
            >
            <a
              href="#"
              class="action"
              @click="deleteCategory"
              role="button"
              data-dismiss="dropdown"
              ><TrashIcon class="w-4 h-4 mr-2 text-gray-900" />
              Delete
            </a>
          </div>
        </div>
      </div>
      <svg
        width="292"
        height="224"
        viewBox="0 0 292 224"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <path
            d="M4 26.8509V13C4 7.47715 8.47715 3 14 3H71.0187C74.1557 3 77.111 4.47209 79.0007 6.97608L90.9993 22.8748C92.889 25.3788 95.8443 26.8509 98.9813 26.8509H277.974C283.507 26.8509 287.988 31.344 287.974 36.877L287.526 209.026C287.512 214.539 283.039 219 277.526 219H14C8.47715 219 4 214.523 4 209V26.8509Z"
            fill="#FFFFFF"
          />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="291.974"
            height="224"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0.32 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
    <div class="card-content" @click="changeRouter">
      <div
        class="name-cate"
        :style="{ backgroundColor: section.color }"
        v-tooltip.bottom="section.name"
      >
        {{ section.name }}
      </div>
      <div class="desc-cate" v-tooltip.bottom="section.description">
        <span>{{ section.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { LIST_TYPE_MODAL } from "../../constants/typeModal";
export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      typeModal: LIST_TYPE_MODAL,
    };
  },
  component: {},
  methods: {
    ...mapMutations("management", ["toggleCallApi", "getDataEdit"]),
    ...mapMutations("popupDelete", [
      "SET_IS_SHOW",
      "SET_TITLE",
      "SET_NAME_DETAIL",
      "SET_CASE_DELETE",
    ]),
    changeRouter() {
      this.$router.push(`/management-skillset/${this.section.id}`);
    },
    openEditModal() {
      this.getDataEdit({
        ...this.section,
        type: this.typeModal.TYPE_EDIT_CATEGORY,
      });
    },
    deleteCategory() {
      this.SET_IS_SHOW(this.section.id);
      this.SET_TITLE("category");
      this.SET_NAME_DETAIL("category");
      this.SET_CASE_DELETE(3);
    },
  },
};
</script>

<style lang="scss" scoped>
.category-container {
  @apply my-4 mr-14 cursor-pointer relative;
}
.custom-class {
  @apply transition-all hover:text-gray-500;
}
.action {
  @apply block p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md;
}
.dropdown {
  top: 17%;
  right: 3%;
  @apply absolute;
}
button:focus {
  @apply focus:outline-none;
}
.card-content {
  width: 250px;
  height: 170px;
  z-index: 5;
  position: absolute;
  top: 22%;
  left: 6%;
}
.card-wrap {
  z-index: 1;
}

.name-cate {
  max-width: 90%;
  @apply text-xl font-medium inline-block px-3 rounded-md text-white truncate;
}

.desc-cate {
  @apply text-sm mt-6 text-gray-700 font-medium max-w-full line-clamp-3;
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
