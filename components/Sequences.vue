<template>
  <div>
 <div class="max-w-full mx-2 py-1 sm:mx-auto sm:px-6 lg:px-10">
    <div class="sm:flex sm:space-x-2">
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">Last Updated</h3>
                        <p class="text-1xl font-bold text-black">{{ last_updated }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">Total Records:</h3>
                        <p class="font-bold text-black"  v-for="event in ip" :key="event.id">{{ event.count }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">Genomes Sequenced</h3>
                        <p class="font-bold text-black">{{ unisequences }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">Nextclade Version</h3>
                        <p class="font-bold text-black">{{ nextclade_version }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">PangoDesignation</h3>
                        <p class="font-bold text-black">{{ pango_designation_version }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">Pangolearn Version</h3>
                        <p class="font-bold text-black">{{ pangolearn_version }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">Constellation Version</h3>
                        <p class="font-bold text-black">{{ constellation_version }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">Pangolin Version</h3>
                        <p class="font-bold text-black">{{ pangolin_version }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  <div class="max-w-full px-10 mx-2 sm:mx-auto sm:px-6 lg:px-10">
    <div  class="px-12">
      <input class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="strain" type="text" placeholder="Strain" v-model="strain" v-on:keyup.enter="fetchSomething()"/>
      <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="state" placeholder="State" v-model="state" v-on:keyup.enter="fetchSomething()"/>
      <input v-model="lineage" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lineage" type="text" placeholder="Lineage" v-on:keyup.enter="fetchSomething()">
      <input v-model="mutation_deletion" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="mutation_deletion" type="text" placeholder="mutation_deletion" v-on:keyup.enter="fetchSomething()">
      <input v-model="date" class="shadow appearance-none border w-40 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="date" type="text" placeholder="Date" v-on:keyup.enter="fetchSomething()">
      <select class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer" v-on:keyup.enter="fetchSomething()" v-model="days" name="days">
        <option value="36500" name="days">All data</option>
        <option value="7">Last week</option>
        <option value="14" >Last 2 weeks</option>
        <option value="21">Last 3 weeks</option>
        <option value="30">Last month</option>
        <option value="60">Last 2 months</option>
        <option value="90">Last 3 months</option>
        <option value="120">Last 4 months</option>
        <option value="150">Last 5 months</option>
        <option value="182">Last 6 months</option>
        <option value="365">This year</option>
      </select>
      <button class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded" v-on:click="fetchSomething">Get Data</button>
      <!-- <div class="fixed"> -->
      <!-- <img class="fixed" src="https://img.icons8.com/dotty/80/000000/filter.png"/> -->
      <!-- </div> -->
    </div>
    <div class="md:grid px-12 md:grid-cols-2 md:gap-20 py-1">
      <button class="bg-green-300 hover:bg-green-700 content-left text-white font-bold py-2 px-4 rounded" id="show" v-on:click="handlechange">Advance filter</button>
      <button class="bg-green-300 hover:bg-green-700 content-left text-white font-bold py-2 px-4 rounded" id="show" v-on:click="downloadFile">Download</button>
    
    </div>
    <div id="book" hidden>
      <div  class="px-12">
        <input class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="gene" type="text" placeholder="gene" v-model="gene" v-on:keyup.enter="fetchSomething()"/>
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="reference_id" placeholder="reference id" v-model="reference_id" v-on:keyup.enter="fetchSomething()"/>
        <input v-model="amino_acid_position" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="amino_acid_position" type="text" placeholder="amino_acid_position" v-on:keyup.enter="fetchSomething()">
        <input v-model="mutation" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="mutation" type="text" placeholder="mutation" v-on:keyup.enter="fetchSomething()">
        <input v-model="start_date" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="start_date" type="date" placeholder="start_date" v-on:keyup.enter="fetchSomething()">
        <input v-model="end_date" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="end_date" type="date" placeholder="end_date" v-on:keyup.enter="fetchSomething()">
        <button  class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded" v-on:click="fetchSomething">Get Data</button>
      </div>
    </div>
  </div>
  <section>
    <div class="container mx-auto">
      <WeekDistribution />
    </div>
  </section>
  <section>
    <div class="container mx-auto">
      <MonthDistribution />
    </div>
  </section>
  <div class="box-content">
  <section>
    <div class="container mx-auto">
      <BarChart :key="random" :data="barChartData" :options="barChartOptions" :height="500" :width="2000" style="display: block; width: 1500px; height: 384px;"></BarChart>
    </div>
  </section>
  </div>
  <div class="container mx-auto py-4">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date <a class="cursor-pointer font-bold" v-on:click="fetchSomething(ordering='date')">&#x2193;</a><a class="cursor-pointer font-bold" v-on:click="fetchSomething(ordering='-date')">&#x2191;</a>
                  </th>
                  <th scope="col" class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Strain <a class="cursor-pointer" v-on:click="fetchSomething(ordering='strain')">&#x2193;</a><a class="cursor-pointer" v-on:click="fetchSomething(ordering='-strain')">&#x2191;</a>
                  </th>
                  <th scope="col" class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State <a class="cursor-pointer" v-on:click="fetchSomething(ordering='state')">&#x2193;</a><a class="cursor-pointer" v-on:click="fetchSomething(ordering='-state')">&#x2191;</a>
                  </th>
                  <th scope="col" class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lineage <a class="cursor-pointer" v-on:click="fetchSomething(ordering='lineage')">&#x2193;</a><a class="cursor-pointer" v-on:click="fetchSomething(ordering='-ordering')">&#x2191;</a>
                  </th>
                  <th scope="col" class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gene <a class="cursor-pointer" v-on:click="fetchSomething(ordering='gene')">&#x2193;</a><a class="cursor-pointer" v-on:click="fetchSomething(ordering='-gene')">&#x2191;</a>
                  </th>
                  <th scope="col" class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference <a class="cursor-pointer" v-on:click="fetchSomething(ordering='reference_id')">&#x2193;</a><a class="cursor-pointer" v-on:click="fetchSomething(ordering='-reference_id')">&#x2191;</a>
                  </th>
                  <th scope="col" class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AA Position <a class="cursor-pointer" v-on:click="fetchSomething(ordering='amino_acid_position')">&#x2193;</a><a class="cursor-pointer" v-on:click="fetchSomething(ordering='-amino_acid_position')">&#x2191;</a>
                  </th>
                  <th scope="col" class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mutation <a class="cursor-pointer" v-on:click="fetchSomething(ordering='mutation')">&#x2193;</a><a class="cursor-pointer" v-on:click="fetchSomething(ordering='-mutation')">&#x2191;</a>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y text-middle divide-gray-200">
                <tr v-for="event in ip.data.results" :key="event.id" :event="event">
                  <td class="px-10 text-middle whitespace-nowrap">
                    {{ event.date}}
                  </td>
                  <td class="px-10 whitespace-nowrap text-sm font-medium">
                    {{ event.strain}}
                  </td>
                  <td class="px-10 whitespace-nowrap text-middle text-sm font-medium">
                    {{ event.state}}
                  </td>
                  <td class="px-10 py-4 whitespace-nowrap text-sm font-medium">
                    {{ event.lineage}}
                  </td>
                  <td class="px-10 py-4 whitespace-nowrap text-sm font-medium">
                    {{ event.gene}}
                  </td>
                  <td class="px-10 py-4 whitespace-nowrap">
                    {{ event.reference_id}}
                  </td>
                  <td class="px-10 py-4 whitespace-nowrap text-sm font-medium">
                    {{ event.amino_acid_position}}
                  </td>
                  <td class="px-10  whitespace-nowrap text-middle text-sm font-medium">
                    {{ event.mutation}}
                  </td>
                </tr>
              </tbody>
            </table>
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ this.page }}</span>
                  of
                  <span class="font-medium">{{ip.data.count/25+1 ^ 0}}</span>
                  pages
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer" aria-label="Pagination">
                  <a v-if="page>1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" v-on:click="fetchSomething(page = page-1)">
                    Previous
                  </a>
                  <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                  <a aria-current="page" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium" v-on:click="fetchSomething(page=1)">
                    1
                  </a>
                  <!-- <a class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" v-on:click="fetchSomething(page=page+2)">
                    {{ page+2 }}
                  </a>
                  <a class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" v-on:click="fetchSomething(page=page+3)">
                    {{ page+3 }}
                  </a>
                  <a class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" v-on:click="fetchSomething(page=page+4)">
                    {{ page+4 }}
                  </a> -->
                  <!-- <a v-if="page>1" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" v-on:click="fetchSomething(page=prev+1)">
                    {{ page }}
                  </a> -->
                  <!-- <a v-else class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" v-on:click="fetchSomething(page=page+1)">
                    {{ page+1 }}
                  </a> -->
                  <a v-if="page>=1 && page < ip.data.count/25" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" v-on:click="fetchSomething(page=page+1)">
                    Next
                  </a>
                </nav>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <p v-for="event in statedata.data.data" :key="event.id" :event="event">{{ event.state }}</p> -->
  </div>
</template>

<script>
import WeekDistribution from '/home/nsm-07/Desktop/Bhupati/insacog-voc-filter/components/WeeklyDistribution.vue'
import MonthDistribution from '/home/nsm-07/Desktop/Bhupati/insacog-voc-filter/components/MonthlyDistribution.vue'
import $ from 'jquery'
import axios from 'axios'
import BarChart from "~/components/BarChart.vue";
const page = 1

export default {
  components: { BarChart, WeekDistribution, MonthDistribution },
  
  data () {
    return {
      random: 123456,
      arrStates: [],
      arrMutations: [],
      events: [],
      days: 36500,
      start_date: "",
      end_date: "",
      page: 1,
      ordering: "",
      count: "",
      strain: "",
      state: "",
      lineage: "",
      mutation_deletion: "",
      date: "",
      gene: "",
      reference_id: "",
      amino_acid_position: "",
      mutation: "",
      ip: {},
      mutationdistribution: {},
      prev: '',
      version_data: [],
      last_updated: "",
      nextclade_version: "",
      pango_designation_version: "",
      pangolearn_version: "",
      constellation_version: "",
      pangolin_version: "",
      genomes_sequenced: "",
      barChartData: {
        labels: [],
        datasets: [
          {
            label: "count",
            data: [],
            backgroundColor: "#1E90FF",
            borderColor: "rgba(blue)",
            borderWidth: 2,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "State wise mutation distribution",
          fontSize: 18,
          fontColor: "#6b7280",
        },
        tooltips: {
          backgroundColor: "#1fhF62",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                // max: (this.arrMutations),
                min: 0,
                // stepSize: 50,
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
      },
    } 
  },

 async created() {
    const mutationdistribution = await axios.get(`${process.env.baseUrl}/statesmutationdistribution/`);
    mutationdistribution.data.forEach(d => {
      const {
        state,
        mutation_deletion__count
      } = d;
      
      this.arrMutations.push(mutation_deletion__count)
      this.arrStates.push(state)
    });
    this.random = 456789
    this.barChartData.labels = this.arrStates
    this.barChartData.datasets[0].data = this.arrMutations
      
  },




  async asyncData() {
    

    const ip = await axios.get(`${process.env.baseUrl}/data/?page=${page}`)
    const sequences = await axios.get(`${process.env.baseUrl}/count/`)
    
    const version_data = await axios.post(`https://research.nibmg.ac.in/insacog/api/files/landing-stats/`)
      
      const count = ip.data.count
      const unisequences = sequences.data[0].count
      const last_updated = version_data.data.last_updated.toString().split(':').at(0)
      const nextclade_version = version_data.data.nextclade_version.toString().split(':').at(-1)
      const pango_designation_version = version_data.data.pango_designation_version.toString().split(':').at(-1)
      const pangolearn_version = version_data.data.pangolearn_version.toString().split(':').at(-1)
      const constellation_version = version_data.data.constellation_version.toString().split(':').at(-1)
      const pangolin_version = version_data.data.pangolin_version.toString().split(':').at(-1)
      const genomes_sequenced = version_data.data.genomes_sequenced
      return { ip,unisequences, count, version_data, last_updated, nextclade_version, pango_designation_version, pangolearn_version, constellation_version, pangolin_version, genomes_sequenced }
  },
  methods: {
    
    handlechange()
    {
			$('#book').toggle();
    },
    async fetchSomething() {

      this.arrStates.splice(0,)
      this.arrMutations.splice(0,)

    

    // this.arrStates.splice(0,)
    // this.arrMutations.splice(0,)
      if (page > 1) {
			const prev = page - 1;
		}
      const ip = await axios.get(`${process.env.baseUrl}/data/?page=${this.page}&start_date=${this.start_date}&end_date=${this.end_date}&days=${this.days}&strain=${this.strain}&ordering=${this.ordering}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`)
      
      this.ip = ip

      const mutationdistribution = await axios.get(`${process.env.baseUrl}/statesmutationdistribution/?strain=${this.strain}&ordering=${this.ordering}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`);
  
      mutationdistribution.data.forEach(d => {
        const {
          state,
          mutation_deletion__count
        } = d;
        
        this.arrMutations.push(mutation_deletion__count)
        this.arrStates.push(state)
      });
      this.random = Math.random()
      this.barChartData.labels = this.arrStates
      this.barChartData.datasets[0].data = this.arrMutations
    },
    
    async downloadFile() {
      const csv = await axios.get(`${process.env.baseUrl}/exportcsv/?days=${this.days}&start_date=${this.start_date}&end_date=${this.end_date}&strain=${this.strain}&ordering=${this.ordering}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`)
				const file_name = csv.data.path;
				const download_path = `${process.env.downloadUrl}/${file_name}`;
        axios({
              url: download_path,
              method: 'GET',
              responseType: 'blob',
          }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', file_name);
                document.body.appendChild(fileLink);
                fileLink.click();
          });
        }
      },
  }

</script>
