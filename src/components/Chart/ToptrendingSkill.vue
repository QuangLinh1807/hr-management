<template>
  <div class="rounded overflow-hidden shadow-md mt-6 w-full mr-6">
    <div
      class="
        intro-y
        col-span-12
        lg:col-span-6
        p-2
        pl-6
        bg-white
        flex
        justify-between
        border-b border-gray-200
      "
    >
      <h2 class="text-lg mr-auto font-bold">Top trending skill</h2>
      <v-select
        class="border-gray-300 w-1/5"
        :options="optionsSelect"
        v-model="onlanguagechange"
        :clearable="false"
      ></v-select>
    </div>
    <div class="p-2 pt-5 bg-white flex justify-center">
      <div class="w-11/12">
        <ApexCharts
          type="line"
          width="100%"
          :options="chartOptions"
          :series="series"
          :height="500"
        ></ApexCharts>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../api/api";
export default {
  data() {
    return {
      onlanguagechange: null,
      optionsSelect: [],
      series: [],
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: "line",
        },
        stroke: {
          width: [0, 4],
        },
        labels: [],
        colors: [
          "#003993",
          "#007BC3",
          "#22AEE5",
          "#45D1D1",
          "#F8BF2D",
          "#00e396",
        ],
        xaxis: {
          type: "category",
        },
      },
      categoryId: 0,
      trendingSkill: [],
      dataSeries: {
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        total: [],
      },
    };
  },
  watch: {
    onlanguagechange(value) {
      this.getTopTrendingSkill(value.id);
    },
  },
  created() {
    this.listCategories();
  },
  methods: {
    transferListOption(array) {
      const optionsClone = [];
      array.forEach((item) => {
        const newOption = {};
        newOption.id = item.id;
        newOption.label = item.name;
        optionsClone.push(newOption);
      });
      return optionsClone;
    },

    async listCategories() {
      const res = await api("getListCategories");
      const listOptions = this.transferListOption(res.data.data);
      this.optionsSelect = [...listOptions];
      this.onlanguagechange = this.optionsSelect[0];
    },
    setToEmpty(arr) {
      Object.keys(arr).forEach((index) => {
        arr[index] = [];
      });
    },

    async getTopTrendingSkill(categoryId) {
      const res = await api("getTrendingSkill", categoryId);
      this.trendingSkill = [...res.data.data];
      this.setToEmpty(this.dataSeries);
      this.trendingSkill.map((item) => {
        let count = 0;
        item.detailSkill.forEach((people) => {
          count += people.memberQuantity;
        });
        this.dataSeries.total.push(count);
        item.detailSkill.map((detailItem) => {
          if (detailItem.level === "S") {
            this.dataSeries.S.push(detailItem.memberQuantity);
          } else if (detailItem.level === "A") {
            this.dataSeries.A.push(detailItem.memberQuantity);
          } else if (detailItem.level === "B") {
            this.dataSeries.B.push(detailItem.memberQuantity);
          } else if (detailItem.level === "C") {
            this.dataSeries.C.push(detailItem.memberQuantity);
          } else if (detailItem.level === "D") {
            this.dataSeries.D.push(detailItem.memberQuantity);
          }
        });
      });
      this.chartOptions = {
        ...this.chartOptions,
        labels: this.trendingSkill.map((item) => {
          return item.name;
        }),
      };
      this.series = [
        {
          name: "Total",
          type: "column",
          data: this.dataSeries.total,
        },
        {
          name: "Level S",
          type: "scatter",
          data: this.dataSeries.S,
        },
        {
          name: "Level A",
          type: "scatter",
          data: this.dataSeries.A,
        },
        {
          name: "Level B",
          type: "scatter",
          data: this.dataSeries.B,
        },
        {
          name: "Level C",
          type: "scatter",
          data: this.dataSeries.C,
        },
        {
          name: "Level D",
          type: "scatter",
          data: this.dataSeries.D,
        },
      ];
    },
  },
};
</script>
<style scoped></style>
