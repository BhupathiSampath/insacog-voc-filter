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
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import { map } from 'lodash'

export default {
  name: 'Chart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
      random: Math.random(),
      series: [
        {
          name: 'Value',
          data: [],
        },
      ],
      chartOptions: {
        legend: {
            show: false
        },
        chart: {
          type: 'bar',
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        title: {
          text: 'Lineage classification distribution month wise',
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      getmonthnamelineageClassArr: 'getmonthnamelineageClassArr',
      getmonthlineageClassArr: 'getmonthlineageClassArr',
    }),
  },

  watch: {
    getmonthnamelineageClassArr(value) {
      this.chartOptions.xaxis.categories = value
      console.log("week",this.chartOptions.xaxis)
    },
    getmonthlineageClassArr(value) {
      this.series = value
      this.random = Math.random()
    },
  },
}
</script>
