<template>
  <div>
    <div v-if="!dataFromApi && !isLoading" class="text-center opacity-60 mt-16">
      <img
        alt="Icewall Tailwind HTML Admin Template"
        class="h-40 m-auto mb-4"
        :src="require(`@/assets/images/error-illustration.svg`)"
      />No information yet
    </div>
    <div class="container-back" v-if="!isLoading" @click="backManagement">
      <button class="btn">
        <chevron-left-icon size="2x" class="custom-class" />
        Go Back
      </button>
    </div>
    <div class="container-detail" v-if="!isLoading && dataFromApi">
      <masonry
        :cols="{ default: 4, 1000: 3, 700: 2, 400: 1 }"
        :gutter="{ default: '10px', 700: '15px' }"
      >
        <BoxSubCategory
          v-for="item of dataFromApi"
          :key="item.id"
          :category="item"
        />
      </masonry>
    </div>
  </div>
</template>

<script>
import BoxSubCategory from "../../components/ManagementSkillset/BoxSubCategory";
import { mapGetters } from "vuex";
import api from "../../api/api";

export default {
  components: {
    BoxSubCategory,
  },
  data() {
    return {
      dataFromApi: null,
      paramsRouter: this.$route.params.id,
    };
  },
  methods: {
    backManagement() {
      this.$router.push("/management-skillset");
    },
    async getDataFromApi() {
      try {
        this.$store.commit("loading/SET_LOADING", true);
        const res = await api("getListSubCategories", this.paramsRouter);
        if (!res.success) {
          this.$store.commit("loading/SET_LOADING", false);
          throw new Error("An error occured.");
        }
        this.dataFromApi = res.data.data;
        this.$store.commit("loading/SET_LOADING", false);
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
  computed: {
    ...mapGetters("management", ["getIsCallApi"]),
    ...mapGetters("loading", { isLoading: "loading" }),
  },
  created() {
    this.getDataFromApi();
  },
  watch: {
    $route: function (to, _) {
      this.paramsRouter = to.params.id;
    },
    getIsCallApi: function () {
      this.getDataFromApi();
    },
  },
};
</script>

<style lang="scss" scoped>
.box-icon {
  left: -1%;
  top: 0%;
}
.container-detail {
  //  grid grid-cols-4 mt-3;
  @apply mt-3;
}

.container-back {
  @apply flex items-center box-icon cursor-pointer mt-2;

  button:focus {
    outline: none;
  }
}

.custom-class {
  @apply cursor-pointer;
}
</style>
