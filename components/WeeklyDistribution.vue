<template>
<div class="box-content">
  <section>
    <div class="container mx-auto">
      <select class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer" v-on:keyup.enter="fetchSomething()" v-model="year" name="year">
        <option value="202" name="year">Both 2020 && 2021</option>
        <option value="2020">2020</option>
        <option value="2021" >2021</option>
      </select>
      <button  class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded" v-on:click="fetchSomething">Get Graph</button>
      <BarChart :key="random" :data="barChartData" :options="barChartOptions" :height="500" :width="2000" style="display: block; width: 1500px; height: 384px;"></BarChart>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import BarChart from "~/components/BarChart.vue";
export default {
  components: { BarChart },
  
  data () {
    return {
      strain: "",
      state: "",
      lineage: "",
      mutation_deletion: "",
      date: "",
      gene: "",
      reference_id: "",
      amino_acid_position: "",
      mutation: "",
      year: "202",
      random: 123456,
      arrWeekNumber: [],
      arrweekdata: [],
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
    } 
  },
  async created() {
    const { data } = await axios.get(`${process.env.baseUrl}/distribution/?year=${this.year}`);
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
      
  },
  
  methods: {
    async fetchSomething() {
      this.arrWeekNumber.splice(0,)
      this.arrweekdata.splice(0,)
    const { data } = await axios.get(`${process.env.baseUrl}/distribution/?year=${this.year}&strain=${this.strain}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`);
    data.forEach(d => {
      const {
        week_number,
        strain__count
      } = d;
      this.arrweekdata.push(strain__count)
      this.arrWeekNumber.push(week_number)
    });
    this.barChartData.labels = this.arrWeekNumber
    this.barChartData.datasets[0].data = this.arrweekdata
    this.random = Math.random()
    console.log(this.barChartData)
    console.log(this.arrWeekNumber)
    console.log(this.arrweekdata)
    }
  }
  }

</script>
