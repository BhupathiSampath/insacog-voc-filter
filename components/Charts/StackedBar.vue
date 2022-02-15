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
import { map } from 'lodash'
import axios from 'axios'
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
        datasets: [],
      },
      barChartOptions: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              stacked: true
            },
          ],
          yAxes: [
            {
              stacked: true
            },
          ],
        }
      }
    } 
  },
  async created() {
    const data = await axios.get(`http://127.0.0.1:8000/api/monthlylinclassification/`);
      
      let s = map(data.data.lineage, (d) => ({
        label: d.Class,
        data: d.value,
        backgroundColor: this.barChartData.labels.map(d =>
          "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", 0.5)"),
        categoryPercentage: 1,
        barPercentage: 1
      }))
      
      this.barChartData.datasets = s
      this.barChartData.labels = data.data.month.month_number
      this.random = Math.random()
    console.log(this.barChartData.datasets)
    }
}
</script>