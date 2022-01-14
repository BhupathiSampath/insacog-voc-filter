<template>
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
                        <p class="font-bold text-black">{{ count }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div class="bg-gray-200 p-5">
                <div class="sm:flex sm:items-start">
                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 class="text-sm leading-6 font-medium text-gray-400">Genomes Sequenced</h3>
                        <p class="font-bold text-black">{{ genomes_sequenced }}</p>
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
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      count: "",
      events: [],
      ip: {},
      version_data: [],
      last_updated: "",
      nextclade_version: "",
      pango_designation_version: "",
      pangolearn_version: "",
      constellation_version: "",
      pangolin_version: "",
      genomes_sequenced: ""
    } 
  },
  async asyncData() {
    const ip = await axios.post(`https://research.nibmg.ac.in/insacog/api/files/landing-stats/`)
      const count = ip.data.count
      const last_updated = version_data.data.last_updated.toString().split(':').at(0)
      const nextclade_version = version_data.data.nextclade_version.toString().split(':').at(-1)
      const pango_designation_version = version_data.data.pango_designation_version.toString().split(':').at(-1)
      const pangolearn_version = version_data.data.pangolearn_version.toString().split(':').at(-1)
      const constellation_version = version_data.data.constellation_version.toString().split(':').at(-1)
      const pangolin_version = version_data.data.pangolin_version.toString().split(':').at(-1)
      const genomes_sequenced = version_data.data.genomes_sequenced
      return { ip, count, version_data, last_updated, nextclade_version, pango_designation_version, pangolearn_version, constellation_version, pangolin_version, genomes_sequenced }
  }
  }
</script>

