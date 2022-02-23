<template>
	<div>
		<insacoggDataHub />
		<insacogQueryHubStats />
		<div
	          class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right"
	        >
			<div class="flex justify-center h-12">
				<select
			      class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer m-1"
			      v-model="year"
			      name="year"
			    >
			      <option value="202" name="year">2020, 2021, 2022</option>
			      <option value="2020">2020</option>
			      <option value="2021">2021</option>
			      <option value="2022">2022</option>
			    </select>
			    <button
			      class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded m-1"
			      v-on:click="openMenu"
			    >
			      Get graphs
			    </button>
			    <button class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded m-1"
			      @click="isShowing ^= true"
			    >
			      Show graphs
			    </button>
			</div>
			<Filters class="grid justify-items-end"/>
	     </div>
		<div v-show="isShowing">
			<BarChart />
			<div class="box-border h-82 w-90 p-4 border-4 mt-2">
		      <div
		          class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right"
		        >
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Lineage classification weekly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <Lineageclassificationweekly />
		            </div>
		          </section>
		        </div>
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Lineage classification monthly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <Lineageclassificationmonthly />
		            </div>
		          </section>
		        </div>
		      </div>
		    </div>
		    <div class="box-border h-82 w-90 p-4 border-4 mt-2">
		      <div
		          class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right"
		        >
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Lineage distribution weekly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <Weekly_lineage />
		            </div>
		          </section>
		        </div>
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Sequence distribution weekly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <Weekly_sequences />
		            </div>
		          </section>
		        </div>
		      </div>
		    </div>
		    <div class="box-border h-82 w-90 p-4 border-4 mt-2">
		      <div
		          class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right"
		        >
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Lineage distribution weekly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <Monthly_lineage />
		            </div>
		          </section>
		        </div>
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Sequence distribution monthly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <Monthly_sequences />
		            </div>
		          </section>
		        </div>
		      </div>
		    </div>
		    <div class="box-border h-82 w-90 p-4 border-4 mt-2">
		      <div
		          class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right"
		        >
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Lineage classifcation state wise</h1>
		          <section>
		            <div class="container mx-auto">
		              <State_lineageclass />
		            </div>
		          </section>
		        </div>
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Sequence distribution state wise</h1>
		          <section>
		            <div class="container mx-auto">
		              <State_distribution />
		            </div>
		          </section>
		        </div>
		      </div>
		    </div>
		</div>

	    
 		<Datatable />
	</div>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
import Weekly_sequences from '@/components/charts/Weekly_sequences.vue'
import insacoggDataHub from '@/components/insacogDataHub.vue'
import insacogQueryHubStats from '@/components/insacogQueryHubStats.vue'
import Datatable from '@/components/Datatable.vue'
import Filters from '@/components/element/Filters.vue'
import BarChart from '@/components/charts/BarChart.vue'
import Lineageclassificationweekly from '@/components/charts/Lineage_classification_weekly.vue'
import Lineageclassificationmonthly from '@/components/charts/Lineage_classification_monthly.vue'
import Monthly_sequences from '@/components/charts/Montly_sequences.vue'
import State_distribution from '@/components/charts/State_distribution.vue'
import State_lineageclass from '@/components/charts/States_lineage_classification.vue'
import Weekly_lineage from '@/components/charts/Weekly_lineages.vue'
import Monthly_lineage from '@/components/charts/Monthly_lineages.vue'
import Dropdown from '../components/element/Dropdown.vue'
export default {
	components: { insacoggDataHub, insacogQueryHubStats, Datatable, Filters, BarChart, Lineageclassificationmonthly, Lineageclassificationweekly, Weekly_sequences, Monthly_sequences, State_distribution, State_lineageclass, Weekly_lineage, Monthly_lineage, Dropdown },
	data: () => ({
		isShowing:true,
    }),
    computed: { ...mapFields('base', ['year']) },
    methods: {
      openMenu () {
          this.$store.dispatch("base/getALLDATA")
      },
    }
}

</script>

<style scoped></style>