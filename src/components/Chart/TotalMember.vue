<template>
  <div class="chart-total-member">
    <div class="tit-chart">
      <h2 class="text-lg mr-auto font-bold">Total Member</h2>
    </div>
    <div class="p-2 pt-5 overflow-y-auto bg-white h-80">
      <div class="flex flex-col sm:flex-row w-full h-full items-center">
        <ApexCharts
          type="donut"
          width="440"
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
  components: {},
  data() {
    return {
      series: [64, 55, 22, 44, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: "donut",
        },
        labels: [
          "Member Back",
          "Member Front",
          "Member Mobile",
          "Member Database",
          "Member SS",
        ],
        dataLabels: {
          style: {
            fontSize: "14px",
          },
        },
        legend: {
          fontSize: "13px",
        },
        fill: {
          colors: ["#003993", "#007BC3", "#22AEE5", "#45D1D1", "#F8BF2D"],
        },
        colors: ["#003993", "#007BC3", "#22AEE5", "#45D1D1", "#F8BF2D"],
        plotOptions: {
          pie: {
            donut: {
              size: "55%",
            },
          },
        },
      },
      totalMemberList: [],
    };
  },
  async created() {
    await this.getTotalMemberFromApi();
    this.bindingTotalMember();
  },
  methods: {
    bindingTotalMember() {
      this.chartOptions = {
        ...this.chartOptions,
        labels: this.totalMemberList.map((item) => {
          return item.departmentName;
        }),
      };
      this.series = this.totalMemberList.map((item) => {
        return item.memberQuantity;
      });
    },
    async getTotalMemberFromApi() {
      try {
        const res = await api("getTotalMemberApi");
        // console.log(res);
        this.totalMemberList = [...res.data.data.teams];
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.chart-total-member {
  @apply max-w-4xl rounded overflow-hidden shadow-md mt-6 w-1/3 mr-6;
}
.tit-chart {
  @apply p-2 pl-6 bg-white flex items-center border-b border-gray-200;
}
</style>
