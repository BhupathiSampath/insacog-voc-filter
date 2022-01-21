<script>

import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  },
};

// import { Bar } from "vue-chartjs";

// export default {
//   extends: Bar,
//   props: {
//     label: {
//       type: String
//     },
//     ChartData: {
//       type: Array
//     },
//     options: {
//       type: Object
//     }
//   },
//   mounted() {
//     // this.renderChart(this.data, this.options);
//     const week = this.ChartData.map(d => d.weeks).reverse()
//     const total = this.ChartData.map(d => d.total).reverse();
//     console.log(week)
//     console.log(total)
//     this.renderChart(
//     {
//       lables: week,
//       datasets: [
//         {
//         label: "Visualizaciones",
//         data: total,
//         backgroundColor: "rgba(20, 255, 0, 0.3)",
//         borderColor: "rgba(100, 255, 0, 1)",
//         borderWidth: 2,
//       }
//       ],
//     },
//     this.options
//     );
//   }
// };
</script>
