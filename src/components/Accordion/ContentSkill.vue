<template>
  <div class="content-skill">
    <card-skill
      v-for="subCategory of listSubCategory"
      :key="subCategory.id"
      :subCategory="subCategory"
      @update-skillset="$emit('update-skillset', $event)"
    ></card-skill>
  </div>
</template>

<script>
import CardSkill from "../CardSkill/CardSkill.vue";
export default {
  components: { CardSkill },
  props: {
    listSubCategory: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.content-skill {
  @apply grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 mt-8;
}
</style>
