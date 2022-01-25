<template>
<div class="box-content">
  <section>
  <div>
      <BarChart :key="random" :data="barChartData" :options="barChartOptions" :height="400" :width="2000" style="display: block; width: 1500px; height: 384px;"></BarChart>
    </div>
  </section>
</div>

</template>

<script>
import BarChart from "~/components/BarChart.vue";
import { mapState, mapGetters } from 'vuex'
export default {
  components: { BarChart },
  // props: ["arrWeekNumber","arrweekdata"],
  data () {
    return {
      random: 12345678,
      barChartData: {
          labels: [],
        datasets: [
            {
              label: "count",
              data: [],
              backgroundColor: "#34568B",
              borderColor: "#34568B",
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
          text: "Weekly frequency distribution of Sequences",
          fontSize: 18,
          fontColor: "#6b7280",
        },
        tooltips: {
            backgroundColor: "#34568B",
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
      getarrweekdata: 'getarrweekdata',
      getarrWeekNumber: 'getarrWeekNumber'
    })
  },

  watch: {
    getarrWeekNumber(value) {
      this.barChartData.labels = value
      },
    getarrweekdata(value) {
      this.barChartData.datasets[0].data = value
      this.random = Math.random()
      },
    },
  // mounted() {
  //       this.$store.dispatch("getWeeklyDistribution");
  // },

  // methods: {
  //     openMenu () {
        
  //           this.$store.dispatch('getWeeklyDistribution')
  //       },
  //   }
}
  


</script>