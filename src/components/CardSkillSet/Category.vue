<template>
  <div class="category" :class="randomClass">
    <h1 class="category-title">{{ category.name }}</h1>
    <div>
      <SubCategory
        v-for="listSubCategory in category.listSubCategories"
        :key="listSubCategory.id"
        :subCategory="listSubCategory"
        @update-skillset="$emit('update-skillset', $event)"
      ></SubCategory>
    </div>
  </div>
</template>

<script>
import SubCategory from "./SubCategory.vue";
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  components: {
    SubCategory,
  },
  created: {},
  methods: {},
  computed: {
    randomClass() {
      return Math.floor(Math.random() + 10);
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  @apply rounded-md bg-gray-100 pt-4 m-2 overflow-hidden w-auto;
}

.category-title {
  @apply px-3 py-2 mx-3 mb-2 font-bold text-gray-800 bg-gray-200 rounded-md text-lg;
}
</style>
