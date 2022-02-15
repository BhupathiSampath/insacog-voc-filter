<template>
<div>
  <InsacogQueryHub />
      <div class="container mx-auto">
        <apexBarChart />
      </div>
      <div class="container mx-auto">
        <StackedBar />
      </div>
    </div>
</template>
<script>
import StackedBar from '@/components/Charts/StackedBar.vue'
import apexBarChart from '@/components/ThirdpartyGraphs/apexBarChart.vue'
export default {
  components: {
    apexBarChart,StackedBar,
  },

}
</script>

