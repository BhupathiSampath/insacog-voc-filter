<template>
    <div>
        <h1 class="text-center">---------------------------------------------------------------------------Insacog DataHub Stats---------------------------------------------------------------------------</h1>

    <!-- <div class="grid grid-cols-7 divide-x-2 divide-slate-400 p-4 mb-28 text-center divide-dashed text-sm">
      <div 
        :key="index"
        :class="get_class(index)"
        v-for="(stats, index) in insacog_datahub_stats"
      >
        <p class="font-medium">{{ stats.name }}</p>
        <p>{{ stats.version }}</p>
      </div>        
    </div> -->


    <div class="grid grid-cols-7 divide-x-2 divide-slate-400 p-2 mb-2 text-center divide-dashed text-sm">
      <div class="p-4 text-gray-400 bg-white rounded-l-md drop-shadow-md">
        <p class="font-medium">Last updated</p>
        <p>{{ last_updated }}</p>
      </div>
      <div class="p-4 text-gray-400 bg-white drop-shadow-lg">
        <p class="font-medium">Nextclade version</p>
        <p>{{ nextclade_version }}</p>
      </div>
      <div class="p-4 text-gray-400 bg-white drop-shadow-lg">
        <p class="font-medium">PangoDesignation version</p>
        <p>{{ pango_designation_version }}</p>
      </div>
      <div class="p-4 text-gray-400 bg-white drop-shadow-lg">
        <p class="font-medium">PangoLearn version</p>
        <p>{{ pangolearn_version }}</p>
      </div>
      <div class="p-4 text-gray-400 bg-white drop-shadow-lg">
        <p class="font-medium">Constellation version</p>
        <p>{{ constellation_version }}</p>
      </div>
      <div class="p-4 text-gray-400 bg-white drop-shadow-lg">
        <p class="font-medium">Pangolin version</p>
        <p>{{ pangolin_version }}</p>
      </div>
      <div class="p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md">
        <p class="font-medium">Genomes sequenced</p>
        <p>{{ unisequences }}</p>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
    //   insacog_datahub_stats:[
    //     {name: 'Pangolin Version 1', version: []},
    //     {name: 'Pangolin Version 2', version: '1.2.3'},
    //     {name: 'Pangolin Version 3', version: '1.2.3'},
    //     {name: 'Pangolin Version 4', version: '1.2.3'},
    //     {name: 'Pangolin Version 5', version: '1.2.3'},
    //     {name: 'Pangolin Version 6', version: '1.2.3'},
    //     {name: 'Pangolin Version 7', version: '1.2.3'},
    //   ],

      version_data: [],
      sequences: [],
      last_updated: "",
      nextclade_version: "",
      pango_designation_version: "",
      pangolearn_version: "",
      constellation_version: "",
      pangolin_version: "",
      genomes_sequenced: "",
      unisequences: ""
    } 
  },


  async created() {
    
    const sequences = await axios.get(`${process.env.baseUrl}/count/`)
    console.log("seq",sequences)
    
    const version_data = await axios.post(`https://research.nibmg.ac.in/insacog/api/files/landing-stats/`)
      const unisequences = sequences.data[0].count
      const last_updated = version_data.data.last_updated
      console.log(last_updated)
      const nextclade_version = version_data.data.nextclade_version.toString().split(':').at(-1)
      const pango_designation_version = version_data.data.pango_designation_version.toString().split(':').at(-1)
      const pangolearn_version = version_data.data.pangolearn_version.toString().split(':').at(-1)
      const constellation_version = version_data.data.constellation_version.toString().split(':').at(-1)
      const pangolin_version = version_data.data.pangolin_version.toString().split(':').at(-1)
      const genomes_sequenced = version_data.data.genomes_sequenced
      return { unisequences, sequences, version_data, last_updated, nextclade_version, pango_designation_version, pangolearn_version, constellation_version, pangolin_version, genomes_sequenced }
  },
mounted() {
  this.asyncData
},
}

</script>