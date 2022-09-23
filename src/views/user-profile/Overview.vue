<template>
  <div>
    <div class="flex w-full justify-between my-8">
      <CardPersonProfile :departmentList="departmentList" />
      <GeneralSkill />
    </div>
    <div class="flex w-full justify-between mb-8">
      <EducationEndCareer />
      <DegreesAndCertificates />
    </div>
    <Objective />
  </div>
</template>
<script>
import CardPersonProfile from "../../components/CardProfile/CardPesonalProfile.vue";
import GeneralSkill from "../../components/CardProfile/GeneralSkill.vue";
import EducationEndCareer from "../../components/CardProfile/EducationEndCareer.vue";
import DegreesAndCertificates from "../../components/CardProfile/DegreesAndCertificates.vue";
import Objective from "../../components/CardProfile/Objective";
import api from "@/api/api";
export default {
  data() {
    return {
      updateFromApi: null,
      departmentList: [],
    };
  },
  components: {
    CardPersonProfile,
    EducationEndCareer,
    DegreesAndCertificates,
    Objective,
    GeneralSkill,
    // PopupAddEducation,
  },
  async created() {
    await this.getDepartmentFromApi();
  },
  methods: {
    async getDepartmentFromApi() {
      try {
        const res = await api("getDepartmentProfileApi");
        this.departmentList = [...res.data.data];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
