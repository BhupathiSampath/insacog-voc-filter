<template>
    <div>
    <div class="barChart col-md-6">
      <bar-chart :chart-data="barchartDatacollection" :height="500" :width="2000" style="display: block; width: 1500px; height: 384px;"></bar-chart>
      </div>
  </div>
</template>

<script>
import BarChart from "/home/nsm-07/Desktop/Bhupati/dev/insacog-voc-filter/components/Charts/StackedBarChart.vue";
import axios from "axios"
export default {
  components: {
    BarChart
  },
  data() {
    
    return {
      arrLineage: [],
      arrCount: [],
      arrMonth: [],
      barchartDatacollection: { labels: [], datasets: [], options: {} }, 
     
    };
  },
  async created() {
    const { data } = await axios.get(`${process.env.baseUrl}/stackbar/`);
    console.log(data.slice(0,))
    console.log(Object.values(data))
    // console.log(Object.values(data)[0].slice(0,).lineage)
    // console.log(Object.values(data)[0])
    // const jan = Object.values(data)
    const brands = Object.values(data).map(({ lineage }) => lineage);
    console.log(brands)
    data.forEach(d => {
      const {
        lineage,
        strain__count
      } = d;
      this.arrCount.push(strain__count)
      this.arrLineage.push(lineage)
    });
    console.log(this.arrLineage)
    console.log(this.arrCount)
    this.arrMonth.push(Object.keys(data))
    this.barchartDatacollection.labels = this.arrMonth
    console.log(this.barchartDatacollection.labels)
    
    // this.barChartData.datasets[0].data = this.arrweekdata
    // this.random = 456789
      
  },
  mounted() {
    this.barchartdata();
  },
  methods: {
    barchartdata() {
      this.barchartDatacollection = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],

        datasets: [
          {
            label: "Bad Style",
            data: [40, 47, 44, 38, 27,40, 47, 44, 38, 27,40, 47],
            backgroundColor: "#512DA8",
            hoverBackgroundColor: "#7E57C2",
            hoverBorderWidth: 0
          },
          // {
          //   label: "Warning",
          //   data: [10, 12, 7, 5, 4,12, 7, 5, 4,12, 7, 5],
          //   backgroundColor: "#FFA000",
          //   hoverBackgroundColor: "#FFCA28",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Error",
          //   data: [17, 11, 22, 18, 12,17, 11, 22, 18, 12,17, 11, 22],
          //   backgroundColor: "#D32F2F",
          //   hoverBackgroundColor: "#EF5350",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Bad Style",
          //   data: [40, 47, 44, 38, 27,17, 11, 22, 18, 12,17, 11, 22],
          //   backgroundColor: "#512DA8",
          //   hoverBackgroundColor: "#7E57C2",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Warning",
          //   data: [10, 12, 7, 5, 4],
          //   backgroundColor: "#FFA000",
          //   hoverBackgroundColor: "#FFCA28",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Error",
          //   data: [17, 11, 22, 18, 12],
          //   backgroundColor: "#D32F2F",
          //   hoverBackgroundColor: "#EF5350",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Bad Style",
          //   data: [40, 47, 44, 38, 27],
          //   backgroundColor: "#512DA8",
          //   hoverBackgroundColor: "#7E57C2",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Warning",
          //   data: [10, 12, 7, 5, 4],
          //   backgroundColor: "#FFA000",
          //   hoverBackgroundColor: "#FFCA28",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Error",
          //   data: [17, 11, 22, 18, 12],
          //   backgroundColor: "#D32F2F",
          //   hoverBackgroundColor: "#EF5350",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Bad Style",
          //   data: [40, 47, 44, 38, 27],
          //   backgroundColor: "#512DA8",
          //   hoverBackgroundColor: "#7E57C2",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Warning",
          //   data: [10, 12, 7, 5, 4],
          //   backgroundColor: "#FFA000",
          //   hoverBackgroundColor: "#FFCA28",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Error",
          //   data: [17, 11, 22, 18, 12],
          //   backgroundColor: "#D32F2F",
          //   hoverBackgroundColor: "#EF5350",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Bad Style",
          //   data: [40, 47, 44, 38, 27],
          //   backgroundColor: "#512DA8",
          //   hoverBackgroundColor: "#7E57C2",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Warning",
          //   data: [10, 12, 7, 5, 4],
          //   backgroundColor: "#FFA000",
          //   hoverBackgroundColor: "#FFCA28",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Error",
          //   data: [17, 11, 22, 18, 12],
          //   backgroundColor: "#D32F2F",
          //   hoverBackgroundColor: "#EF5350",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Error",
          //   data: [17, 11, 22, 18, 12],
          //   backgroundColor: "#D32F2F",
          //   hoverBackgroundColor: "#EF5350",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Error",
          //   data: [17, 11, 22, 18, 12],
          //   backgroundColor: "#D32F2F",
          //   hoverBackgroundColor: "#EF5350",
          //   hoverBorderWidth: 0
          // },
          // {
          //   label: "Error",
          //   data: [17, 11, 22, 18, 12],
          //   backgroundColor: "#D32F2F",
          //   hoverBackgroundColor: "#EF5350",
          //   hoverBorderWidth: 0
          // }
        ],
        options: {
          scales: {
            xAxes: [
              {
                stacked: true,
                // gridLines: { display: true }
              }
            ],
            yAxes: [
              {
                stacked: true
              }
            ]
          },
          legend: { display: true }
        }
      };
    }
  },
  
};

  
</script>