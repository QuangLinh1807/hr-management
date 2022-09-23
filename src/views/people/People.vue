<template>
  <div class="">
    <div class="header-section">
      <div class="title-section flex">
        <h1>People</h1>
      </div>
      <div class="container-section">
        <div class="box-filter">
          <SearchIcon class="search-icon" />
          <input
            type="text"
            class="form-control box text-filter"
            placeholder="Search files"
            v-model="keyword"
            @keyup.enter="handleSearch"
          />
          <div
            class="inbox-filter dropdown filter-container"
            data-placement="right-start"
          >
            <FilterIcon class="dropdown-toggle filter-icon" role="button" />
            <div class="inbox-filter__dropdown-menu dropdown-menu">
              <div class="dropdown-menu__content box p-5">
                <div>Name</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-tools">
        <button
          class="btn btn-delete"
          v-if="!isToggle && selected.length > 0"
          @click="deleteUsers"
        >
          <Trash2Icon size="1.5x" class="mr-1"></Trash2Icon>
          Delete
        </button>
        <button
          class="
            dropdown-toggle
            btn
            px-2
            box
            text-gray-700
            dark:text-gray-300
            mr-5
          "
          aria-expanded="false"
          @click="openAddUser"
        >
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </button>
        <div class="box-display">
          <GridIcon
            class="custom-class"
            :class="{ active: isToggle }"
            @click="toggleDisplay"
          ></GridIcon>
          <ListIcon
            class="custom-class"
            :class="{ active: !isToggle }"
            @click="toggleDisplay"
          ></ListIcon>
        </div>
        <button class="btn bg-blue-800 btn-export">
          <span>
            <Download />
          </span>
          <span class="text-white ml-3"> Export All </span>
        </button>
      </div>
    </div>
    <div class="people-container" v-if="isToggle">
      <CardPeople
        v-for="employee of employeeData"
        :key="employee.accountId"
        :user="employee"
      ></CardPeople>
    </div>
    <div class="table-people" v-if="!isToggle">
      <TablePeople
        :employeeData="employeeData"
        @change-select="selectedItem"
      ></TablePeople>
    </div>

    <div class="float-right mt-6">
      <Pagination
        :currentPage="currentPage"
        :maxVisibleButtons="4"
        :totalPages="totalPage"
        @pagechanged="onPageChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Pagination from "../../components/Pagination/Pagination.vue";
import CardPeople from "../../components/CardPeople/CardPeople.vue";
import TablePeople from "../../components/TablePeople/TablePeople.vue";
import api from "../../api/api";
import Download from "../../components/svg/Download";

export default {
  components: {
    Download,
    CardPeople,
    Pagination,
    TablePeople,
  },
  data() {
    return {
      isToggle: true,
      keyword: "",
      currentPage: 1,
      totalPage: 0,
      selected: [],
      employeeData: [],
    };
  },
  computed: {
    ...mapGetters(["flagChange", "personalInfo"]),
  },
  async created() {
    await this.getEmployeeFromApi(1, this.keyword);
  },
  methods: {
    ...mapMutations("popupAddUser", ["SET_IS_SHOW_ADD", "SET_TITLE_ADD"]),
    ...mapMutations("popupDelete", [
      "SET_IS_SHOW",
      "SET_TITLE",
      "SET_NAME_DETAIL",
      "SET_CASE_DELETE",
    ]),
    ...mapMutations("loading", ["SET_LOADING"]),
    toggleDisplay() {
      this.isToggle = !this.isToggle;
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    selectedItem(selectedValue) {
      this.selected = [...selectedValue];
    },
    handleSearch() {
      this.currentPage = 1;
      this.getEmployeeFromApi(this.currentPage, this.keyword);
    },
    async getEmployeeFromApi(page, search) {
      try {
        this.SET_LOADING(true);
        const res = await api("getEmployeeApi", {
          page: page,
          search: search,
        });
        if (res.success) {
          this.SET_LOADING(false);
        } else {
          if (res.data.response.data.status === 403) {
            this.$router.push("/not-found");
            this.$store.commit("SET_ERROR_PAGE", 403);
          }

          this.SET_LOADING(false);
        }
        const listpeople = res.data.data;
        this.employeeData = listpeople.content;
        this.totalPage = listpeople.totalPages;
      } catch (error) {
        console.log(error);
      }
    },

    openAddUser() {
      this.SET_IS_SHOW_ADD(true);
      this.SET_TITLE_ADD("Add User");
    },
    deleteUsers() {
      this.SET_IS_SHOW(this.selected);
      this.SET_TITLE("employee");
      this.SET_NAME_DETAIL("employee");
      this.SET_CASE_DELETE(6);
    },
  },
  watch: {
    currentPage(updatedValue) {
      this.getEmployeeFromApi(updatedValue, this.keyword);
    },
    flagChange(newValue) {
      if (newValue === true) {
        this.getEmployeeFromApi(this.currentPage, this.keyword);
        this.$store.commit("SET_FLAG_CHANGE", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header-section {
  @apply w-full px-2 mt-2;

  .title-section {
    @apply border-b-2 border-primary-1 pt-4 pb-3;

    h1 {
      @apply text-3xl font-medium mr-auto text-primary-1;
    }
  }
}

.box-display {
  @apply mr-4 px-2 py-1 bg-gray-300 rounded-md box-border;
}

.custom-class {
  @apply cursor-pointer;
  &:first-child {
    @apply mr-2;
  }
  @apply h-full box-content p-1 hover:bg-white text-black rounded-md;
}

.active {
  @apply bg-white;
}

.search-icon {
  @apply w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-gray-700 dark:text-gray-300;
}

.filter-container {
  @apply absolute border-gray-500 border-l pl-2 inset-y-0 mr-3 right-0 flex items-center;
}

.filter-icon {
  @apply w-5 h-5 text-black cursor-pointer dark:text-gray-300;
}

.dropdown-menu {
  top: -0.9rem !important;
  left: 0.9rem !important;
}

.btn-export {
  @apply hover:bg-blue-900 text-primary-1;
}
.people-container {
  @apply grid mx-auto w-full grid-cols-5 gap-6;
}

.box-tools {
  @apply float-right mb-12 flex items-center;
}

.text-filter {
  box-shadow: 1px 2px 10px rgba($color: #2e2e2e, $alpha: 0.15);
  @apply w-full sm:w-full px-10 text-gray-700 dark:text-gray-300 placeholder-theme-8;
}

.box-filter {
  @apply w-full sm:w-2/7 relative mr-auto mt-3 sm:mt-0 flex justify-center mx-auto;
}

.container-section {
  @apply flex flex-col-reverse sm:flex-row items-center mt-6 mb-4;
}

.btn-delete {
  @apply text-red-400 mr-4 bg-gray-300;
}

.table-people {
  @apply mt-6;
}
</style>
