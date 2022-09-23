<template>
  <div>
    <HeaderManagementSkillset />
    <router-view />
  </div>
</template>
<script>
import HeaderManagementSkillset from "../../components/ManagementSkillset/HeaderManagementSkillset.vue";

export default {
  data() {
    return {};
  },
  components: {
    HeaderManagementSkillset,
  },
};
</script>
<style lang="scss" scoped>
.content-page {
  @apply flex flex-wrap justify-between;
}
</style>
