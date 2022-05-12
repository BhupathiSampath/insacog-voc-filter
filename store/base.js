import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	url: process.env.BASE_URL,
	page: 1,
	days: 36500,
	search: '',
	gene: '',
	mutation: '',
	reference_id: '',
	start_date: '',
	end_date: '',
	amino_acid_position: '',
	year: '2021,2022',
	state: '',
	strain: '',
	date: '',
	lineage: '',
	mutation_deletion: '',
	ordering: '',

	datahub_stats: {},
	weekly_lineage: {
		chartdata1: {},
		loaded1: false,
	},
	monthly_lineage: {
		chartdata: {},
		loaded: false,
	},
	lineage_class: {
		chartdata: {},
		loaded: false,
	},
	weekly_lineage_class: {
		chartdata: {},
		loaded: false,
	},
	monthly_lineage_class: {
		chartdata1: {},
		loaded1: false,
	},
	weekly_sequence: {
		chartdata: {},
		loaded: false,
	},
	monthly_sequence: {
		chartdata1: {},
		loaded1: false,
	},
	state_lineage_class: {
		chartdata: {},
		loaded: false,
	},
	state_distribution: {
		chartdata: {},
		loaded: false,
	},
	datahub_loaded: false,
	datatable: {},
	datatable_loaded: false,
	uniqueLineages: {},
	uniqueLineages_loaded: false,
	lineageDistribution: {},
	lineageDistribution_loaded: false,
	uniqueSequences: {},
	uniqueSequences_loaded: false,
})

export const getters = {
	getField,
}

export const mutations = {
	SET_DATAHUB_STATS(state, payload) {
		state.datahub_stats = payload
		state.datahub_loaded = true
	},
	SET_DataTable(state, payload) {
		state.datatable = payload
		state.datatable_loaded = true
	},
	SET_UniqueLineages(state, payload) {
		state.uniqueLineages = payload
		state.uniqueLineages_loaded = true
	},
	SET_LineageDistribution(state, payload) {
		state.lineageDistribution = payload
		state.lineageDistribution_loaded = true
	},
	SET_UniqueSequences(state, payload) {
		state.uniqueSequences = payload
		state.uniqueSequences_loaded = true
	},
	SET_LINEAGE_CLASSIFICATION(state, payload) {
		state.lineage_class.chartdata = payload
		state.lineage_class.loaded = true
	},
	SET_WeekLineageClassification(state, payload) {
		state.weekly_lineage_class.chartdata = payload
		state.weekly_lineage_class.loaded = true
	},
	SET_MonthLineageClassification(state, payload) {
		state.monthly_lineage_class.chartdata1 = payload
		state.monthly_lineage_class.loaded1 = true
	},
	SET_WeekDistribution(state, payload) {
		state.weekly_sequence.chartdata = payload
		state.weekly_sequence.loaded = true
	},
	SET_MonthDistribution(state, payload) {
		state.monthly_sequence.chartdata1 = payload
		state.monthly_sequence.loaded1 = true
	},
	SET_StateLineageClassification(state, payload) {
		state.state_lineage_class.chartdata = payload
		state.state_lineage_class.loaded = true
	},
	SET_StateDistribution(state, payload) {
		state.state_distribution.chartdata = payload
		state.state_distribution.loaded = true
	},
	SET_Weeklylineage(state, payload) {
		state.weekly_lineage.chartdata1 = payload
		state.weekly_lineage.loaded1 = true
	},
	SET_Monthlylineage(state, payload) {
		state.monthly_lineage.chartdata = payload
		state.monthly_lineage.loaded = true
	},
	updateField,
}

export const actions = {
	async CallINSACOGDataHubStats({ commit, dispatch }) {
		const response = await this.$axios.$post(
			'https://research.nibmg.ac.in/insacog/api/files/landing-stats/',
		)
		await commit('SET_DATAHUB_STATS', response)
	},
	async DataTable({ state, commit, dispatch }) {
		if (state.page > 1) {
			const prev = state.page - 1
		}
		const response = await this.$axios.$get(
			`http://10.10.6.87/api/data/?page= ${state.page}&amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}&ordering=${state.ordering}`,
		)
		await commit('SET_DataTable', response)
	},
	async getALLDATA({ state, commit, dispatch }) {
		// const response = this.$axios.get('http://10.10.6.87/api/data/',{
		// 	params: {
		// 		page: state.page,
		// 		lineage: state.lineage
		// 	}
		// })
		// commit('SET_DATAHUB_STATS', response)
		// const url = process.env.BASE_URL
		// console.log(state.url)

		this.$axios
			.get(
				`http://127.0.0.1:8088/api/data/?page= ${state.page}&amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}&ordering=${state.ordering}`,
			)
			.then((response) => {
				commit('SET_DataTable', response.data)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/linclassification/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_LINEAGE_CLASSIFICATION', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/uniqelineagecount/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_UniqueLineages', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/distribution/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_WeekDistribution', response)
			}),
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/uniquelineagestrain/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_LineageDistribution', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/genomesseqenced/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_UniqueSequences', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/lineageclassificationweekly/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_WeekLineageClassification', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/lineageclassificationmonth/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_MonthLineageClassification', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/stateslineageclassification/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_StateLineageClassification', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/statesequencesdistribution/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_StateDistribution', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/weeklylineages/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_Weeklylineage', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/monthlylineages/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_Monthlylineage', response)
			})
		this.$axios
			.$get(
				`http://127.0.0.1:8088/api/monthlydistribution/?amino_acid_position=${state.amino_acid_position}&days=${state.days}&year=${state.year}&start_date=${state.start_date}&end_date=${state.end_date}&strain=${state.strain}&state=${state.state}&lineage=${state.lineage}&mutation_deletion=${state.mutation_deletion}&date=${state.date}&gene=${state.gene}&reference_id=${state.reference_id}&mutation=${state.mutation}`,
			)
			.then((response) => {
				commit('SET_MonthDistribution', response)
			})
	},
	// async CallLineageClassification({ commit, dispatch }) {
	// 	const response = await this.$axios.$get('http://10.10.6.87/api/linclassification/')
	// 	await commit('SET_LINEAGE_CLASSIFICATION', response)
	// },
}
