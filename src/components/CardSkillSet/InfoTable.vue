<template>
  <div class="w-full mb-4 bg-gray-100 rounded mt-4">
    <RowDetail
      v-for="rowData of formatListDetail"
      :key="rowData.id"
      :rowData="rowData"
      :year="rowData.listEmployeeSkills[0].year"
      :level="rowData.listEmployeeSkills[0].level"
      @edit-detail="$emit('edit-detail', $event)"
    ></RowDetail>
  </div>
</template>

<script>
import RowDetail from "./RowDetail.vue";

export default {
  components: {
    RowDetail,
  },
  props: {
    listDetailSubCategory: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formatListDetail() {
      const formatData = this.listDetailSubCategory.map((detail) => {
        if (!detail.listEmployeeSkills[0]) {
          detail.listEmployeeSkills.push({ id: null, year: null, level: null });
        }
        return detail;
      });
      return formatData;
    },
  },
};
</script>

<style lang="scss" scoped></style>
