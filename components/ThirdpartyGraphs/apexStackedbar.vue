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
      isLoading: false,
      delayLoading: 1,
      chart_loader: true,
		  loader_option: {
        lineWidth: 3,
        fontSize: 14,
        text: 'Loading',
        fontWeight: 500,
        color: '#c23531',
        maskColor: '#f6f8f9',
        fontFamily: 'Averta',
		  },
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
  computed: {
    ...mapGetters({
      getweeklineageClassArr: 'getweeklineageClassArr',
      getlineageClassArr: 'getlineageClassArr',
    }),
  },

  watch: {
    getweeklineageClassArr(value) {
      this.isLoading = true;
      this.chartOptions.xaxis.categories = value
    },
    getlineageClassArr(value) {
      this.series = value
      this.random = Math.random()
      this.isLoading = false;
    }
  },
//   async created() {
//     const data = await axios.get(`http://127.0.0.1:8000/api/extrafilter/?days=${this.$store.state.days}&end_date=${this.$store.state.end_date}&strain=${this.$store.state.strain}&ordering=${this.$store.state.ordering}&state=${this.$store.state.state}&lineage=${this.$store.state.lineage}&mutation_deletion=${this.$store.state.mutation_deletion}&date=${this.$store.state.date}&gene=${this.$store.state.gene}&reference_id=${this.$store.state.reference_id}&amino_acid_position=${this.$store.state.amino_acid_position}&mutation=${this.$store.state.mutation}`);
//     // this.weekNumbers.push(data.data.month.week_number)
//     this.chartOptions.xaxis.categories = data.data.month.week_number
//     console.log(this.chartOptions.xaxis.categories)
//       let s = map(data.data.lineage, (d) => ({
//         name: d.Class,
//         data: d.value,
//       }))
//       this.series = s
//       this.random = Math.random()
//     console.log(this.chartOptions)
//     }
}
</script>
