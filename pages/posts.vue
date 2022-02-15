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
import StackedBar from '/home/nsm-07/Desktop/Bhupati/dev/insacog-voc-filter/components/Charts/StackedBar.vue'
import apexBarChart from '/home/nsm-07/Desktop/Bhupati/dev/insacog-voc-filter/components/ThirdpartyGraphs/apexBarChart.vue'
export default {
  components: {
    apexBarChart,StackedBar,
  },

}
</script>

