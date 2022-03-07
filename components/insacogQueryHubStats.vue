<template>
    <div>
        <div
            class="relative flex justify-center items-center w-full border-b-2 border-gray-300 my-20 mt-6 mb-6"
        >
            <h1
                class="absolute bg-gray-100 px-2 text-xl font-semibold"
            >INSACOG QueryHub Stats</h1>
        </div>
        <div
            v-if="datatable_loaded"
            class="grid grid-cols-3 divide-x-2 divide-slate-400 p-2 mb-2 text-center divide-dashed text-sm"
        >
            <div class="p-4 text-gray-400 bg-white rounded-l-md drop-shadow-md">
                <p class="font-medium">Total records</p>
                <p>
                    <animated-number
                        :value="datatable.count"
                        :duration="1000"
                        :formatValue="formatnumber"
                    />
                </p>
            </div>
            <div class="p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md">
                <p class="font-medium">Sequences Found</p>
                <p>
                    <animated-number
                        :value="uniqueSequences.count"
                        :duration="1000"
                        :formatValue="formatnumber"
                    />
                </p>
            </div>
            <div
                @click="isShowing ^= true"
                class="relative hover-trigger p-4 text-gray-400 bg-white rounded-r-md drop-shadow-md cursor-pointer"
            >
                <div
                    class="absolute bg-gray-200 border border-grey-100 px-10 hover-target w-60 rounded-md"
                >Click here to see lineage distribution with unique sequences</div>
                <p class="font-medium text-blue-400">
                    Lineages Found
                    <i
                        id="lineage-list"
                        class="relative hover-trigger fa fa-info-circle"
                    ></i>
                </p>
                <p>
                    <animated-number
                        :value="uniqueLineages.count"
                        :duration="1000"
                        :formatValue="formatnumber"
                    />
                </p>
            </div>
        </div>

        <div
            v-show="isShowing"
            class="inset-10 bg-white w-full pl-4 pb-2"
            id="lineage-model"
        >
            <div
                class="bg-green-100 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden"
                v-for="event in lineageDistribution.results"
                :key="event.id"
                :event="event"
            >
                <span
                    class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1 text-gray-500"
                >
                    {{ event.lineage }}
                    <span
                        class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1 text-gray-900"
                    >{{ event.strain__count }}</span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
import AnimatedNumber from 'animated-number-vue'

export default {
    data: () => ({
        isShowing: false,
    }),
    components: { AnimatedNumber },
    computed: {
        ...mapFields('base', [
            'datatable',
            'datatable_loaded',
            'uniqueLineages',
            'uniqueLineages_loaded',
            'lineageDistribution',
            'lineageDistribution_loaded',
            'uniqueSequences',
            'uniqueSequences_loaded',
        ]),
    },
    methods: {
        formatnumber(value) {
            return value.toLocaleString('en-IN')
        },
    },
    mounted() {
        this.$nextTick(() => { })
    },
}
</script>

<style scoped></style>

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
