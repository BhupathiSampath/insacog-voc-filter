<template>
  <div class="box-content">
    <section>
      <div class="container mx-auto">
        <!-- <select class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer" v-on:keyup.enter="fetchSomething()" v-model="year" name="year">
        <option value="202" name="year">Both 2020 && 2021</option>
        <option value="2020">2020</option>
        <option value="2021" >2021</option>
      </select> -->
        <!-- <button  class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded" v-on:click="fetchSomething">Get Graph</button> -->
        <BarChart
          :key="random"
          :data="barChartData"
          :options="barChartOptions"
          :height="400"
          :width="2000"
          style="display: block; width: 1500px; height: 384px;"
        ></BarChart>
      </div>
    </section>
  </div>
</template>

<script>
import BarChart from '~/components/BarChart.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  components: { BarChart },
  // props: ["arrMonthNumber","arrMonthdata"],
  data() {
    return {
      random: 12345678,
      barChartData: {
        labels: [],
        datasets: [
          {
            label: 'count',
            data: [],
            backgroundColor: '#6B5B95',
            borderColor: '#6B5B95',
            borderWidth: 2,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Monthly frequency distribution of Sequences',
          fontSize: 18,
          fontColor: '#6b7280',
        },
        tooltips: {
          backgroundColor: '#6B5B95',
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex]
              var total = dataset.data.reduce(function (
                previousValue,
                currentValue,
                currentIndex,
                array,
              ) {
                // console.log(previousValue)
                return previousValue + currentValue
              })
              var currentValue = dataset.data[tooltipItem.index]
              var percentage = Math.floor((currentValue / total) * 100 + 0.5)
              return currentValue + ',' + 'Percentage :' + percentage + '%'
            },
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      getarrMonthData: 'getarrMonthData',
      getarrMonthNumber: 'getarrMonthNumber',
    }),
  },

  watch: {
    getarrMonthNumber(value) {
      this.barChartData.labels = value
    },
    getarrMonthData(value) {
      this.barChartData.datasets[0].data = value
      this.random = Math.random()
    },
  },
  // mounted() {
  //       this.$store.dispatch("getMonthlyDistribution");
  // }
}
</script>
