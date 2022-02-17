<template>
  <div class="example">
    <apexcharts
      width="100%"
      height="350"
      type="bar"
      :key="random"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Chart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
      random: Math.random(),
      chartOptions: {
        title: {
            text: "Sequence distribution state wise",
        },
        chart: {
          id: 'basic-bar',
          animations: {
            speed: 200,
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            distributed: false,
          },
        },
        xaxis: {
          name: "Weeks",
          categories: [],
        },
      },
      series: [
        {
          name: 'Value',
          data: [],
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      getarrStrainCount: 'getarrStrainCount',
      getarrState: 'getarrState',
    }),
  },

  watch: {
    getarrState(value) {
      this.chartOptions.xaxis.categories = value
      // console.log(this.chartOptions.xaxis.categories)
    },
    getarrStrainCount(value) {
      this.series[0].data = value
      this.random = Math.random()
      // console.log(this.series[0].data)
    },
  },
}
</script>
