<template>
  <div>
    <h1 class="text-center">
      ---------------------------------------------------------------------------Insacog
      DataHub
      Stats---------------------------------------------------------------------------
    </h1>

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

    <div
      class="grid grid-cols-7 divide-x-2 divide-slate-400 p-2 mb-2 text-center divide-dashed text-sm"
    >
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
        <p :duration="1000" :formatValue="formatnumber">
          <animated-number
											:value="
												unisequences
											"
											:duration="1000"
											:formatValue="formatnumber"
										/>
        </p>
      </div>
    </div>
    <InsacogQueryHub />
    <div class="max-w-full mx-2 px-8 sm:mx-auto sm:px-6 lg:px-10">
      <Filtering />
    </div>
    <select
      class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
      v-model="$store.state.year"
      name="year"
    >
      <option value="202" name="year">2020, 2021, 2022</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
    </select>
    <button
      class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded"
      v-on:click="openMenu"
    >
      Get graphs
    </button>
    <button
      id="show1"
      class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded"
      v-on:click="handlechange"
    >
      Show graphs
    </button>
    <div id="graphs" hidden>
    <div class="box-border">
      <section>
        <div class="content-start">
              <LineageClassification />
        </div>
      </section>
    </div>

    <div>
      <section>
        <div class="container mx-auto">
          <apexBarChart />
        </div>
      </section>
    </div>

    <div class="box-border h-80 w-90 p-4 border-4 mt-2">
      <section>
        <div class="container mx-auto">
          <MonthDistribution />
        </div>
      </section>
    </div>

    <div class="box-border h-100 w-90 p-4 border-4 mt-2">
      <section>
        <div class="container mx-auto">
          <StatesDistribution />
        </div>
      </section>
    </div>
    </div>
    <DataTable />
  </div>
</template>

<script>
import apexBarChart from '@/components/ThirdpartyGraphs/apexBarChart.vue'
import WeekDistribution from '@/components/Charts/WeeklyDistribution.vue'
import MonthDistribution from '@/components/Charts/MonthlyDistribution.vue'
import StatesDistribution from '@/components/Charts/StateDistribution.vue'
import InsacogQueryHub from '@/components/InsacogQueryHub.vue'
import LineageClassification from '@/components/Charts/LineageClassification.vue'
import DataTable from '@/components/DataTable.vue'
import $ from 'jquery'
import axios from 'axios'
import BarChart from '~/components/Charts/BarChart.vue'
import Filtering from '@/components/Filters.vue'
import AnimatedNumber from 'animated-number-vue'
import moment from 'moment'
const page = 1
const year = '202'
export default {
  components: {
    BarChart,
    WeekDistribution,
    MonthDistribution,
    Filtering,
    StatesDistribution,
    InsacogQueryHub,
    DataTable,
    AnimatedNumber,
    LineageClassification,
    apexBarChart
  },

 
  computed: {
    getters() {
      return this.$store.state.titles
    },
    //   doneTodosCount () {
    //   return this.$store.getters.doneTodosCount
    // }
    // ...mapGetters([
    // "titles"]),

    // ...mapState([
    // "titles"])
  },
  data() {
    return {
      insacog_datahub_stats: [
        { name: 'Pangolin Version 1', version: [] },
        { name: 'Pangolin Version 2', version: '1.2.3' },
        { name: 'Pangolin Version 3', version: '1.2.3' },
        { name: 'Pangolin Version 4', version: '1.2.3' },
        { name: 'Pangolin Version 5', version: '1.2.3' },
        { name: 'Pangolin Version 6', version: '1.2.3' },
        { name: 'Pangolin Version 7', version: '1.2.3' },
      ],

      ip: {},
      lineagescount: '',
      lineagestraindistribution: {},
      Genome_sequenced: {},
      mutationdistribution: {},
      version_data: [],
      last_updated: '',
      nextclade_version: '',
      pango_designation_version: '',
      pangolearn_version: '',
      constellation_version: '',
      pangolin_version: '',
      genomes_sequenced: '',
    }
  },

  async asyncData() {
    const ip = await axios.get(`${process.env.baseUrl}/data/?page=${page}`)
    const sequences = await axios.get(`${process.env.baseUrl}/count/`)

    const version_data = await axios.post(
      `https://research.nibmg.ac.in/insacog/api/files/landing-stats/`,)
    console.log(version_data)
    const count = ip.data.count
    const unisequences = sequences.data[0].count
    const last_updated = moment(
      version_data.data.last_updated,
      'YYYY-MM-DD hh:mm',
    ).format('YYYY-MM-DD hh:mm A')
    const nextclade_version = version_data.data.nextclade_version
      .toString()
      .split(':')
      .at(-1)
    const pango_designation_version = version_data.data.pango_designation_version
      .toString()
      .split(':')
      .at(-1)
    const pangolearn_version = version_data.data.pangolearn_version
      .toString()
      .split(':')
      .at(-1)
    const constellation_version = version_data.data.constellation_version
      .toString()
      .split(':')
      .at(-1)
    const pangolin_version = version_data.data.pangolin_version
      .toString()
      .split(':')
      .at(-1)
    const genomes_sequenced = version_data.data.genomes_sequenced
    return {
      ip,
      unisequences,
      count,
      version_data,
      last_updated,
      nextclade_version,
      pango_designation_version,
      pangolearn_version,
      constellation_version,
      pangolin_version,
      genomes_sequenced,
    }
  },

  
  methods: {
    formatnumber(x) {
			return x.toLocaleString('en-IN')
		},
    // get_class(index) {
    //   if(index == 0) {
    //     return 'p-4 text-gray-400 bg-white rounded-l-md drop-shadow-md'
    //   } else if((index+1) == this.insacog_datahub_stats.length) {
    //     return 'p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md'
    //   }
    //   return 'p-4 text-gray-400 bg-white drop-shadow-lg'
    // },
    openMenu () {
            this.$store.dispatch('getPosts')
        },

    handlechange() {
      $('#graphs').toggle()
    },
    async fetchSomething() {
      this.arrStates.splice(0)
      this.arrMutations.splice(0)

      // this.arrStates.splice(0,)
      // this.arrMutations.splice(0,)
      if (page > 1) {
        const prev = page - 1
      }
      const ip = await axios.get(
        `${process.env.baseUrl}/data/?page=${this.page}&start_date=${this.start_date}&end_date=${this.end_date}&days=${this.days}&strain=${this.strain}&ordering=${this.ordering}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`,
      )
      // const count = ip.data.count
      // console.log(ip.data)
      this.ip = ip

      const mutationdistribution = await axios.get(
        `${process.env.baseUrl}/statesmutationdistribution/?strain=${this.strain}&ordering=${this.ordering}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`,
      )
      // console.log(mutationdistribution.data)
      mutationdistribution.data.forEach((d) => {
        const { state, mutation_deletion__count } = d

        this.arrMutations.push(mutation_deletion__count)
        this.arrStates.push(state)
      })
      this.random = Math.random()
      this.barChartData.labels = this.arrStates
      this.barChartData.datasets[0].data = this.arrMutations
      // console.log(this.arrStates)
      // console.log(this.arrMutations)
    },

    // async downloadFile() {
    //   const csv = await axios.get(
    //     `${process.env.baseUrl}/exportcsv/?days=${this.days}&start_date=${this.start_date}&end_date=${this.end_date}&strain=${this.strain}&ordering=${this.ordering}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`,
    //   )
    //   const file_name = csv.data.path
    //   console.log(file_name)
    //   const download_path = `${process.env.downloadUrl}/${file_name}`
    //   axios({
    //     url: download_path,
    //     method: 'GET',
    //     responseType: 'blob',
    //   }).then((response) => {
    //     var fileURL = window.URL.createObjectURL(new Blob([response.data]))
    //     var fileLink = document.createElement('a')

    //     fileLink.href = fileURL
    //     fileLink.setAttribute('download', file_name)
    //     document.body.appendChild(fileLink)
    //     fileLink.click()
    //   })
    // },
  },
}
</script>

<style scoped>
#button {
  border: 1px solid;
  border-radius: 50px 20px;
  width: 200px;
  /* background-color: silver; */
  margin: 1px;
  font-size: 13px;
  height: 37px;
  font-family: 'Times New Roman', Times, serif;
}
h1 {
  font-size: 25px;
  /* font-family: 'Times New Roman', Times, serif; */
  font-family: sans-serif;
}
</style>
