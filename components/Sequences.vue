<template>
      <div>
      <input class="shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="strain" type="text" placeholder="Strain" v-model="$store.state.strain" v-on:keyup.enter="openMenu"/>
      <input class="shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="state" placeholder="State" v-model="$store.state.state" v-on:keyup.enter="openMenu"/>
      <input v-model="$store.state.lineage" class="shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lineage" type="text" placeholder="Lineage" v-on:keyup.enter="openMenu">
      <input v-model="$store.state.mutation_deletion" class="shadow appearance-none border w-48 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="mutation_deletion" type="text" placeholder="mutation_deletion" v-on:keyup.enter="openMenu">
      <input v-model="$store.state.date" class="shadow appearance-none border w-48 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="date" type="text" placeholder="Date" v-on:keyup.enter="openMenu">
      <button class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded" @click="openMenu">Get Data</button>
    </div>
</template>

<script>
export default {
  name: 'myStore',
  data () {
    return {
      msg: 'Welcome to my Vuex Store'
    }
  },
  computed: {
    posts() {
        // console.log(this.$store.state.posts)
    return this.$store.state

    }
  },
  
  // mounted() {
  //   // console.log(this.$store.state.arrWeekNumber)
  //   // console.log(this.$store.state.random)
  //   this.$store.dispatch("getPosts");
  // },
  methods: {
        openMenu () {
            // console.log(this.$store.state.random)
            this.$store.dispatch('getPosts')
            // console.log(this.$store.state.arrWeekNumber)
        },
    }
}
</script>
