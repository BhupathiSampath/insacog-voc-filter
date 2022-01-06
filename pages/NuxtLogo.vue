<template>
<!-- <div v-if="arrweekdata.length > 0"> -->
  <section>
    <div class="container mx-auto">
      <BarChart :key="random" :data="barChartData" :options="barChartOptions" :height="500" :width="2000" style="display: block; width: 1500px; height: 384px;"></BarChart>
    </div>
  </section>
<!-- </div> -->
</template>

<script>
import axios from 'axios'
import BarChart from "~/components/BarChart.vue";
export default {
  components: { BarChart },
  
  data () {
    return {
      random: 123456,
      arrWeekNumber: [],
      arrweekdata: [],
      barChartData: {
        labels: [],
        datasets: [
          {
            label: "count",
            data: [],
            backgroundColor: "blue",
            borderColor: "blue",
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
    } 
  },
  async created() {
    const { data } = await axios.get(`${process.env.baseUrl}/distribution/`);
    data.forEach(d => {
      // const weeks = (d.Week_Number);
      // const count = (d.week_data)
      // console.log(weeks)
      // console.log(weeks)
      const {
        week_number,
        strain__count
      } = d;
      this.arrweekdata.push(strain__count)
      this.arrWeekNumber.push(week_number)
      // this.arrweekdata.push(week_data)
      // this.arrWeekNumber.push(Week_Number)
    });
    // return arrweekdata
    this.barChartData.labels = this.arrWeekNumber
    this.barChartData.datasets[0].data = this.arrweekdata
    this.random = 456789
    console.log(this.barChartData)
    console.log(this.arrWeekNumber)
    console.log(this.arrweekdata)
      
  }
  
  }

</script>
