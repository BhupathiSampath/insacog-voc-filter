<template>
<div>
    <li v-for="event in lineages.data" :key="event.id" :event="event">{{ event.lineage }}: {{ event.lineage__count }}</li>
    <!-- <li>{{ lineages.data.count }}</li> -->
</div>
    <!-- <div class="grid grid-cols-12 divide-x-2 divide-slate-400 p-2 mb-2 text-center divide-dashed text-sm">
    <div class="bg-blue-100 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden">
        <span class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1" v-for="event in lineages" :key="event.id" :event="event">{{ event.lineage }}</span>
    </div>
    </div> -->
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
        lineages: {}
    } 
  },
//     async created() {
//         const lineage = await axios.get(`${process.env.baseUrl}/lineagedrop/`);
//         console.log(lineage.data)
//         const lineages = lineage.data
//         return { lineages }
      
//   },
  async asyncData() {

    const lineages = await axios.get(`${process.env.baseUrl}/lineagedrop/`)
      console.log(lineages)
      return { lineages }
  },
  
  methods: {
    async fetchSomething() {
        const lineages = await axios.get(`${process.env.baseUrl}/lineagedrop/`);
        this.lineages = lineages
    }
  }
  }

</script>
