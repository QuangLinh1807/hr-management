<template>
  <div class="">
    <TopTrendingSkill></TopTrendingSkill>
    <div class="w-full flex justify-between">
      <TotalMember></TotalMember>
      <TopMember></TopMember>
      <DetailSkill></DetailSkill>
    </div>
  </div>
</template>
<script>
import TopTrendingSkill from "../../components/Chart/ToptrendingSkill.vue";
import TotalMember from "../../components/Chart/TotalMember.vue";
import TopMember from "../../components/Chart/TopMember.vue";
import DetailSkill from "../../components/Chart/DetailSkill.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TopTrendingSkill,
    TotalMember,
    TopMember,
    DetailSkill,
  },
  computed: {
    ...mapGetters(["personalInfo"]),
  },
  created() {
    if (this.personalInfo.role === "ROLE_USER") {
      this.$router.push({
        name: "user-profile",
        params: { id: this.personalInfo.accountId },
      });
    }
  },
};
</script>
<style scoped></style>
