<template>
  <div class="box-border p-4 border-4">
  <div class="container mx-auto">
  <input class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="strain" type="text" placeholder="Strain" v-model="strain" />
  <input v-model="state" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="State">
  <input v-model="lineage" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Lineage">
  <input v-model="mutation_deletion" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Mutaion and deletion">
  <input v-model="date" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Date">
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-on:click="fetchSomething">Button</button>
  <table class="table-auto border-separate border border-gray-400">
    <thead>
      <tr class="odd:bg-white even:bg-gray-100">
        <th class="border border-gray-300">Date</th>
        <th class="border border-gray-300">Strain</th>
        <th class="border border-gray-300">State</th>
        <th class="border border-gray-300">Lineage</th>
        <th class="border border-gray-300">Gene</th>
        <th class="border border-gray-300">Reference</th>
        <th class="border border-gray-300">AA Position</th>
        <th class="border border-gray-300">Mutation</th>
      </tr>
    </thead>
    <tbody>
      <tr class="odd:bg-white even:bg-gray-100" v-for="event in ip.data.results" :key="event.id" :event="event">
        <td class="border border-gray-300">{{ event.date}}</td>
        <td class="border border-gray-300">{{ event.strain}}</td>
        <td class="border border-gray-300">{{ event.state }}</td>
        <td class="border border-gray-300">{{ event.lineage}}</td>
        <td class="border border-gray-300">{{ event.gene}}</td>
        <td class="border border-gray-300">{{ event.reference_id }}</td>
        <td class="border border-gray-300">{{ event.amino_acid_position}}</td>
        <td class="border border-gray-300">{{ event.mutation}}</td>
      </tr>
    </tbody>
  </table>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
let page = 1
export default {
  data () {
    return {
      // events: [],
      strain: "",
      state: "",
      lineage: "",
      mutation_deletion: "",
      date: "",
      ip: {},  
    }
  },
  async asyncData({ $axios }) {
    const ip = await axios.get(`http://10.10.6.87/api/data/?page=${page}`)
      console.log(ip.data)
      return { ip }
  },
  methods: {
    async fetchSomething() {
      const ip = await axios.get(`http://10.10.6.87/api/data/?starin=${this.strain}&state=${this.state}&lineage=${this.lineage}&mutaion_deletion=${this.mutaion_deletion}&date=${this.data}`)
      console.log(ip.data)
      this.ip = ip
    }
  },
  }
  // created () {
  // axios
  //   .get(`http://10.10.6.87/api/data/?page=${page}`)
  //   .then(response => {
  //     console.log(response.data)
  //     this.events = response.data.results
  //   })
  //   .catch(error => {
  //     console.log("error" + error.response)
  //   })
  // }
// }
</script>
