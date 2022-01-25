<template>
  <div id="app">
    <div class="Chart">
      <DoughnutExample
        :key="random"
        :chartData="chartData"
        :options="options">
      </DoughnutExample>

    </div>
  </div>
</template>

<script>
import DoughnutExample from '/home/nsm-07/Desktop/Bhupati/dev/insacog-voc-filter/components/Charts/PieChart.vue'
import randomColor from 'randomcolor';
import { mapState, mapGetters } from 'vuex'

const options = {
  responsive: true, 
  maintainAspectRatio: false, 
  animation: {
    animateRotate: false
  },
  title: {
        display: true,
        text: "Lineage classification",
        fontSize: 18,
        fontColor: "#6b7280",
      },
   tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
        	var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
          return currentValue + "," + "Percentage :" +percentage + "%";
        }
      }
   }
}

export default {
  name: "App",
  components: { DoughnutExample },
  data() {
    return {
        random: Math.random(),
      options, 
        chartData: {
        // labels: ['Alpha', 'Beta', 'Delta', 'FMV', 'Gamma', 'Lambda', 'None', 'Omicron', 'Other', 'VUM'],
        labels: [],
        datasets: [
          {
            backgroundColor: [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),],
            // data: [4954, 275, 68143, 5874, 8, 15, 9253, 4960, 16729, 18]
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      getarrClass: 'getarrClass',
      getarrClassCount: 'getarrClassCount'
    })
  },

  watch: {
    getarrClass(value) {
      this.chartData.labels = value
      },
    getarrClassCount(value) {
      this.chartData.datasets[0].data = value
      this.random = Math.random()
      },
    },

    mounted() {
        this.$store.dispatch("getLineageClassification");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* .Chart {
  width: 400px;
  height: 300px;
} */
</style>
