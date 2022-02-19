<template>
<div class="box-content">
  <section>
  <div>
      <BarChart :key="random" :data="barChartData" :options="barChartOptions" :height="100" :width="2000" style="display: block; width: 1500px; height: 200px;"></BarChart>
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
          text: "Weekly frequency distribution of Sequences",
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
    };
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
      // console.log("labels",this.barChartData.labels)
      },
    getarrweekdata(value) {
      this.barChartData.datasets[0].data = value
      // console.log("data", this.barChartData.datasets[0].data)
      this.random = Math.random()
      },
    },
  mounted() {
        this.barChartData.labels.push(this.getarrWeekNumber)
        this.barChartData.datasets[0].data = this.getarrweekdata
        // this.random = Math.random()
        this.$store.dispatch("getPosts");
        // console.log("data2", this.barChartData.datasets[0].data)
  }

  // methods: {
  //     openMenu () {
        
  //           this.$store.dispatch('getPosts')
  //       },
  //   }
}
  


</script>
