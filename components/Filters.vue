<template>
  <div>
    <div>
      <div
        class="grid grid-cols-2 md:w-2/1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 flex justify-right"
      >
        <div class="grid justify-items-start">
          <button
            class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-30 text-sm"
            v-on:click="downloadFile"
          >
            <svg
              class="fill-current w-2 h-2 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download</span>
          </button>
        </div>
        <div class="grid justify-items-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 content-left text-white font-bold w-30 h-10 py-2 px-4 rounded text-sm fixed"
            id="show"
            v-on:click="handlechange"
          >
            <i class="fa fa-filter" style="font-size: 24px;"></i>
            Filter
          </button>
        </div>
      </div>
    </div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <div
      class="fixed hidden inset-10 mt-16 w-2/3 py-16 mx-auto pt-48 pl-40 grid justify-end"
      id="my-modal"
    >
      <div class="w-full shadow p-5 rounded-lg bg-white">
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4 pb-4">
          <div class="grid justify-items-start">
            <p class="font-medium font-sans">Search based on:</p>
          </div>
          <div class="grid justify-items-end">
            <i
              class="fa fa-remove cursor-pointer"
              id="ok-btn"
              style="font-size: 20px; color: red;"
            ></i>
          </div>
        </div>
        <div class="relative">
          <div class="absolute flex items-center ml-2 h-full">
            <svg
              class="w-4 h-4 fill-current text-primary-gray-dark"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"
              ></path>
            </svg>
          </div>
          <input
            v-model="$store.state.search"
            v-on:keyup.enter="openMenu"
            name="search"
            type="text"
            placeholder="Search by date, strain, state, lineage..."
            class="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          />
        </div>

        <div class="flex items-center justify-between mt-4">
          <p class="font-medium">Filters</p>
          <!-- <button class="bg-gray-400 hover:bg-gray-700 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-30 text-sm" v-on:click="downloadFile">
        <svg class="fill-current w-2 h-2 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Download</span>
      </button> -->
          <button
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            v-on:click="resetInput"
          >
            Reset filter
          </button>
        </div>

        <div>
          <div
            class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
          >
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Strain
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40"
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="strain"
                type="text"
                placeholder="ex. hCoV-19/India/Karnataka/CRL/KIMS-1/2021"
                v-model="$store.state.strain"
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                State
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40"
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                type="text"
                name="state"
                placeholder="ex. West bengal"
                v-model="$store.state.state"
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Lineage
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40"
                  >
                    Multiple lineages can be filtered with seperation of
                    comma(',')
                  </div>
                </i>
              </p>
              <input
                v-model="$store.state.lineage"
                class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="lineage"
                type="text"
                placeholder="ex. B.1.617.2, BA.1"
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Mutation and deletion
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40"
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                v-model="$store.state.mutation_deletion"
                class="shadow appearance-none border w-48 rounded py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="mutation_deletion"
                type="text"
                placeholder="ex. m:i82t"
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Gene
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40"
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                v-model="$store.state.gene"
                class="shadow appearance-none border w-48 rounded py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="gene"
                type="text"
                placeholder="ex. orf3a"
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Amino acid reference
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40"
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="reference_id"
                type="text"
                placeholder="ex. a or b..."
                v-model="$store.state.reference_id"
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Amino acid position
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40"
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                type="text"
                name="amino_acid_position"
                placeholder="ex. 314 or 25..."
                v-model="$store.state.amino_acid_position"
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Amino acid change
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40"
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                v-model="$store.state.mutation"
                class="shadow appearance-none border rounded w-48 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="mutation"
                type="text"
                placeholder="ex. a or b..."
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <div class="grid grid-cols-2">
                <p class="text-sm">
                  Date
                  <i class="relative hover-trigger fa fa-info-circle">
                    <div
                      class="absolute bg-white border border-grey-100 px-4 py-2 hover-target w-40 rounded-md"
                    >
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
                    <div
                      class="w-6 h-2 bg-gray-400 rounded-full shadow-inner"
                    ></div>
                    <!-- dot -->
                    <div
                      class="dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition"
                    ></div>
                  </div>
                </label>
              </div>
              <input
                v-model="$store.state.date"
                class="shadow appearance-none border w-48 rounded text-gray-700 py-2 px-3 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="date"
                type="text"
                placeholder="ex. 2021-01-02"
                v-on:keyup.enter="openMenu"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                From
                <i class="fa fa-info-circle"></i>
              </p>
              <input
                v-model="$store.state.start_date"
                class="shadow appearance-none border w-48 rounded py-2 px-3 bg-gray-100 text-gray-500 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="start_date"
                type="date"
                placeholder="start_date"
                
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                To
                <i class="fa fa-info-circle"></i>
              </p>
              <input
                v-model="$store.state.end_date"
                class="shadow appearance-none border w-48 rounded py-2 px-3 bg-gray-100 text-gray-500 leading-tight focus:outline-none focus:shadow-outline text-sm"
                name="end_date"
                type="date"
                placeholder="end_date"
                
              />
            </div>

            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Choose recent data
                <i class="fa fa-info-circle"></i>
              </p>
              <select
                class="px-2 py-3 w-40 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm h-10"
                
                v-model="$store.state.days"
                name="days"
              >
                <option value="36500" name="days">All data</option>
                <option value="7">Last week</option>
                <option value="14">Last 2 weeks</option>
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
            <button
              class="mt-5 py-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium rounded-md h-10 w-80"
              @click="openMenu"
            >
              Apply filter
            </button>
          </div>
          <div class="flex justify-center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios"

export default {
  name: 'myStore',
  data () {
    return {
      msg: 'Welcome to my Vuex Store'
    }
  },
  computed: {
    posts() {
    return $store.state.posts

    }
  },
  
  mounted() {
    // console.log(this.$store.state.arrWeekNumber)
    // console.log(this.$store.state.random)
    this.$store.dispatch("getPosts");
  },
  // methods: {
  //     DownloadData () {
  //           this.$store.dispatch('downloadFile')
  //       },
  //   },
  methods: {
    async downloadFile() {
            const csv = await axios.get(`${process.env.baseUrl}/exportcsv/?days=${this.$store.state.days}&start_date=${this.$store.state.start_date}&end_date=${this.$store.state.end_date}&strain=${this.$store.state.strain}&ordering=${this.$store.state.ordering}&state=${this.$store.state.state}&lineage=${this.$store.state.lineage}&mutation_deletion=${this.$store.state.mutation_deletion}&date=${this.$store.state.date}&gene=${this.$store.state.gene}&reference_id=${this.$store.state.reference_id}&amino_acid_position=${this.$store.state.amino_acid_position}&mutation=${this.$store.state.mutation}`)
                      const file_name = csv.data.path;
                      // console.log(file_name);
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
              },
    resetInput() {
      // this.$store.state.days = "",
      this.$store.state.strain = "";
      this.$store.state.state = "";
      this.$store.state.date = "";
      this.$store.state.mutation_deletion = "";
      this.$store.state.gene = "";
      this.$store.state.reference_id = "";
      this.$store.state.mutation = "";
      this.$store.state.start_date = "";
      this.$store.state.end_date = "";
      this.$store.state.lineage = "";
      this.$store.state.amino_acid_position = "";
    },
    openMenu () {
        // console.log(this.$store.state.random)
        this.$store.dispatch('getPosts')
        console.log(this.$store.state.arrWeekNumber)
    },
    handlechange() {
      $("#my-modal").toggle();
      let modal = document.getElementById("my-modal");

      let button = document.getElementById("ok-btn");

      let linmodel = document.getElementById("lineage-model");
      let lin = document.getElementById("lineage-list");

    //   lin.onclick = function () {
    //     linmodel.style.display = "block";
    //   };

      // btn.onclick = function() {
      // modal.style.display = "block";
      // }

      
      button.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
      $("template").click(function () {
        $("#my-modal", "#lineage-model").fadeOut();
      });
    }
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
  font-family: "Times New Roman", Times, serif;
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