<template>
  <div class="max-w-4xl rounded overflow-hidden shadow-md mt-6 w-1/3 mr-6">
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
      <h2 class="text-lg mr-auto font-bold">Top member</h2>
      <v-select
        class="border-gray-300 w-2/5"
        :options="optionsSelect"
        v-model="onlanguagechange"
        :clearable="false"
      ></v-select>
    </div>
    <div class="p-2 pt-5 overflow-y-auto bg-white h-80">
      <ApexCharts
        type="bar"
        :options="chartOptions"
        :series="series"
      ></ApexCharts>
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
          name: "",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 270,
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
          zoom: {
            enabled: false,
          },
        },
        colors: ["#003993", "#007BC3", "#22AEE5", "#45D1D1", "#F8BF2D"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
            distributed: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false,
        },
        labels: [],
        xaxis: {
          labels: {
            style: {
              colors: ["#003993", "#007BC3", "#22AEE5", "#45D1D1", "#F8BF2D"],
              fontSize: "10px",
            },
            maxHeight: 50,
          },
          type: "category",
        },
        yaxis: {
          show: false,
        },
      },
      topMemberList: [],
      categoryId: 0,
      optionsSelect: [],
      onlanguagechange: null,
    };
  },
  async created() {
    await this.listCategories();
  },
  watch: {
    onlanguagechange(value) {
      this.getTopMemberFromApi(value.id);
    },
  },
  methods: {
    bindingTopMember() {},
    transferListOption(array) {
      const optionsClone = [];
      array.forEach((item) => {
        const newOption = {};
        newOption.id = item.id;
        newOption.label = item.name;
        optionsClone.push(newOption);
      });
      // console.log(optionsClone);
      return optionsClone;
    },
    async listCategories() {
      const res = await api("getListCategories");
      const listOptions = this.transferListOption(res.data.data);
      this.optionsSelect = [...listOptions];
      this.onlanguagechange = this.optionsSelect[0];
      return res.data.data[0].id;
    },
    async getTopMemberFromApi(categoryId) {
      try {
        const res = await api("getTopMemberApi", categoryId);
        this.topMemberList = [...res.data.data];
        this.chartOptions = {
          ...this.chartOptions,
          labels: this.topMemberList.map((item) => {
            return item.fullName;
          }),
        };
        this.series[0].data = this.topMemberList.map((item) => {
          return item.totalPoint;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
