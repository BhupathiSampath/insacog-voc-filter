<template>
<div>
    <div class="container mx-auto">
      <weekly-lineages />
    </div>
    <!-- <div class="container mx-auto">
      <apexStacedBar />
    </div>
    <div class="container mx-auto">
      <apexBarChart />
    </div>
    <div class="container mx-auto">
      <StackedBar />
    </div> -->
    </div>
</template>
<script>
// import StackedBar from '@/components/Charts/StackedBar.vue'
// import apexBarChart from '@/components/ThirdpartyGraphs/apexBarChart.vue'
// import apexStacedBar from '@/components/ThirdpartyGraphs/apexStackedbar.vue'
import WeeklyLineages from '../components/ThirdpartyGraphs/weeklyLineages.vue'
export default {
  components: {
    // apexBarChart,StackedBar,apexStacedBar,
    WeeklyLineages,
  },

}
</script>

