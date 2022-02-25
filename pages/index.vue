<template>
	<div>
		<InsacogDataHub />
		<InsacogQueryHubStats />
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
			      @click="isShowing = !isShowing"
			    >
			      Show graphs
			    </button>
			</div>
			<Filters class="grid justify-items-end"/>
	     </div>
		<div v-if="isShowing">
			<ChartsLineageClassification />
			<div class="box-border h-82 w-90 p-4 border-4 mt-2">
		      <div
		          class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right"
		        >
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Lineage classification weekly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <ChartsLineageClassificationWeekly />
		            </div>
		          </section>
		        </div>
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Lineage classification monthly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <ChartsLineageClassificationMonthly />
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
		              <ChartsWeeklyLineages />
		            </div>
		          </section>
		        </div>
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Sequence distribution weekly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <ChartsWeeklySequences />
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
		              <ChartsMonthlyLineages />
		            </div>
		          </section>
		        </div>
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Sequence distribution monthly basis</h1>
		          <section>
		            <div class="container mx-auto">
		              <ChartsMontlySequences />
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
		              <ChartsStatesLineageClassification />
		            </div>
		          </section>
		        </div>
		        <div>
		        	<h1 class="flex justify-center text-md font-medium font-serif">Sequence distribution state wise</h1>
		          <section>
		            <div class="container mx-auto">
		              <ChartsStateDistribution />
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
export default {
	components: {},
	data: () => ({
		isShowing:false,
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