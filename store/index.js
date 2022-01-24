// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'


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

        UniqueLineages: [],
        LineageDistribution: [],
        UniqueSequences: [],

        arrweekdata: [],
        arrWeekNumber: [],

        arrMonthData: [],
        arrMonthNumber: [],

        arrStates:[],
        arrStrainCount: [],
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
    },
    
    getters: {
        getarrweekdata: state => state.arrweekdata,
        getarrWeekNumber: state => state.arrWeekNumber,

        getarrMonthData: state => state.arrMonthData,
        getarrMonthNumber: state => state.arrMonthNumber,

        getarrState: state => state.arrStates,
        getarrStrainCount: state => state.arrStrainCount
        // gertarrweekdata: (state) => {
        //     return state.gertarrweekdata
        // },
        // getarrWeekNumber: (state) => {
        //     return state.arrWeekNumber
        // }
    },
    
    
    actions: {
        async getPosts({ commit }) {
            if (this.state.page > 1) {
                const prev = this.state.page - 1;
            }
            await axios.get(`${process.env.baseUrl}/data/?page=${this.state.page}&days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_DataTable', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/monthlydistribution/?days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_MonthDistribution', response.data)
            }),
            
            await axios.get(`${process.env.baseUrl}/distribution/?days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_WeekDistribution', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/statesequencesdistribution/?days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_StateDistribution', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/uniqelineagecount/?days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_UniqueLineages', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/uniquelineagestrain/?days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_LineageDistribution', response.data)
            }),
            await axios.get(`${process.env.baseUrl}/genomesseqenced/?days=${this.state.days}&year=${this.state.year}&strain=${this.state.strain}&state=${this.state.state}&lineage=${this.state.lineage}&mutation_deletion=${this.state.mutation_deletion}&date=${this.state.date}&gene=${this.state.gene}&reference_id=${this.state.reference_id}&mutation=${this.state.mutation}`)
                .then(response => {
                    commit('SET_UniqueSequences', response.data)
            })

            
        },
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
            this.state.barChartData.labels.splice(0,)
            this.state.barChartData.datasets[0].data.splice(0,)
            value.forEach(d => {
                const {
                    week_number,
                    strain__count
                } = d;
                this.state.arrWeekNumber.push(week_number)
                this.state.arrweekdata.push(strain__count)
                this.state.barChartData.labels.push(week_number)
                this.state.barChartData.datasets[0].data.push(strain__count)
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
    }
})



