<template>
  <div>
    <h1 class="text-center text-lg">---------------------------------------------------------------------------INSACOG DataHub Stats---------------------------------------------------------------------------</h1>

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


  


  <h1 class="text-center text-lg">---------------------------------------------------------------------------INSACOG QueryHub Stats---------------------------------------------------------------------------</h1>
  <div class="grid grid-cols-3 divide-x-2 divide-slate-400 p-2 mb-2 text-center divide-dashed text-sm">
    <div class="p-4 text-gray-400 bg-white rounded-l-md drop-shadow-md">
        <p class="font-medium">Total records </p>
        <p>{{ ip.data.count }}</p>
    </div>
    <div class="p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md">
        <p class="font-medium">Unique sequenced </p>
        <p>{{ Genome_sequenced.data.count }}</p>
    </div>
    <div class="relative hover-trigger p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md cursor-pointer" v-on:click="handlechange1">
      <div class="absolute bg-gray-200 border border-grey-100 px-10 hover-target w-60 rounded-md">
          Click here to see lineage distribution with unique sequences
        </div>
        <p class="font-medium text-blue-400">Unique lineages <i id="lineage-list" class="relative hover-trigger fa fa-info-circle" v-on:click="handlechange1"></i></p>
        <p>{{ lineagescount.data.count }}</p>
    </div>
  </div>
  
  <div class="inset-10 bg-white w-full pl-4 pb-2 hidden" id="lineage-model">
    <div class="bg-green-100 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden" v-for="event in lineagestraindistribution.data.results" :key="event.id" :event="event">
        <span class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1 text-gray-500">{{ event.lineage }}<span class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1 text-gray-900">{{ event.strain__count }}</span></span>
    </div>
  </div>


  <div>

    <div class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right">
      <div class="grid justify-items-start">
        <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-30 text-sm" v-on:click="downloadFile">
        <svg class="fill-current w-2 h-2 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Download</span>
      </button>
      </div>
      <div class="grid justify-items-end">
        <button class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold w-30 h-10 py-2 px-4 rounded text-sm fixed" id="show" v-on:click="handlechange"><i class="fa fa-filter" style="font-size:24px"></i>Filter</button>
      </div>
    </div>
  </div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div class="fixed hidden inset-10 mt-16 w-2/3 py-16 mx-auto pt-48 pl-40 grid justify-end" id="my-modal">
  <div class="w-full shadow p-5 rounded-lg bg-white">
  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4 pb-4">
    <div class="grid justify-items-start">
      <p class="font-medium font-sans">Search based on: </p>
    </div>
    <div class="grid justify-items-end">
      <i class="fa fa-remove cursor-pointer" id="ok-btn" style="font-size:20px;color:red"></i>
    </div>
  </div>
  <div class="relative">
	<div class="absolute flex items-center ml-2 h-full">
	  <svg class="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
	  </svg>
	</div>
	<input v-model="search" v-on:keyup.enter="fetchSomething()" name="search" type="text" placeholder="Search by date, strain, state, lineage..." class="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
	  </div>

	<div class="flex items-center justify-between mt-4">
	  <p class="font-medium">
		Filters
	  </p>
    <!-- <button class="bg-gray-400 hover:bg-gray-700 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-30 text-sm" v-on:click="downloadFile">
        <svg class="fill-current w-2 h-2 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Download</span>
      </button> -->
	  <!-- <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" v-on:click="fetchSomething" id="ok-btn">
		Get filtered data
	  </button> -->
	</div>

	<div>
	  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      <div class="text-gray-400 bg-white">
      <p class="text-sm">Strain <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40">
          Partial match possible
        </div>
      </i>
      
      </p>
		  <input class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" name="strain" type="text" placeholder="ex. hCoV-19/India/Karnataka/CRL/KIMS-1/2021" v-model="strain" v-on:keyup.enter="fetchSomething()"/>
      </div>
      <div class="text-gray-400 bg-white">
        <p class="text-sm">State <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40">
          Partial match possible
        </div>
      </i></p>
      <input class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" type="text" name="state" placeholder="ex. West bengal" v-model="state" v-on:keyup.enter="fetchSomething()"/>
      </div>
      <div class="text-gray-400 bg-white">
        <p class="text-sm">Lineage <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40">
          Multiple lineages can be filtered with seperation of comma(',')
        </div>
      </i></p>
      <input v-model="lineage" class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" name="lineage" type="text" placeholder="ex. B.1.617.2, BA.1" v-on:keyup.enter="fetchSomething()">
      </div>
      <div class="text-gray-400 bg-white">
        <p class="text-sm">Mutaion deletion <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40">
          Partial match possible
        </div>
      </i></p>
      <input v-model="mutation_deletion" class="shadow appearance-none border w-48 rounded py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" name="mutation_deletion" type="text" placeholder="ex. m:i82t" v-on:keyup.enter="fetchSomething()">
      </div>
      <div class="text-gray-400 bg-white">
        <p class="text-sm">Gene <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40">
          Partial match possible
        </div>
      </i></p>
      <input v-model="gene" class="shadow appearance-none border w-48 rounded py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" name="gene" type="text" placeholder="ex. orf3a" v-on:keyup.enter="fetchSomething()">
      </div>
      <div class="text-gray-400 bg-white">
      <p class="text-sm">Amino acid change <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40">
          Partial match possible
        </div>
      </i></p>
		  <input class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" name="reference_id" type="text" placeholder="ex. a or b..." v-model="reference_id" v-on:keyup.enter="fetchSomething()"/>
      </div>
      <div class="text-gray-400 bg-white">
        <p class="text-sm">Amino acid position <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40">
          Partial match possible
        </div>
      </i></p>
      <input class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" type="text" name="amino_acid_position" placeholder="ex. 314 or 25..." v-model="amino_acid_position" v-on:keyup.enter="fetchSomething()"/>
      </div>
      <div class="text-gray-400 bg-white">
        <p class="text-sm">Mutation <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40">
          Partial match possible
        </div>
      </i></p>
      <input v-model="mutation" class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" name="mutation" type="text" placeholder="ex. a or b..." v-on:keyup.enter="fetchSomething()">
      </div>
      <div class="text-gray-400 bg-white">
        <div class="grid grid-cols-2">

        <p class="text-sm">Date <i class="relative hover-trigger fa fa-info-circle">
        <div class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40 rounded-md">
          Switch the button to date range filter
        </div>
      </i>
        </p>
        <label 
          for="toogleA"
          class="flex items-center cursor-pointer grid justify-end pr-16"
        >
          <!-- toggle -->
          <div class="relative">
            <!-- input -->
            <input id="toogleA" type="checkbox" class="sr-only" />
            <!-- line -->
            <div class="w-6 h-2 bg-gray-400 rounded-full shadow-inner"></div>
            <!-- dot -->
            <div class="dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
          </div>
        </label>
        </div>
      <input v-model="date" class="shadow appearance-none border w-48 rounded text-gray-700 py-2 px-3 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline text-sm" name="date" type="text" placeholder="ex. 2021-01-02" v-on:keyup.enter="fetchSomething()">
      </div>
      <div class="text-gray-400 bg-white">
        <p class="text-sm">From  <i class="fa fa-info-circle"></i></p>
      <input v-model="start_date" class="shadow appearance-none border w-48 rounded py-2 px-3 bg-gray-100 text-gray-500 leading-tight focus:outline-none focus:shadow-outline text-sm" name="start_date" type="date" placeholder="start_date" v-on:keyup.enter="fetchSomething()">
      </div>
      <div class="text-gray-400 bg-white">
        <p class="text-sm">To  <i class="fa fa-info-circle"></i></p>
      <input v-model="end_date" class="shadow appearance-none border w-48 rounded py-2 px-3 bg-gray-100 text-gray-500 leading-tight focus:outline-none focus:shadow-outline text-sm" name="end_date" type="date" placeholder="end_date" v-on:keyup.enter="fetchSomething()">
      </div>


      <div class="text-gray-400 bg-white">
        <p class="text-sm">Choose recent data <i class="fa fa-info-circle"></i></p>
        <select class="px-2 py-3 w-40 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm h-10" v-on:keyup.enter="fetchSomething()" v-model="days" name="days">
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
      </div>
	  </div>
      <div class="grid justify-items-center">
      <button class="mt-5 py-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium rounded-md h-10 w-80" v-on:click="fetchSomething">
        Apply filter
      </button>
      </div>
      <div class="flex justify-center">
</div>
	</div>
  </div>
  </div>

      <select class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer" v-on:keyup.enter="fetchSomething()" v-model="year" name="year">
        <option value="202" name="year">2020, 2021, 2022</option>
        <option value="2020">2020</option>
        <option value="2021" >2021</option>
        <option value="2022" >2022</option>
      </select>
      <button  class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold py-2 px-4 rounded" v-on:click="fetchSomething">Get graphs</button>
  

  <div id="lineage-model1" class="hidden box-border h-100 w-90 p-4 border-4 mt-2">
   <div class="box-content">
  <section>
    <div class="container mx-auto">
      <BarChart :key="random" :data="barChartDataWeek" :options="barChartOptionsWeek" :height="500" :width="2000" style="display: block; width: 1500px; height: 384px;"></BarChart>
    </div>
  </section>
</div>
  </div>

  <div id="lineage-model2" class="hidden box-border h-100 w-90 p-4 border-4 mt-2">
  <section>
    <div class="container mx-auto">
      <BarChart :key="random" :data="barChartDataMonth" :options="barChartOptionsMonth" :height="500" :width="2000" style="display: block; width: 1500px; height: 384px;"></BarChart>
    </div>
  </section>
  </div>

  <div id="lineage-model3" class="hidden box-border h-100 w-90 p-4 border-4 mt-2">
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
                  <span class="font-medium">{{ip.data.count/20+1 ^ 0}}</span>
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
                  <a v-if="page>=1 && page < ip.data.count/20" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" v-on:click="fetchSomething(page=page+1)">
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
  <Lineage />
  <!-- <p v-for="event in statedata.data.data" :key="event.id" :event="event">{{ event.state }}</p> -->
  </div>
</template>

<script>
import WeekDistribution from '/home/nsm-07/Desktop/Bhupati/insacog-voc-filter/components/WeeklyDistribution.vue'
import MonthDistribution from '/home/nsm-07/Desktop/Bhupati/insacog-voc-filter/components/MonthlyDistribution.vue'
import Lineage from "/home/nsm-07/Desktop/Bhupati/dev/insacog-voc-filter/components/Lineages.vue"
import $ from 'jquery'
import axios from 'axios'
import BarChart from "~/components/BarChart.vue";
import moment from "moment"
const page = 1
const year = '202'
export default {
  components: { BarChart, WeekDistribution, MonthDistribution, Lineage  },
  
  data () {
    return {
      insacog_datahub_stats:[
        {name: 'Pangolin Version 1', version: []},
        {name: 'Pangolin Version 2', version: '1.2.3'},
        {name: 'Pangolin Version 3', version: '1.2.3'},
        {name: 'Pangolin Version 4', version: '1.2.3'},
        {name: 'Pangolin Version 5', version: '1.2.3'},
        {name: 'Pangolin Version 6', version: '1.2.3'},
        {name: 'Pangolin Version 7', version: '1.2.3'},
      ],
      

      random: 123456,
      arrStates: [],
      arrMutations: [],
      events: [],
      days: 36500,
      start_date: "",
      end_date: "",
      page: 1,
      search: "",
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
      lineagescount: "",
      lineagestraindistribution: {},
      Genome_sequenced: {},
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


      year: "202",


      arrMonthNumber: [],
      arrMonthdata: [],
      barChartDataMonth: {
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
      barChartOptionsMonth: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Monthly frequency distribution of Sequences",
          fontSize: 18,
          fontColor: "#6b7280",
        },
        tooltips: {
          backgroundColor: "blue",
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
                // max: 5000,
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



      arrWeekNumber: [],
      arrweekdata: [],
      barChartDataWeek: {
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
      barChartOptionsWeek: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Weekly frequency distribution of Sequences",
          fontSize: 18,
          fontColor: "#6b7280",
        },
        tooltips: {
          backgroundColor: "blue",
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
                // max: 5000,
                min: 0,
                // stepSize: 50,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },




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


async mounted() {
    const { data } = await axios.get(`${process.env.baseUrl}/distribution/?year=${this.year}`);
    data.forEach(d => {
      const {
        week_number,
        strain__count
      } = d;
      this.arrweekdata.push(strain__count)
      this.arrWeekNumber.push(week_number)
    });
    this.barChartDataWeek.labels = this.arrWeekNumber
    this.barChartDataWeek.datasets[0].data = this.arrweekdata
    this.random = 456789

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

//  async created() {
//     const mutationdistribution = await axios.get(`${process.env.baseUrl}/statesmutationdistribution/`);
//     mutationdistribution.data.forEach(d => {
//       const {
//         state,
//         mutation_deletion__count
//       } = d;
      
//       this.arrMutations.push(mutation_deletion__count)
//       this.arrStates.push(state)
//     });
//     this.random = 456789
//     this.barChartData.labels = this.arrStates
//     this.barChartData.datasets[0].data = this.arrMutations
    
//   },

  
  
  async asyncData() {
    // const { data } = await axios.get(`${process.env.baseUrl}/distribution/?year=${year}`);
    // const data = await axios.get(`${process.env.baseUrl}/distribution/?year=${year}`)
    // console.log(data)
    // data.data.forEach(d => {
    //   const {
    //     week_number,
    //     strain__count
    //   } = d;
    //   // let random = 12345
    //   // let arrweekdata = []
    //   // let arrWeekNumber = []
    //   this.arrweekdata.push(strain__count)
    //   this.arrWeekNumber.push(week_number)
    //   // let barChartDataWeek = {
    //   //     labels: [],
    //   //     datasets: [
    //   //       {
    //   //         label: "count",
    //   //         data: [],
    //   //         backgroundColor: "#1E90FF",
    //   //         borderColor: "rgba(blue)",
    //   //         borderWidth: 2,
    //   //       },
    //   //     ],
    //   //   }
    //   this.barChartDataWeek.labels = this.arrWeekNumber
    //   this.barChartDataWeek.datasets[0].data = this.arrweekdata
    //   this.random = 456789
    // });
    
    const lineagescount = await axios.get(`${process.env.baseUrl}/uniqelineagecount/`)
    const lineagestraindistribution = await axios.get(`${process.env.baseUrl}/uniquelineagestrain/`)
    const ip = await axios.get(`${process.env.baseUrl}/data/?page=${page}`)
    const sequences = await axios.get(`${process.env.baseUrl}/count/`)
    const Genome_sequenced = await axios.get(`${process.env.baseUrl}/genomesseqenced/`)
    const version_data = await axios.post(`https://research.nibmg.ac.in/insacog/api/files/landing-stats/`)
      console.log(ip)
      const count = ip.data.count
      const gen_count = Genome_sequenced.data.count
      const unisequences = sequences.data[0].count
      const last_updated = moment(version_data.data.last_updated, "YYYY-MM-DD hh:mm").format("YYYY-MM-DD hh:mm A")
      const nextclade_version = version_data.data.nextclade_version.toString().split(':').at(-1)
      const pango_designation_version = version_data.data.pango_designation_version.toString().split(':').at(-1)
      const pangolearn_version = version_data.data.pangolearn_version.toString().split(':').at(-1)
      const constellation_version = version_data.data.constellation_version.toString().split(':').at(-1)
      const pangolin_version = version_data.data.pangolin_version.toString().split(':').at(-1)
      const genomes_sequenced = version_data.data.genomes_sequenced
      return { ip,Genome_sequenced,lineagestraindistribution,lineagescount, unisequences, count, version_data, last_updated, nextclade_version, pango_designation_version, pangolearn_version, constellation_version, pangolin_version, genomes_sequenced }
  },

  methods: {
    // get_class(index) {
    //   if(index == 0) {
    //     return 'p-4 text-gray-400 bg-white rounded-l-md drop-shadow-md'
    //   } else if((index+1) == this.insacog_datahub_stats.length) {
    //     return 'p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md'
    //   } 
    //   return 'p-4 text-gray-400 bg-white drop-shadow-lg'
    // },
    get_graphs() {
      $('#lineage-model1').show();
    },


    handlechange1() {
      $('#lineage-model').toggle();
      $('#lineage-model1').show();
    },

    handlechange()
    {
			$('#my-modal').toggle();
      // $('#lineage-model').toggle();
    let modal = document.getElementById("my-modal");

    // let btn = document.getElementById("show");

    let button = document.getElementById("ok-btn");

    let linmodel = document.getElementById("lineage-model")
    let lin = document.getElementById("lineage-list")

    lin.onclick = function() {
    linmodel.style.display = "block";
    }
    
    
    // btn.onclick = function() {
    // modal.style.display = "block";
    // }
    // // We want the modal to close when the OK button is clicked
    button.onclick = function() {
    modal.style.display = "none";
    }
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    $("template").click(function(){ $("#my-modal","#lineage-model").fadeOut(); });
    // $("template").click(function(){ $("#lineage-model").fadeOut(); });
    },
    greet: function (event) {
      
      // `event` is the native DOM event
      if (event) {
        return 'fixed hidden'
      }
      return 'fixed'
    },
    
    async fetchSomething() {
      $('#lineage-model1').show();
      $('#lineage-model2').show();
      $('#lineage-model3').show();
      this.arrStates.splice(0,)
      this.arrMutations.splice(0,)

      if (page > 1) {
			const prev = page - 1;
		}
      const ip = await axios.get(`${process.env.baseUrl}/data/?page=${this.page}&search=${this.search}&start_date=${this.start_date}&end_date=${this.end_date}&days=${this.days}&strain=${this.strain}&ordering=${this.ordering}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`)
      this.ip = ip

      const lineagescount = await axios.get(`${process.env.baseUrl}/uniqelineagecount/?search=${this.search}&start_date=${this.start_date}&end_date=${this.end_date}&strain=${this.strain}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`)
      this.lineagescount = lineagescount
      const lineagestraindistribution = await axios.get(`${process.env.baseUrl}/uniquelineagestrain/?search=${this.search}&start_date=${this.start_date}&end_date=${this.end_date}&strain=${this.strain}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`)
      this.lineagestraindistribution = lineagestraindistribution

      const Genome_sequenced = await axios.get(`${process.env.baseUrl}/genomesseqenced/?search=${this.search}&start_date=${this.start_date}&end_date=${this.end_date}&strain=${this.strain}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`)
      this.Genome_sequenced = Genome_sequenced
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




      this.arrMonthNumber.splice(0,)
      this.arrMonthdata.splice(0,)
      const data1 = await axios.get(`${process.env.baseUrl}/monthlydistribution/?year=${this.year}&strain=${this.strain}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`);
      console.log(data1.data)
      data1.data.forEach(d => {
        const {
          month_number,
          strain__count
        } = d;
        this.arrMonthdata.push(strain__count)
        this.arrMonthNumber.push(month_number)
      });
      this.barChartDataMonth.labels = this.arrMonthNumber
      this.barChartDataMonth.datasets[0].data = this.arrMonthdata
      this.random = 456789

      this.arrWeekNumber.splice(0,)
      this.arrweekdata.splice(0,)
    const { data } = await axios.get(`${process.env.baseUrl}/distribution/?year=${this.year}&strain=${this.strain}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`);
    data.forEach(d => {
      const {
        week_number,
        strain__count
      } = d;
      this.arrweekdata.push(strain__count)
      this.arrWeekNumber.push(week_number)
    });
    this.barChartDataWeek.labels = this.arrWeekNumber
    this.barChartDataWeek.datasets[0].data = this.arrweekdata
    this.random = Math.random()


    },
    
    
    async downloadFile() {
      const csv = await axios.get(`${process.env.baseUrl}/exportcsv/?days=${this.days}&search=${this.search}&start_date=${this.start_date}&end_date=${this.end_date}&strain=${this.strain}&ordering=${this.ordering}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`)
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