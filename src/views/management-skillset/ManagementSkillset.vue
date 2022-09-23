<template>
  <div>
    <div v-if="!dataFromApi && !isLoading" class="text-center opacity-60 mt-16">
      <img
        alt="Icewall Tailwind HTML Admin Template"
        class="h-40 m-auto mb-4"
        :src="require(`@/assets/images/error-illustration.svg`)"
      />No information yet
    </div>
    <div class="container-page" v-if="!isLoading">
      <BoxCategory v-for="item of dataFromApi" :key="item.id" :section="item" />
    </div>
  </div>
</template>
<script>
import BoxCategory from "../../components/ManagementSkillset/BoxCategory";
import api from "../../api/api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dataFromApi: null,
    };
  },
  components: {
    BoxCategory,
  },
  methods: {
    async getDataFromApi() {
      try {
        this.$store.commit("loading/SET_LOADING", true);
        const res = await api("getListCategories");
        if (!res.success) {
          this.$store.commit("SET_ERROR_PAGE", 403);
          this.$router.push("/not-found");
          this.$store.commit("loading/SET_LOADING", false);
          throw new Error("An error occurred.");
        }
        this.$store.commit("loading/SET_LOADING", false);
        this.dataFromApi = res.data.data;
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
  watch: {
    getIsCallApi: function () {
      this.getDataFromApi();
    },
  },
  async created() {
    await this.getDataFromApi();
  },
};
</script>
<style lang="scss" scoped>
.container-page {
  @apply flex flex-wrap ml-16 justify-start;
}
</style>
