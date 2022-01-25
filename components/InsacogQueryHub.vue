<template>
  <div>
    <h1 class="text-center text-lg">
      ---------------------------------------------------------------------------INSACOG
      QueryHub
      Stats---------------------------------------------------------------------------
    </h1>
    <div
      class="grid grid-cols-3 divide-x-2 divide-slate-400 p-2 mb-2 text-center divide-dashed text-sm"
    >
      <div class="p-4 text-gray-400 bg-white rounded-l-md drop-shadow-md">
        <p class="font-medium">Total records</p>
        <p><animated-number
											:value="
												datatable.count
											"
											:duration="1000"
											:formatValue="formatnumber"
										/></p>
      </div>
      <div class="p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md">
        <p class="font-medium">Unique sequenced</p>
        <p><animated-number
											:value="
												uniquesequences.count
											"
											:duration="1000"
											:formatValue="formatnumber"
										/></p>
      </div>
      <div
        class="relative hover-trigger p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md cursor-pointer"
        v-on:click="handlechange1"
      >
        <div
          class="absolute bg-gray-200 border border-grey-100 px-10 hover-target w-60 rounded-md"
        >
          Click here to see lineage distribution with unique sequences
        </div>
        <p class="font-medium text-blue-400">
          Unique lineages
          <i
            id="lineage-list"
            class="relative hover-trigger fa fa-info-circle"
            v-on:click="handlechange1"
          ></i>
        </p>
        <p><animated-number
											:value="
												uniquelineage.count
											"
											:duration="1000"
											:formatValue="formatnumber"
										/></p>
      </div>
    </div>

    <div class="inset-10 bg-white w-full pl-4 pb-2 hidden" id="lineage-model">
      <div
        class="bg-green-100 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden"
        v-for="event in lineagedistribution.results" :key="event.id" :event="event"
      >
        <span
          class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1 text-gray-500"
        >
          {{ event.lineage }}
          <span
            class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1 text-gray-900"
          >
            {{ event.strain__count }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import AnimatedNumber from 'animated-number-vue'

export default {
  components: { AnimatedNumber },
  computed: {
    datatable() {
    return this.$store.state.DataTable
    },
    uniquelineage() {
    return this.$store.state.UniqueLineages
    },
    lineagedistribution() {
    return this.$store.state.LineageDistribution
    },
    uniquesequences() {
    return this.$store.state.UniqueSequences
    }
  },
  
  // mounted() {
  //   this.$store.dispatch("getPosts");
  // },

  methods: {
    formatnumber(x) {
			return x.toLocaleString('en-IN')
		},
      // openMenu () {
        
      //       this.$store.dispatch('getPosts')
      //   },
      handlechange1() {
        $('#lineage-model').toggle()
        $('#lineage-model1').show()
        },
    }
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
.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: block;
}

input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #07021b;
}
</style>
