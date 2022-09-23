<template>
  <div class="max-w-4xl rounded overflow-hidden shadow-md mt-6 w-1/3">
    <div
      class="
        intro-y
        col-span-12
        lg:col-span-6
        p-2
        pl-6
        bg-white
        flex
        items-center
        border-b border-gray-200
      "
    >
      <h2 class="text-lg mr-auto font-bold">Detail skill</h2>
      <tree-select
        class="border-gray-300 w-2/5"
        :options="options"
        v-model="onlanguagechange"
        :disable-branch-nodes="true"
        :show-count="true"
        :clearable="false"
        placeholder="Program language"
      />
    </div>
    <div class="p-2 pt-5 overflow-y-auto bg-white h-80">
      <div class="char-detail-skill">
        <ApexCharts
          :key="key"
          type="bar"
          height="270"
          :options="chartOptions"
          :series="series"
        ></ApexCharts>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api";
export default {
  data() {
    return {
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 280,
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"],
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        fill: {
          opacity: 1,
        },
        colors: ["#003993", "#007BC3", "#22AEE5", "#45D1D1", "#F8BF2D"],
        xaxis: {
          categories: ["S", "A", "B", "C", "D"],
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        tooltip: {
          theme: "dark",
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
        },
      },
      key: 1,
      options: [],
      onlanguagechange: null,
    };
  },
  created() {
    this.getCategoryAll();
  },
  methods: {
    async getCategoryAll() {
      const res = await api("getCategoryAll");
      const Options = res.data.data.map((category) => {
        const option = {};
        option.id = category.id;
        option.label = category.name;
        option.children =
          category.listSubCategories &&
          category.listSubCategories.map((subCategory) => {
            const subOption = {};
            subOption.id = subCategory.id;
            subOption.label = subCategory.name;
            subOption.children =
              subCategory.listDetailSubCategories &&
              subCategory.listDetailSubCategories.map((detailCategory) => {
                const subDetail = {};
                subDetail.id = detailCategory.id;
                subDetail.label = detailCategory.name;
                return subDetail;
              });
            return subOption;
          });
        return option;
      });
      this.options = JSON.parse(JSON.stringify(Options));
      let idCategory = this.options[0].children[0].children[0].id;
      this.getDetailSkillApi(idCategory);
    },
    async getDetailSkillApi(id) {
      const resDetail = await api("getDetailSkill", {
        id: id,
      });
      this.series[0].data = resDetail.data.data.map((item) => {
        return item.memberQuantity;
      });
    },
  },
  watch: {
    async onlanguagechange(newValue) {
      await this.getDetailSkillApi(newValue);
      this.key += 1;
    },
  },
};
</script>
<style scoped></style>
