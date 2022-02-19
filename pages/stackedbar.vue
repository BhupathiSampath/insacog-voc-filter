<template>
  <div class="example">
    <apexcharts
      width="100%"
      height="350"
      type="bar"
      :key="random"
      :options="chartOptions"
      :series="chartOptions.series"
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
      dataLabels: {
        enabled: true,
      },
      random: Math.random(),
      chartOptions: {
        legend: {
          show: false,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: 'bottom',
          horizontalAlign: 'center',
          floating: false,
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial',
          fontWeight: 400,
          formatter: undefined,
          inverseOrder: false,
          width: undefined,
          height: undefined,
          tooltipHoverFormatter: undefined,
          customLegendItems: [],
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: undefined,
            useSeriesColors: false,
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
          itemMargin: {
            horizontal: 5,
            vertical: 0,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
        series: [
          {
            name: 'Value',
            data: [],
          },
        ],
        grid: {
          show: false,
        },
        legend: {
          show: false,
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
          text: 'Lineage classification distribution week wise',
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
  // computed: {
  //   ...mapGetters({
  //     getweeklineageClassArr: 'getweeklineageClassArr',
  //     getlineageClassArr: 'getlineageClassArr',
  //   }),
  // },

  // watch: {
  //   getweeklineageClassArr(value) {
  //     this.isLoading = true;
  //     this.chartOptions.xaxis.categories = value
  //   },
  //   getlineageClassArr(value) {
  //     this.series = value
  //     this.random = Math.random()
  //     this.isLoading = false;
  //   }
  // },
  async created() {
    const data = await axios.get(
      `http://127.0.0.1:8000/api/lineageclassificationmonth/?days=${this.$store.state.days}&end_date=${this.$store.state.end_date}&strain=${this.$store.state.strain}&ordering=${this.$store.state.ordering}&state=${this.$store.state.state}&lineage=${this.$store.state.lineage}&mutation_deletion=${this.$store.state.mutation_deletion}&date=${this.$store.state.date}&gene=${this.$store.state.gene}&reference_id=${this.$store.state.reference_id}&amino_acid_position=${this.$store.state.amino_acid_position}&mutation=${this.$store.state.mutation}`,
    )
    // this.weekNumbers.push(data.data.month.week_number)
    this.chartOptions.xaxis.categories = data.data.month.month.month_number
    console.log(this.chartOptions.xaxis.categories)
    let s = map(data.data.month.lineage, (d) => ({
      name: d.Class,
      data: d.value,
    }))
    this.chartOptions.series = s
    this.random = Math.random()
    console.log(this.chartOptions)
  },
}
</script>
