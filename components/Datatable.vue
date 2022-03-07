<template>
  <div>
    <div class="container mx-auto py-4">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div
              v-if="datatable_loaded"
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                      <a
                        class="cursor-pointer font-bold"
                        v-on:click="openMenu(ordering = 'date')"
                      >&#x2193;</a>
                      <a
                        class="cursor-pointer font-bold"
                        v-on:click="openMenu(ordering = '-date')"
                      >&#x2191;</a>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Strain
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = 'strain')"
                      >&#x2193;</a>
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = '-strain')"
                      >&#x2191;</a>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      State
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = 'state')"
                      >&#x2193;</a>
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = '-state')"
                      >&#x2191;</a>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lineage
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = 'lineage')"
                      >&#x2193;</a>
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = '-ordering')"
                      >&#x2191;</a>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Gene
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = 'gene')"
                      >&#x2193;</a>
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = '-gene')"
                      >&#x2191;</a>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Reference
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = 'reference_id')"
                      >&#x2193;</a>
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = '-reference_id')"
                      >&#x2191;</a>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      AA Position
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = 'amino_acid_position')"
                      >&#x2193;</a>
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = '-amino_acid_position')"
                      >&#x2191;</a>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mutation
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = 'mutation')"
                      >&#x2193;</a>
                      <a
                        class="cursor-pointer"
                        v-on:click="openMenu(ordering = '-mutation')"
                      >&#x2191;</a>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y text-middle divide-gray-200">
                  <tr v-for="event in datatable.results" :key="event.id" :event="event">
                    <td class="px-10 text-middle whitespace-nowrap">{{ event.date }}</td>
                    <td
                      class="px-10 whitespace-nowrap text-sm font-medium"
                    >{{ event.strain }}</td>
                    <td
                      class="px-10 whitespace-nowrap text-middle text-sm font-medium"
                    >{{ event.state }}</td>
                    <td
                      class="px-10 py-4 whitespace-nowrap text-sm font-medium"
                    >{{ event.lineage }}</td>
                    <td
                      class="px-10 py-4 whitespace-nowrap text-sm font-medium"
                    >{{ event.gene }}</td>
                    <td class="px-10 py-4 whitespace-nowrap">{{ event.reference_id }}</td>
                    <td
                      class="px-10 py-4 whitespace-nowrap text-sm font-medium"
                    >{{ event.amino_acid_position }}</td>
                    <td
                      class="px-10 whitespace-nowrap text-middle text-sm font-medium"
                    >{{ event.mutation }}</td>
                  </tr>
                </tbody>
              </table>
              <div
                class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
              >
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Showing
                      <span class="font-medium">{{ page }}</span>
                      of
                      <span
                        class="font-medium"
                      >{{ datatable.count / 20 + 1 ^ 0 }}</span>
                      pages
                    </p>
                  </div>
                  <div>
                    <nav
                      class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer"
                      aria-label="Pagination"
                    >
                      <a
                        v-if="page > 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        v-on:click="openMenu(page = page - 1)"
                      >Previous</a>
                      <a
                        aria-current="page"
                        class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        v-on:click="openMenu(page)"
                      >{{ page }}</a>
                      <a
                        v-if="page >= 1 && page < datatable.count / 20"
                        class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        v-on:click="openMenu(page = page + 1)"
                      >{{ page + 1 }}</a>
                      <a
                        v-if="page >= 1 && page < datatable.count / 20 - 1"
                        class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        v-on:click="openMenu(page = page + 2)"
                      >{{ page + 2 }}</a>
                      <a
                        v-if="page >= 1 && page < datatable.count / 20"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        v-on:click="openMenu(page = page + 1)"
                      >Next</a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapFields } from 'vuex-map-fields'
import AnimatedNumber from 'animated-number-vue'

export default {
  data: () => ({
  }),
  computed: { ...mapFields('base', ['datatable', 'datatable_loaded', 'page', 'ordering']) },
  methods: {
    formatnumber(value) {
      return value.toLocaleString('en-IN')
    },
    openMenu() {
      this.$store.dispatch("base/DataTable")
    },
  },
  created() {
    this.$store.dispatch("base/DataTable");
  },
  mounted() {
    this.$nextTick(() => { })
  },
}
</script>