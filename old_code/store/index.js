// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'
import { map } from 'lodash'

Vue.use(Vuex);
const page = 1
export default () => new Vuex.Store({
 
    state: {
        DataTable: [],
        WeekDistribution: [],
        MonthDistribution: [],
        StateDistribution: [],
        page: 1,
        days: 36500,
        search: "",
        gene: "",
        mutation: "",
        reference_id: "",
        start_date: "",
        end_date: "",
        amino_acid_position: "",
        year: "202",
        state: "",
        strain: "",
        date: "",
        lineage: "",
        mutation_deletion: "",
        StackedBar: [],
        arrUniqueMonths: [],
        arrLineage: [],
        arrStrainLineage: [],

        UniqueLineages: [],
        LineageDistribution: [],
        UniqueSequences: [],

        arrweekdata: [],
        arrWeekNumber: [],

        WeekLineageClassification: [],
        weeklineageClassArr: [],
        lineageClassArr: [],

        MonthLineageClassification: [],
        monthlineageClassArr: [],
        monthnamelineageClassArr: [],

        arrMonthData: [],
        arrMonthNumber: [],

        LineageClassification: [],
        arrClass: [],
        arrClassCount: [],

        arrStates:[],
        arrStrainCount: [],

        StateLineageClassification: [],
        arrStatesClass: [],
        arrStateLineages: [],


        dataSets: []
    },
    
    getters: {
        getarrweekdata: state => state.arrweekdata,
        getarrWeekNumber: state => state.arrWeekNumber,
        
        getweeklineageClassArr: state => state.weeklineageClassArr,
        getlineageClassArr: state => state.lineageClassArr,

        getmonthlineageClassArr: state => state.monthlineageClassArr,
        getmonthnamelineageClassArr: state => state.monthnamelineageClassArr,


        getarrMonthData: state => state.arrMonthData,
        getarrMonthNumber: state => state.arrMonthNumber,
        getarrdataSets: state => state.dataSets,

        getarrStatesClass: state => state.arrStatesClass,
        getarrStateLineages: state => state.arrStateLineages,

        getarrState: state => state.arrStates,
        getarrStrainCount: state => state.arrStrainCount,

        getarrClass: state => state.arrClass,
        getarrClassCount: state => state.arrClassCount
    },
    
    
    actions: {
        async getPosts({ commit }) {
            if (this.state.page > 1) {
                const prev = this.state.page - 1;
            }
            await axios.get(`${process.env.baseUrl}/linclassification/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
            .then(response => {
                commit('SET_LineageClassification', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/data/?page=${this.state.page}&amino_acid_position=${this.state.amino_acid_position}&days=${this.state.days}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_DataTable', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/lineageclassificationweekly/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
            .then(response => {
                commit('SET_WeekLineageClassification', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/lineageclassificationmonth/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
            .then(response => {
                commit('SET_MonthLineageClassification', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/monthlydistribution/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_MonthDistribution', response.data)
            }),
            
            await axios.get(`${process.env.baseUrl}/distribution/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&strain=${this.state.strain}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_WeekDistribution', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/stateslineageclassification/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_StateLineageClassification', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/statesequencesdistribution/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_StateDistribution', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/uniqelineagecount/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_UniqueLineages', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/uniquelineagestrain/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&year=${this.state.year}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_LineageDistribution', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/genomesseqenced/?days=${this.state.days}&amino_acid_position=${this.state.amino_acid_position}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_UniqueSequences', response.data)
            })
            
        },

        async getLineageClassification({ commit }) {
            await axios.get(`${process.env.baseUrl}/stackbar/`)
                .then(response => {
                    commit('SET_StackedBar', response.data)
            })
        },

        // async getWeeklyDistribution({ commit }) {
        //     await axios.get(`${process.env.baseUrl}/distribution/?days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
        //         .then(response => {
        //             commit('SET_WeekDistribution', response.data)
        //     })
        // },


        // async getMonthlyDistribution({ commit }) {
        //     await axios.get(`${process.env.baseUrl}/monthlydistribution/?days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
        //         .then(response => {
        //             commit('SET_MonthDistribution', response.data)
        //     })
        // },


        async downloadFile() {
            const csv = await axios.get(`${process.env.baseUrl}/exportcsv/?days=${this.state.days}&start_date=${this.state.start_date}&end_date=${this.state.end_date}&strain=${this.state.strain}&ordering=${this.state.ordering}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&amino_acid_position=${this.state.amino_acid_position}&mutation=${this.state.mutation}`)
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
    
    //to handle mutations
    mutations: {
        SET_StackedBar(state, value) {
            state.StackedBar = value
            this.state.dataSets.splice(0,)
            this.state.arrUniqueMonths.splice(0,)
            this.state.arrLineage.splice(0,)
            this.state.arrStrainLineage.splice(0,)

            const distinctDates = Array.from(new Set(value.map(o => o.month_number)));
            const dataPerDate = distinctDates.map(d => value.filter(o => o.month_number == d));
            const numberOfDatasets = Math.max.apply(null, dataPerDate.map(value => value.length));
            // const dataSets = [];
            for (let i = 0; i < numberOfDatasets; i++) {
            this.state.dataSets.push({
                data: dataPerDate.map(value => i < value.length ? value[i].lineage : 0),
                ranges: dataPerDate.map(value => i < value.length ? value[i].strain__count : ''),
                backgroundColor: distinctDates.map(d => 
                "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", 0.5)"),
                categoryPercentage: 1,
                barPercentage: 1
            });
            }
            // console.log("data",this.state.dataSets)
        },
        SET_LineageClassification(state, value) {
            state.LineageClassification = value
            this.state.arrClass.splice(0,)
            this.state.arrClassCount.splice(0,)
            value.forEach(d => {
                const {
                    Class,
                    strain__count
                } = d;
                this.state.arrClass.push(Class)
                this.state.arrClassCount.push(strain__count)
            });
            // console.log(this.state.arrClass)
        },

        SET_UniqueLineages(state, value) {
            state.UniqueLineages = value
        },
        SET_LineageDistribution(state, value) {
            state.LineageDistribution = value
        },
        SET_UniqueSequences(state, value) {
            state.UniqueSequences = value
        },

        SET_DataTable(state, value) {
            state.DataTable = value
        },
        SET_WeekDistribution(state, value) {
            state.WeekDistribution = value
            this.state.arrWeekNumber.splice(0,)
            this.state.arrweekdata.splice(0,)
            value.forEach(d => {
                const {
                    week_number,
                    strain__count
                } = d;
                this.state.arrWeekNumber.push(week_number)
                this.state.arrweekdata.push(strain__count)
                });
        },
        SET_MonthDistribution(state, value) {
            state.MonthDistribution = value
            this.state.arrMonthData.splice(0,)
            this.state.arrMonthNumber.splice(0,)
            value.forEach(d => {
                const {
                    month_number,
                    strain__count
                } = d;
                this.state.arrMonthNumber.push(month_number)
                this.state.arrMonthData.push(strain__count)
            });
        },
        SET_StateLineageClassification(state, value) {
            state.StateLineageClassification = value
            this.state.arrStatesClass.splice(0,)
            this.state.arrStateLineages.splice(0,)
            this.state.arrStatesClass = value.state.state
            let s = map(value.lineage, (d) => ({
                name: d.Class,
                data: d.value,
              }))
            this.state.arrStateLineages = s
        },
        SET_StateDistribution(state, value) {
            state.StateDistribution = value
            this.state.arrStates.splice(0,)
            this.state.arrStrainCount.splice(0,)
            value.forEach(d => {
                const {
                    state,
                    strain__count
                } = d;
                this.state.arrStates.push(state)
                this.state.arrStrainCount.push(strain__count)
                });
        },
        SET_WeekLineageClassification(state, value) {
            state.WeekLineageClassification = value
            this.state.weeklineageClassArr.splice(0,)
            this.state.lineageClassArr.splice(0,)
            // this.state.monthlineageClassArr.splice(0,)
            // this.state.monthnamelineageClassArr.splice(0,)
            this.state.weeklineageClassArr = value.week.week.week_number
            // this.state.monthnamelineageClassArr = value.month.month.month_number
            let s = map(value.week.weekly_lineage, (d) => ({
                name: d.Class,
                data: d.value,
              }))
            this.state.lineageClassArr = s
        },
        SET_MonthLineageClassification(state, value) {
            state.MonthLineageClassification = value
            this.state.monthlineageClassArr.splice(0,)
            this.state.monthnamelineageClassArr.splice(0,)
            this.state.monthnamelineageClassArr = value.month.month.month_number
            let l = map(value.month.lineage, (d) => ({
                name: d.Class,
                data: d.value,
              }))
            this.state.monthlineageClassArr = l
        },
    }
})