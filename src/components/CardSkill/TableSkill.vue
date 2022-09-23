<template>
  <div>
    <div class="table-skill" v-if="listDetailSubCategory.length > 0">
      <div class="table-header">
        <header-table :groupTitle="headerTable"></header-table>
      </div>
      <PerfectScrollbar class="perfect-scoll" ref="scrollBar">
        <div class="table-body">
          <RowDetail
            v-for="(rowData, index) of formatListDetail"
            :key="rowData.id"
            :rowData="rowData"
            :year="rowData.listEmployeeSkills[0].year"
            :order="index"
            :level="rowData.listEmployeeSkills[0].level"
            @edit-detail="$emit('edit-detail', $event)"
          ></RowDetail>
        </div>
      </PerfectScrollbar>
    </div>
    <div v-if="listDetailSubCategory.length === 0">
      <h3>No Data</h3>
    </div>
  </div>
</template>

<script>
import HeaderTable from "./HeaderTable.vue";
import RowDetail from "./RowDetail.vue";

export default {
  props: {
    listDetailSubCategory: {
      type: Array,
      required: true,
    },
  },
  components: {
    HeaderTable,
    RowDetail,
  },
  data() {
    return {
      headerTable: ["Framework", "Years", "Level"],
    };
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
    getScrollBar() {
      return this.$refs.scrollBar.ps;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-skill {
  border-color: #dcdcdc;
  @apply w-full border rounded-lg bg-white;
}

.table-header {
  @apply px-4;
}

.table-body {
  @apply px-4;
}

.perfect-scoll {
  @apply max-h-28 pointer-events-auto;
}
</style>
