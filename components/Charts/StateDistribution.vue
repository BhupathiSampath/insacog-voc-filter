<template>
<div class="box-content">
  <section>
  <div>
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
  // props: ["arrStates","arrStrainCount"],
  data () {
    return {
      random: 12345678,
      barChartData: {
          labels: [],
        datasets: [
            {
              label: "count",
              data: [],
              backgroundColor: "#009B77",
              borderColor: "#009B77",
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
          text: "Strain frequency distribution states wise",
          fontSize: 18,
          fontColor: "#6b7280",
        },
        tooltips: {
            backgroundColor: "#009B77",
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
      getarrStrainCount: 'getarrStrainCount',
      getarrState: 'getarrState'
    })
  },

  watch: {
    getarrState(value) {
      this.barChartData.labels = value
      },
    getarrStrainCount(value) {
      this.barChartData.datasets[0].data = value
      this.random = Math.random()
      },
    },
  mounted() {
        this.$store.dispatch("getPosts");
  }
}
  


</script>