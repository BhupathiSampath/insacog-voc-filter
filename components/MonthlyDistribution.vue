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
      <BarChart :key="random" :data="barChartData" :options="barChartOptions" :height="500" :width="2000" style="display: block; width: 1500px; height: 384px;"></BarChart>
    </div>
  </section>
</div>
</template>

<script>
import BarChart from "~/components/BarChart.vue";
import { mapState, mapGetters } from 'vuex'
export default {
  components: { BarChart },
  // props: ["arrMonthNumber","arrMonthdata"],
  data () {
    return {
      random: Math.random(),
      barChartData: {
          labels: [],
        datasets: [
            {
              label: "count",
              data: [],
              backgroundColor: "#1E90FF",
              borderColor: "rgba(blue)",
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
          text: "Monthly frequency distribution of Sequences",
          fontSize: 18,
          fontColor: "#6b7280",
        },
        tooltips: {
            backgroundColor: "blue",
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
                // max: 5000,
                min: 0,
                // stepSize: 50,
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
      getarrMonthNumber: 'getarrMonthNumber'
    })
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
  mounted() {
        this.$store.dispatch("getPosts");
  }
}

</script>