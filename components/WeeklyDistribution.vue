<template>
  <div class="box-content">
    <div
      class="
        inset-10
        mt-16
        w-2/3
        py-16
        mx-auto
        pt-48
        pl-40
        grid
        justify-end
      "
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
              style="font-size: 20px; color: red"
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
            v-model="search"
            v-on:keyup.enter="fetchSomething()"
            name="search"
            type="text"
            placeholder="Search by date, strain, state, lineage..."
            class="
              px-8
              py-3
              w-full
              rounded-md
              bg-gray-100
              border-transparent
              focus:border-gray-500 focus:bg-white focus:ring-0
              text-sm
            "
          />
        </div>

        <div class="flex items-center justify-between mt-4">
          <p class="font-medium">Filters</p>
          <!-- <button class="bg-gray-400 hover:bg-gray-700 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-30 text-sm" v-on:click="downloadFile">
        <svg class="fill-current w-2 h-2 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Download</span>
      </button> -->
          <button
            class="
              px-4
              py-2
              bg-gray-100
              hover:bg-gray-200
              text-gray-800 text-sm
              font-medium
              rounded-md
            "
            @click="resetInput"
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
                    class="
                      absolute
                      bg-white
                      border border-grey-100
                      px-4
                      py-2
                      hover-target
                      w-40
                    "
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-48
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="strain"
                type="text"
                placeholder="ex. hCoV-19/India/Karnataka/CRL/KIMS-1/2021"
                v-model="strain"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                State
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="
                      absolute
                      bg-white
                      border border-grey-100
                      px-4
                      py-2
                      hover-target
                      w-40
                    "
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-48
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                type="text"
                name="state"
                placeholder="ex. West bengal"
                v-model="state"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Lineage
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="
                      absolute
                      bg-white
                      border border-grey-100
                      px-4
                      py-2
                      hover-target
                      w-40
                    "
                  >
                    Multiple lineages can be filtered with seperation of
                    comma(',')
                  </div>
                </i>
              </p>
              <input
                v-model="lineage"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-48
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="lineage"
                type="text"
                placeholder="ex. B.1.617.2, BA.1"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Mutaion deletion
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="
                      absolute
                      bg-white
                      border border-grey-100
                      px-4
                      py-2
                      hover-target
                      w-40
                    "
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                v-model="mutation_deletion"
                class="
                  shadow
                  appearance-none
                  border
                  w-48
                  rounded
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="mutation_deletion"
                type="text"
                placeholder="ex. m:i82t"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Gene
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="
                      absolute
                      bg-white
                      border border-grey-100
                      px-4
                      py-2
                      hover-target
                      w-40
                    "
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                v-model="gene"
                class="
                  shadow
                  appearance-none
                  border
                  w-48
                  rounded
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="gene"
                type="text"
                placeholder="ex. orf3a"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Amino acid change
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="
                      absolute
                      bg-white
                      border border-grey-100
                      px-4
                      py-2
                      hover-target
                      w-40
                    "
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-48
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="reference_id"
                type="text"
                placeholder="ex. a or b..."
                v-model="reference_id"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Amino acid position
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="
                      absolute
                      bg-white
                      border border-grey-100
                      px-4
                      py-2
                      hover-target
                      w-40
                    "
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-48
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                type="text"
                name="amino_acid_position"
                placeholder="ex. 314 or 25..."
                v-model="amino_acid_position"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Mutation
                <i class="relative hover-trigger fa fa-info-circle">
                  <div
                    class="
                      absolute
                      bg-white
                      border border-grey-100
                      px-4
                      py-2
                      hover-target
                      w-40
                    "
                  >
                    Partial match possible
                  </div>
                </i>
              </p>
              <input
                v-model="mutation"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-48
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="mutation"
                type="text"
                placeholder="ex. a or b..."
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <div class="grid grid-cols-2">
                <p class="text-sm">
                  Date
                  <i class="relative hover-trigger fa fa-info-circle">
                    <div
                      class="
                        absolute
                        bg-white
                        border border-grey-100
                        px-4
                        py-2
                        hover-target
                        w-40
                        rounded-md
                      "
                    >
                      Switch the button to date range filter
                    </div>
                  </i>
                </p>
                <label
                  for="toogleA"
                  class="
                    flex
                    items-center
                    cursor-pointer
                    grid
                    justify-end
                    pr-16
                  "
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
                      class="
                        dot
                        absolute
                        w-4
                        h-4
                        bg-white
                        rounded-full
                        shadow
                        -left-1
                        -top-1
                        transition
                      "
                    ></div>
                  </div>
                </label>
              </div>
              <input
                v-model="date"
                class="
                  shadow
                  appearance-none
                  border
                  w-48
                  rounded
                  text-gray-700
                  py-2
                  px-3
                  bg-gray-100
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="date"
                type="text"
                placeholder="ex. 2021-01-02"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">From <i class="fa fa-info-circle"></i></p>
              <input
                v-model="start_date"
                class="
                  shadow
                  appearance-none
                  border
                  w-48
                  rounded
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-500
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="start_date"
                type="date"
                placeholder="start_date"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>
            <div class="text-gray-400 bg-white">
              <p class="text-sm">To <i class="fa fa-info-circle"></i></p>
              <input
                v-model="end_date"
                class="
                  shadow
                  appearance-none
                  border
                  w-48
                  rounded
                  py-2
                  px-3
                  bg-gray-100
                  text-gray-500
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  text-sm
                "
                name="end_date"
                type="date"
                placeholder="end_date"
                v-on:keyup.enter="fetchSomething()"
              />
            </div>

            <div class="text-gray-400 bg-white">
              <p class="text-sm">
                Choose recent data <i class="fa fa-info-circle"></i>
              </p>
              <select
                class="
                  px-2
                  py-3
                  w-40
                  rounded-md
                  bg-gray-100
                  border-transparent
                  focus:border-gray-500 focus:bg-white focus:ring-0
                  text-sm
                  h-10
                "
                v-on:keyup.enter="fetchSomething()"
                v-model="days"
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
              class="
                mt-5
                py-2
                bg-green-500
                hover:bg-green-400
                text-white text-sm
                font-medium
                rounded-md
                h-10
                w-80
              "
              v-on:click="fetchSomething"
            >
              Apply filter
            </button>
          </div>
          <div class="flex justify-center"></div>
        </div>
      </div>
    </div>
    <section>
      <div class="container mx-auto">
        <select
          class="
            shadow
            appearance-none
            border
            rounded
            w-50
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
            cursor-pointer
          "
          v-on:keyup.enter="fetchSomething()"
          v-model="year"
          name="year"
        >
          <option value="202" name="year">Both 2020 && 2021</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            content-left
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          v-on:click="fetchSomething"
        >
          Get Graph
        </button>
        <BarChart
          :key="random"
          :data="barChartData"
          :options="barChartOptions"
          :height="500"
          :width="2000"
          style="display: block; width: 1500px; height: 384px"
        ></BarChart>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import BarChart from "~/components/BarChart.vue";
export default {
  components: { BarChart },

  data() {
    return {
      year: "202",
      random: 123456,
      arrWeekNumber: [],
      arrweekdata: [],
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
    };
  },
  async created() {
    const { data } = await axios.get(
      `${process.env.baseUrl}/distribution/?year=${this.year}`
    );
    data.forEach((d) => {
      const { week_number, strain__count } = d;
      this.arrweekdata.push(strain__count);
      this.arrWeekNumber.push(week_number);
    });
    this.barChartData.labels = this.arrWeekNumber;
    this.barChartData.datasets[0].data = this.arrweekdata;
    this.random = 456789;
  },

  methods: {
    async fetchSomething() {
      this.arrWeekNumber.splice(0);
      this.arrweekdata.splice(0);
      const { data } = await axios.get(
        `${process.env.baseUrl}/distribution/?year=${this.year}&strain=${this.strain}&state=${this.state}&lineage=${this.lineage}&mutation_deletion=${this.mutation_deletion}&date=${this.date}&gene=${this.gene}&reference_id=${this.reference_id}&amino_acid_position=${this.amino_acid_position}&mutation=${this.mutation}`
      );
      data.forEach((d) => {
        const { week_number, strain__count } = d;
        this.arrweekdata.push(strain__count);
        this.arrWeekNumber.push(week_number);
      });
      this.barChartData.labels = this.arrWeekNumber;
      this.barChartData.datasets[0].data = this.arrweekdata;
      this.random = Math.random();
    },
  },
};
</script>
