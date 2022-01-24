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
import axios from 'axios'
import BarChart from "/home/nsm-07/Desktop/Bhupati/insacog-voc-filter/components/Charts/StackedBarChart.vue";
import moment from 'moment'
export default {
  components: { BarChart },
  
  data () {
    return {
      year: "202",
      random: 123456,
      arrMonthNumber: [],
      arrMonthdata: [],
      barChartData: {
    labels: [
      // moment(new Date(2020, 0, 1)).format('YYYY-MM-DD'),
      // moment(new Date(2020, 0, 2)).format('YYYY-MM-DD'),
      // moment(new Date(2020, 0, 3)).format('YYYY-MM-DD')
    ],
    datasets: [{
        label: '# of Green Votes',
        data: [12, 19, 13],
        borderWidth: 1,
        backgroundColor: ['green', 'green', 'green']
      },
      {
        label: '# of Pink Votes',
        data: [15, 9, 19],
        borderWidth: 1,
        backgroundColor: ['pink', 'pink', 'pink']
      }
    ]
  },
  barChartOptions: {
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
                display: false,
        }
      }],
      yAxes: [{
        stacked: true
      }]
    }
  }
    } 
  },
  async created() {
    const { data } = await axios.get(`${process.env.baseUrl}/stackbar/?year=${this.year}`);
    // Object.entries(data).forEach(([value]) => {
    //   console.log(value);
    //   });
    const values = Object.values(data)
    console.log(values)
    console.log(Object.keys(values))
    console.log(Object.values(data).keys(Object.values(data)))
    // console.log(Object.keys(data).map((key) => [Number(key), data[key]]))
    data.forEach(d => {
      const {
        month_number,
        // ["B.1.1.306"],
        B,
        
      } = d;
      this.arrMonthdata.push(B)
      this.arrMonthNumber.push(month_number)
    });
    console.log(this.arrMonthNumber)
    // console.log(this.arrMonthdata)
    this.barChartData.labels = this.arrMonthNumber
    // this.barChartData.datasets[0].data = this.arrMonthdata
    this.random = 456789
      
  },
  
  // methods: {
  //   async fetchSomething() {
  //   const { data } = await axios.get(`${process.env.baseUrl}/monthlydistribution/?year=${this.year}`);
  //   data.forEach(d => {
  //     const {
  //       month_number,
  //       strain__count
  //     } = d;
  //     this.arrMonthdata.push(strain__count)
  //     this.arrMonthNumber.push(month_number)
  //   });
  //   this.barChartData.labels = this.arrMonthNumber
  //   this.barChartData.datasets[0].data = this.arrMonthdata
  //   this.random = 456789
  //   }
  // }
  }

</script>
