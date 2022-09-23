<template>
  <div class="card-general">
    <div class="intro-y">
      <div class="tit-general">
        <h2 class="text-lg mr-auto font-bold">General Skill</h2>
      </div>
      <div class="around-chart" v-if="generalList.length !== 0">
        <div class="general-chart">
          <ApexCharts
            type="donut"
            :options="chartOptions"
            :series="series"
            :width="400"
          ></ApexCharts>
        </div>
      </div>
    </div>
    <div v-if="generalList.length === 0">
      <img class="img-nodata" src="@/assets/images/nodata-chart.png" />
      <div class="chart-nodata">No Data Here! ...</div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api";
export default {
  components: {},
  data() {
    return {
      generalList: [],
      accId: null,
      series: [],
      chartOptions: {
        chart: {
          width: 400,
          type: "donut",
        },
        labels: [],
        // "Javascript", "Java", "Python", "PHP"
        dataLabels: {
          style: {
            fontSize: "14px",
          },
        },
        legend: {
          fontSize: "13px",
          width: 120,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "60%",
            },
          },
        },
        fill: {
          colors: [
            "#003993",
            "#007BC3",
            "#22AEE5",
            "#45D1D1",
            "#F8BF2D",
            "#FC9C95",
            "#ED5D5D",
          ],
        },
        colors: [
          "#003993",
          "#007BC3",
          "#22AEE5",
          "#45D1D1",
          "#F8BF2D",
          "#FC9C95",
          "#ED5D5D",
        ],
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 300,
        //       },
        //       legend: {
        //         position: "bottom",
        //       },
        //     },
        //   },
        // ],
      },
    };
  },
  watch: {
    generalList: {
      handler: function (val) {
        if (val) {
          this.chartOptions = {
            ...this.chartOptions,
            labels: this.generalList.map((item) => {
              return item.name;
            }),
          };
          this.series = this.generalList.map((item) => {
            return item.point;
          });
        }
      },
      immediate: true,
      deep: true,
    },
    $route: {
      handler: async function (to) {
        await this.getGeneralFromApi(to.params.id);
      },
      immediate: true,
    },
  },
  async created() {
    // await this.getGeneralFromApi();
  },
  methods: {
    async getGeneralFromApi(accountId) {
      try {
        const res = await api("getGeneralSkillApi", accountId);
        this.generalList = [...res.data.data];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-nodata,
.img-nodata {
  top: 54%;
  left: 50%;
  width: 280px;
  transform: translate(-50%, -50%);
  @apply absolute font-bold text-lg text-gray-500 text-center;
}
.img-nodata {
  opacity: 0.5;
}
.card-general {
  background-color: #f2f8fc;
  @apply w-2/5 rounded overflow-hidden relative;
}
.general-chart {
  @apply flex flex-col sm:flex-row w-full h-full items-center justify-center mt-6;
}
.tit-general {
  border-bottom: 1px solid #fff;
  @apply flex items-center p-1 pl-3;
}
</style>
